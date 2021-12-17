import { FilterCategories } from "../model/categories";
import { Data } from "../model/data";
import { Filter } from "../model/filter";
import { FilteredColors } from "../model/filteredColors";
import { FilteredShapes } from "../model/filteredShapes";
import Component from "./abstractComponent";
import { AbstractFilter } from "./filters/abstractFilter";
import { Categories } from "./filters/categories";
import { ColorFilter } from "./filters/colorFilter";
import { DoubleSlider } from "./filters/doubleSliderFilter";
import { Search } from "./filters/search";
import { ShapeFilter } from "./filters/shapeFilter";
import { Sort } from "./filters/sort";
import ToyInfoCard from "./toyInfoCard";

export class FiltersComponent extends Component {
  filters: Filter;
  filteredCards: ToyInfoCard[];
  categories: Categories;
  search: Search;
  sort: Sort;
  toysData: Data;
  filterComponentsObject: {
    year?: DoubleSlider,
    count?: DoubleSlider,
    shape?: ShapeFilter,
    color?: ColorFilter,
    size?: AbstractFilter,
    onlyFavorites?: AbstractFilter
  }
  filtersChangeEvent: CustomEvent;


  constructor(toysData: Data){
    super();
    this.initFiltersObj();
    this.toysData = toysData;
    this.filtersChangeEvent = new CustomEvent('filtersChangeEvent', {bubbles: true});
    this.search = new Search();
    this.sort = new Sort();
    this.categories = new Categories();
    this.filterComponentsObject = {};
    this.filterComponentsObject.count = new DoubleSlider('count', this.toysData.rangeCount[0], this.toysData.rangeCount[1]);
    this.filterComponentsObject.year = new DoubleSlider('year', this.toysData.rangeYear[0], this.toysData.rangeYear[1]);
    this.filterComponentsObject.shape = new ShapeFilter();
    this.filterComponentsObject.color = new ColorFilter();
  }

  construct() : HTMLElement {
    this.root = document.createElement('div');
    this.root.classList.add('filters-container');

    this.root.append(this.search.construct());
    this.root.append(this.sort.construct());
    
    this.root.append(this.categories.construct());
    this.root.append(this.filterComponentsObject.shape.construct());
    this.root.append(this.filterComponentsObject.count.construct());
    this.root.append(this.filterComponentsObject.year.construct());
    this.root.append(this.filterComponentsObject.color.construct());

    this.updateFilters();

    this.subscribe();

    
    return super.construct();
  }

  initFiltersObj(): void{
    this.filters = {};
  }

  subscribe(): void {
    this.root.addEventListener('categoriesChangeEvent', (event: CustomEvent) => {
      console.log("I got categories change, categories value = ", this.categories.categories);
      this.updateFilters();
    });
    this.root.addEventListener('searchChange', (event: CustomEvent) => {
      console.log("I got search change, it's value = ", event.detail.value);
      if (event.detail.value !== ""){
        this.filters.str = event.detail.value;
      }
      else {
        this.filters.str = null;
      }
      this.root.dispatchEvent(this.filtersChangeEvent);      
    });
    this.root.addEventListener('sortChange', (event: CustomEvent) => {
      console.log("I got sort change, it's value = ", event.detail.value);
    });
    this.root.addEventListener('countSliderChange', (event: CustomEvent) => {
      console.log("I got count slider change, it's value = ", event.detail.value);
      this.filters.countFrom = event.detail.value[0];
      this.filters.countTo = event.detail.value[1];
      this.root.dispatchEvent(this.filtersChangeEvent);   
    });
    this.root.addEventListener('yearSliderChange', (event: CustomEvent) => {
      console.log("I got year slider change, it's value = ", event.detail.value);
      this.filters.yearFrom = event.detail.value[0];
      this.filters.yearTo = event.detail.value[1];
      this.root.dispatchEvent(this.filtersChangeEvent);   
    });
    this.root.addEventListener('shapeFilterEvent', () => {
      console.log("I got shape filter event change, it's value = ", this.filterComponentsObject.shape.filter);
      this.filters.shape = this.filterComponentsObject.shape.filter as FilteredShapes;
      this.root.dispatchEvent(this.filtersChangeEvent);
    });
    this.root.addEventListener('colorFilterEvent', () => {
      console.log("I got color filter event change, it's value = ", this.filterComponentsObject.color.filter);
      this.filters.color = this.filterComponentsObject.color.filter as FilteredColors;
      this.root.dispatchEvent(this.filtersChangeEvent);
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