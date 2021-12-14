import { Data } from "../model/data";
import Component from "./abstractComponent";
import { Filters } from "./filterComponent";
import ToyInfoCard from "./toyInfoCard";

export default class Toys extends Component {

  filters: Filters;
  toysData: Data;
  cards: ToyInfoCard[];
  filteredCards: ToyInfoCard[];

  constructor(toysData: Data){
    super();
    this.title = 'Игрушки';
    this.filters = new Filters();
    this.cards = [];
    this.filteredCards = [];
    this.toysData = toysData;
  }

  initCards(){
    console.log("toysdata = ", this.toysData);
    this.toysData.toys.forEach((toy) => {
      console.log("constructor toy = ", toy);
      let card = new ToyInfoCard(toy);
      this.cards.push(card);
      
    });
    this.filteredCards.push(...this.cards);
  }

  construct(){
    this.root = document.createElement('main');
    this.root.classList.add('toys-main');


    this.root.append(this.filters.construct());

    this.initCards();
    
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('toys-container');

    this.filteredCards.forEach((card) => {
      cardsContainer.append(card.construct());
    })

    this.root.append(cardsContainer);


    return super.construct();
  }

}