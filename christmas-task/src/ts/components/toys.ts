import { Data } from "../model/data";
import { Color, Shape } from "../model/enums";
import Component from "./abstractComponent";
import { FiltersComponent } from "./filterComponent";
import ToyInfoCard from "./toyInfoCard";

export default class Toys extends Component {

  filters: FiltersComponent;
  toysData: Data;
  cards: ToyInfoCard[];
  filteredCards: ToyInfoCard[];
  cardsContainer: HTMLDivElement;

  constructor(toysData: Data){
    super();
    this.title = 'Игрушки';
    this.filters = new FiltersComponent(toysData);
    this.cards = [];
    this.filteredCards = [];
    this.toysData = toysData;
  }

  initCards(){
    console.log("toysdata = ", this.toysData);
    this.toysData.toys.forEach((toy) => {
      let card = new ToyInfoCard(toy);
      card.construct();
      this.cards.push(card);
      
    });
    this.filteredCards.push(...this.cards);
  }

  construct(){
    this.root = document.createElement('main');
    this.root.classList.add('toys-main');


    this.root.append(this.filters.construct());

    this.initCards();
    
    this.cardsContainer = document.createElement('div');
    this.cardsContainer.classList.add('toys-container');

    this.filteredCards.forEach((card) => {
      this.cardsContainer.append(card.root);
    })

    this.root.append(this.cardsContainer);

    this.subscribe();


    return super.construct();
  }

  subscribe(): void {
    //this.applyFilter.bind(this);
    this.root.addEventListener('filtersChangeEvent', () => {
      this.applyFilter();
    });
  }

  applyFilter() : void {
    console.log("applyFilter this = ", this);
    this.clearContainer(this.cardsContainer);
    this.filteredCards = this.cards.filter(card => {
      return Object.keys(this.filters.filters).reduce((prev: boolean, filterKey) => {
        if (!prev){
          return prev;
        }
        let currentValue = prev as boolean;
        console.log("filterKey = ", filterKey);
        console.log("filters value = ", this.filters.filters[filterKey]);
        if (this.filters.filters[filterKey] !== null) {
          switch (filterKey){
            case 'str':           
              currentValue = card.toyInfo.name.includes(this.filters.filters[filterKey]);
              break;
            case 'countFrom':
              currentValue = card.toyInfo.count >= this.filters.filters[filterKey];
              break;
            case 'countTo':
              currentValue = card.toyInfo.count <= this.filters.filters[filterKey];
              break;
            case 'yearFrom': 
              currentValue = card.toyInfo.year >= this.filters.filters[filterKey];
              break;
            case 'yearTo':
              currentValue = card.toyInfo.year <= this.filters.filters[filterKey];
              break;
            case 'shape':
              let shape = card.toyInfo.shape;
              let shapeKey = Object.keys(Shape).filter(key => Shape[key] == shape)[0];
              currentValue = this.filters.filters[filterKey][shapeKey];
              break;
            case 'color':
              let color = card.toyInfo.color;
              let colorKey = Object.keys(Color).filter(key => Color[key] == color)[0];
              currentValue = this.filters.filters[filterKey][colorKey];
          }
        }

        return currentValue? prev: currentValue;                
      }, true);
    });
    this.filteredCards.forEach((card) => {
      this.cardsContainer.append(card.root);
    });
  }

  clearContainer(container: HTMLDivElement){
    while (container.firstElementChild){
      container.lastElementChild.remove();
    }


  }

}