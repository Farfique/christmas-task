import { Tree } from "../../model/tree";
import Component from "../abstractComponent";
import { Trees } from "../../data/trees";

export class SelectTree extends Component {
  selectTreeEvent: CustomEvent;
  selectedTree: Tree;

  constructor(){
    super('Выберите ёлку');
    this.selectTreeEvent = new CustomEvent('selectedTreeEvent', {bubbles: true});
    this.selectedTree = Trees[0];
  }

  construct() : HTMLElement {
    this.root = document.createElement('div');
    this.root.classList.add('select-trees-container');

    const title = document.createElement('h2');
    title.classList.add('select-trees-container__title', 'h2-font');
    title.innerText = this.title;
    this.root.append(title);

    const div = document.createElement('div');
    div.classList.add('select-trees-container__div', 'select-cards-container');

    Trees.forEach((treeInfo) => {
      div.append(this.drawCard(treeInfo.num));
    })

    this.root.append(div);
    this.subscribe();

    return this.root;
  }

  getUrlByNumber(num: number): string{
    return `./assets/tree/${num}.png`;
  }

  drawCard(num: number): HTMLElement {
    const label = document.createElement('label');
    label.classList.add('trees-card-label', 'card');

    const input = document.createElement('input') as HTMLInputElement;
    input.classList.add('trees-card-label__input', 'invisible-input');
    input.type = 'radio';
    input.name = 'select-trees';
    input.value = "" + num;

    const img = document.createElement('img') as HTMLImageElement;
    img.classList.add('trees-card-label__image')
    img.src = this.getUrlByNumber(num);

    label.append(input, img);

    return label;
  }

  subscribe(): void {
    let radioButtons = this.root?.querySelectorAll('input[name=select-trees]') as NodeListOf<HTMLInputElement>;
    for (let button of radioButtons){
      button.addEventListener('change', () => {
        console.log("value of radio btn has changed, tree checked = ", button.value);
        this.selectedTree = Trees[+button.value - 1];
        console.log("selected tree = ", this.selectedTree);
        this.root?.dispatchEvent(this.selectTreeEvent);
      })
    }
    
  }
}

