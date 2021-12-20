import { Data } from "../model/data";
import { Color, Shape, Size } from "../model/enums";
import { Filter } from "../model/filter";
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
    this.clearContainer(this.cardsContainer);
    this.filteredCards = this.cards.filter(card => {
      return (Object.keys(this.filters.filters) as Array<keyof Filter>).reduce((prev: boolean, filterKey) => {
        if (!prev){
          return prev;
        }
        let currentValue = prev as boolean;
        if (this.filters.filters[filterKey] !== null) {
          switch (filterKey){
            case 'str':           
              currentValue = card.toyInfo.name.toLowerCase().includes(this.filters.filters[filterKey].toLowerCase());
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
              let shapeKey = (Object.keys(Shape) as Array<keyof typeof Shape>).filter(key => Shape[key] == shape)[0];
              currentValue = this.filters.filters[filterKey][shapeKey];
              break;
            case 'color':
              let color = card.toyInfo.color;
              let colorKey = (Object.keys(Color) as Array<keyof typeof Color>).filter(key => Color[key] == color)[0];
              currentValue = this.filters.filters[filterKey][colorKey];
              break;
            case 'size':
              let size = card.toyInfo.size;
              let sizeKey = (Object.keys(Size) as Array<keyof typeof Size>).filter(key => Size[key] == size)[0];
              currentValue = this.filters.filters[filterKey][sizeKey];
              break;
            case 'onlyFavorites':
              currentValue = this.filters.filters[filterKey]? card.toyInfo.favorite : true;
              break;

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