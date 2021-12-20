import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { format } from 'path/posix';
import { AbstractFilter } from "./abstractFilter";

export class DoubleSlider extends AbstractFilter {
  slider: noUiSlider.target;
  min: number;
  max: number;
  rangeFrom?: number;
  rangeTo?: number;
  
  constructor(key: string, min: number, max: number){
    super(key);
    this.min = min;
    this.max = max;
  }

  construct(): HTMLElement{
    this.root = document.createElement('div');
    this.root.classList.add(`${this.key}-slider-container`, 'slider-container');

    const title = document.createElement('h3');
    title.classList.add('slider-container__title', 'h4-font');
    title.innerText = this.title;

    this.slider = document.createElement('div');
    this.slider.classList.add(`${this.key}-slider`, 'slider');



    if (!this.rangeFrom || this.rangeFrom < this.min) this.rangeFrom = this.min;
    if (!this.rangeTo || this.rangeFrom > this.max) this.rangeTo = this.max;


    noUiSlider.create(this.slider, {
        start: [this.rangeFrom, this.rangeTo],
        connect: true,
        step: 1,
        tooltips: true,
        format: {
          to: function(value){
            return Math.floor(value);
          },
          from: function(value){
            return Math.floor(+value);
          }
        },
  
        range: {
            'min': this.min,
            'max': this.max
        },
        pips: {
          mode: noUiSlider.PipsMode.Range,
          density: this.max
      }
    });

    this.subscribe();

   

    this.root.append(title, this.slider);

    return super.construct();
  }

  subscribe(): void {
    
    this.slider.noUiSlider.on('set', values => {
      this.valuesChangeCallback(values);
    })
    this.slider.noUiSlider.on('change', (values) => {
        this.valuesChangeCallback(values);
    }); //TODO: update values, raise event

  }

  reset() : void {
    this.slider.noUiSlider.set([this.min, this.max]);
    //todo: save to local  storage
  }

  valuesChangeCallback(values: (string | number)[]) : void {
    [this.rangeFrom, this.rangeTo] = [+values[0], +values[1]];
    let event = new CustomEvent(`${this.key}SliderChange`, {bubbles: true, detail: {
      value: [this.rangeFrom, this.rangeTo]
    }});
    this.root.dispatchEvent(event);
  }

}