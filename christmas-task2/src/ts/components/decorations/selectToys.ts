import { Toy } from "../../model/toy";
import Component from "../abstractComponent";
import { ToyDecorCard } from "./toyDecorCard";
import Settings from '../../model/settings';

export class SelectToys extends Component {
  toyCards: ToyDecorCard[];
  selectToysDiv: HTMLElement;

  constructor(toys: Toy[]){
    super('Игрушки');
    this.toyCards = [];
    toys.slice(0, (Settings.maxFavoritesNumber > toys.length)? toys.length : Settings.maxFavoritesNumber)
      .forEach((toy) => this.toyCards.push(new ToyDecorCard(toy)));
    this.root = document.createElement('div');
    this.root.classList.add('select-toys-container');

    const title = document.createElement('h2');
    title.classList.add('select-toys-container__title', 'h2-font');
    title.innerText = this.title;
    this.root.append(title);

    this.selectToysDiv = document.createElement('div');
    this.selectToysDiv.classList.add('select-toys-container__div', 'select-cards-container');
    this.root.append(this.selectToysDiv);
  }

  construct() : HTMLElement {

    this.selectToysDiv.append(...this.toyCards.map((card) => card.construct()));
    
    return this.root!;
  }

  redrawToys(toys: Toy[]): void {
    this.toyCards = [];
    toys.slice(0, (Settings.maxFavoritesNumber > toys.length)? toys.length : Settings.maxFavoritesNumber)
      .forEach((toy) => this.toyCards.push(new ToyDecorCard(toy)));
    this.selectToysDiv.innerHTML = "";
    this.selectToysDiv.append(...this.toyCards.map((card) => card.construct()));
  }

  subscribe(): void {

  }
}