import Component from "../abstractComponent";
import { Garland } from "../../model/enums";

export class SelectGarland extends Component {
  selectGarlandEvent: CustomEvent;
  selectedGarland: keyof typeof Garland;

  constructor(){
    super('Выберите гирлянду');
    this.selectGarlandEvent = new CustomEvent('selectGarlandEvent', {bubbles: true});
    this.selectedGarland = "none";
  }

  construct() : HTMLElement {
    this.root = document.createElement('div');
    this.root.classList.add('select-garland-container');

    const title = document.createElement('h2');
    title.classList.add('select-garland-container__title', 'h2-font');
    title.innerText = this.title;
    this.root.append(title);

    const div = document.createElement('div');
    div.classList.add('select-garland-container__div', 'select-cards-container');

    for (let key of Object.keys(Garland) as Array<keyof typeof Garland>){
      div.append(this.drawCard(key, this.selectedGarland));
    }

    this.root.append(div);
    this.subscribe();

    return this.root;
  }

  drawCard(key: keyof typeof Garland, selectedKey: keyof typeof Garland): HTMLElement {
    const label = document.createElement('label');
    label.classList.add('garland-card-label', 'card');

    const input = document.createElement('input') as HTMLInputElement;
    input.classList.add('garland-card-label__input', 'invisible-input');
    input.type = 'radio';
    input.name = 'select-garland';
    input.value = key;
    input.checked = (selectedKey == key)? true : false;

    const circle = document.createElement('div') as HTMLDivElement;
    circle.classList.add('garland-card-label__circle', `garland-card-${key}`);

    label.append(input, circle);

    return label;
  }

  subscribe(): void {
    let radioButtons = this.root?.querySelectorAll('input[name=select-garland]') as NodeListOf<HTMLInputElement>;
    for (let button of radioButtons){
      button.addEventListener('change', () => {
        console.log("value of radio btn has changed, garland checked = ", button.value);
        this.selectedGarland = button.value as keyof typeof Garland;
        console.log("selected garland = ", this.selectedGarland);
        this.root?.dispatchEvent(this.selectGarlandEvent);
      })
    }
    
  }
}

