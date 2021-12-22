import { Toy } from "../../model/toy";
import Component from "../abstractComponent";
import { ToyDecorCard } from "./toyDecorCard";

export class SelectToys extends Component {
  toyCards: ToyDecorCard[];

  constructor(toys: Toy[]){
    super();
    this.toyCards = [];
    toys.forEach((toy) => this.toyCards.push(new ToyDecorCard(toy)));
  }

  construct() : HTMLElement {
    this.root = document.createElement('div');
    this.root.classList.add('select-toys-container');
    this.root.append(...this.toyCards.map((card) => card.construct()));

    return this.root;
  }
}