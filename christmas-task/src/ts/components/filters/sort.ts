import Component from "../abstractComponent";
import { Order } from "../../model/enums";

export class Sort extends Component {
  select: HTMLSelectElement;
  selectedOption: string;
  
  constructor(){
    super();
  }

  construct(): HTMLElement {
    this.root = document.createElement('div');
    this.root.classList.add('sort-container');

    const title = document.createElement('h2');
    title.classList.add('sort-container__title', 'h2-font');
    title.innerText = 'Сортировать';


    this.select = document.createElement('select');
    this.select.classList.add('control', 'select', 'sort-container__select');
    for (let key of Object.keys(Order)){
      let optionEl = document.createElement('option');
      optionEl.value = key;
      optionEl.innerText = Order[key];
      if (optionEl.value == this.selectedOption){
          optionEl.selected = true;
      }
      this.select.append(optionEl);     
    }

    this.root.append(title, this.select);

    this.subscribe();

    return super.construct();
  }

  subscribe(): void {
    this.select.addEventListener('change', () => {
      let sortEvent = new CustomEvent('sortChange', {bubbles: true, detail: {
        value: this.select.value
      }});
      this.root.dispatchEvent(sortEvent);
    })
  }
}