import { FilterCategories } from "../model/categories";
import { Data } from "../model/data";
import { Filter } from "../model/filter";
import Component from "./abstractComponent";
import { AbstractFilter } from "./filters/abstractFilter";
import { Categories } from "./filters/categories";
import { DoubleSlider } from "./filters/doubleSlider";
import { Search } from "./filters/search";
import { Sort } from "./filters/sort";
import ToyInfoCard from "./toyInfoCard";

export class Filters extends Component {
  filters: Filter;
  filteredCards: ToyInfoCard[];
  categories: Categories;
  search: Search;
  sort: Sort;
  toysData: Data;
  filterComponentsObject: {
    year?: DoubleSlider,
    count?: DoubleSlider,
    shape?: AbstractFilter,
    color?: AbstractFilter,
    size?: AbstractFilter,
    onlyFavorites?: AbstractFilter
  }


  constructor(toysData: Data){
    super();
    this.filters = {};
    this.toysData = toysData;
    this.search = new Search();
    this.sort = new Sort();
    this.categories = new Categories();
    this.filterComponentsObject = {};
    this.filterComponentsObject.count = new DoubleSlider('count', this.toysData.rangeCount[0], this.toysData.rangeCount[1]);
    this.filterComponentsObject.year = new DoubleSlider('year', this.toysData.rangeYear[0], this.toysData.rangeYear[1]);
  }

  construct() : HTMLElement {
    this.root = document.createElement('div');
    this.root.classList.add('filters-container');

    this.root.append(this.search.construct());
    this.root.append(this.sort.construct());
    
    this.root.append(this.categories.construct());
    this.root.append(this.filterComponentsObject.count.construct());
    this.root.append(this.filterComponentsObject.year.construct());

    this.updateFilters();

    this.subscribe();

    
    return super.construct();
  }

  subscribe(): void {
    this.root.addEventListener('categoriesChangeEvent', (event: CustomEvent) => {
      console.log("I got categories change, categories value = ", this.categories.categories);
      this.updateFilters();
    });
    this.root.addEventListener('searchChange', (event: CustomEvent) => {
      console.log("I got search change, it's value = ", event.detail.value);
    });
    this.root.addEventListener('sortChange', (event: CustomEvent) => {
      console.log("I got sort change, it's value = ", event.detail.value);
    });
    this.root.addEventListener('countSliderChange', (event: CustomEvent) => {
      console.log("I got count slider change, it's value = ", event.detail.value);
    });
    this.root.addEventListener('yearSliderChange', (event: CustomEvent) => {
      console.log("I got year slider change, it's value = ", event.detail.value);
    });
  }

  updateFilters(){
    for (let key of Object.keys(this.categories.categories)){
      if (key !== 'all'){
        if (this.categories.categories[key]){
          this.filterComponentsObject[key].show();
        }
        else {
          this.filterComponentsObject[key].reset();
          this.filterComponentsObject[key].hide();
        }
      }
    }
  }
}