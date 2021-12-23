import { Tree } from "../../model/tree";
import Component from "../abstractComponent";

export class SelectBackground extends Component {
  selectBackgroundEvent: CustomEvent;
  selectedBackground: number;
  backgrounds: number[];

  constructor(){
    super('Выберите фон');
    this.selectBackgroundEvent = new CustomEvent('selectBackgroundEvent', {bubbles: true});
    this.backgrounds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.selectedBackground = this.backgrounds[0];
  }

  construct() : HTMLElement {
    this.root = document.createElement('div');
    this.root.classList.add('select-bgrs-container');

    const title = document.createElement('h2');
    title.classList.add('select-bgrs-container__title', 'h2-font');
    title.innerText = this.title;
    this.root.append(title);

    const div = document.createElement('div');
    div.classList.add('select-bgrs-container__div', 'select-cards-container');

    this.backgrounds.forEach((num) => {
      div.append(this.drawCard(num));
    })

    this.root.append(div);
    this.subscribe();

    return this.root;
  }

  getUrlByNumber(num: number): string{
    return `./assets/bg-preview/${num}.jpg`;
  }

  drawCard(num: number): HTMLElement {
    const label = document.createElement('label');
    label.classList.add('bgrs-card-label', 'card');

    const input = document.createElement('input') as HTMLInputElement;
    input.classList.add('bgrs-card-label__input', 'invisible-input');
    input.type = 'radio';
    input.name = 'select-bgrs';
    input.value = "" + num;

    const img = document.createElement('img') as HTMLImageElement;
    img.classList.add('bgrs-card-label__image')
    img.src = this.getUrlByNumber(num);

    label.append(input, img);

    return label;
  }

  subscribe(): void {
    let radioButtons = this.root?.querySelectorAll('input[name=select-bgrs]') as NodeListOf<HTMLInputElement>;
    for (let button of radioButtons){
      button.addEventListener('change', () => {
        console.log("value of radio btn has changed, bgr checked = ", button.value);
        this.selectedBackground = this.backgrounds[+button.value - 1];
        console.log("selected background = ", this.selectedBackground);
        this.root?.dispatchEvent(this.selectBackgroundEvent);
      })
    }
    
  }
}