import { Toy } from "../../model/toy";
import Component from "../abstractComponent";
import { ToyDecorCard } from "./toyDecorCard";

export class SelectToys extends Component {
  toyCards: ToyDecorCard[];

  constructor(toys: Toy[]){
    super('Игрушки');
    this.toyCards = [];
    toys.forEach((toy) => this.toyCards.push(new ToyDecorCard(toy)));
  }

  construct() : HTMLElement {
    this.root = document.createElement('div');
    this.root.classList.add('select-toys-container');

    const title = document.createElement('h2');
    title.classList.add('select-toys-container__title', 'h2-font');
    title.innerText = this.title;
    this.root.append(title);

    const div = document.createElement('div');
    div.classList.add('select-toys-container__div', 'select-cards-container');

    div.append(...this.toyCards.map((card) => card.construct()));
    this.root.append(div);

    return this.root;
  }

  subscribe(): void {
    
  }
}