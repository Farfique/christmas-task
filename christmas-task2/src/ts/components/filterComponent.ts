import { FilterCategories } from "../model/categories";
import { Data } from "../model/data";
import { Filter } from "../model/filter";
import { FilteredColors } from "../model/filteredColors";
import { FilteredShapes } from "../model/filteredShapes";
import { FilteredSizes } from "../model/filteredSizes";
import Component from "./abstractComponent";
import { AbstractFilter } from "./filters/abstractFilter";
import { Categories } from "./filters/categories";
import { ColorFilter } from "./filters/colorFilter";
import { DoubleSlider } from "./filters/doubleSliderFilter";
import { FavoritesFilter } from "./filters/favoritesFilter";
import { Search } from "./filters/search";
import { ShapeFilter } from "./filters/shapeFilter";
import { SizeFilter } from "./filters/sizeFilter";
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
    year: DoubleSlider,
    count: DoubleSlider,
    shape: ShapeFilter,
    color: ColorFilter,
    size: SizeFilter,
    onlyFavorites: FavoritesFilter
  }
  filtersChangeEvent: CustomEvent;
  buttonReset: HTMLButtonElement;


  constructor(toysData: Data){
    super();
    this.initFiltersObj();
    this.toysData = toysData;
    this.filtersChangeEvent = new CustomEvent('filtersChangeEvent', {bubbles: true});
    this.search = new Search();
    this.sort = new Sort();
    this.categories = new Categories();
    this.filterComponentsObject = {
      shape: new ShapeFilter(),
      count: new DoubleSlider('count', this.toysData.rangeCount[0], this.toysData.rangeCount[1]),
      year: new DoubleSlider('year', this.toysData.rangeYear[0], this.toysData.rangeYear[1]),   
      color: new ColorFilter(),
      size: new SizeFilter(),
      onlyFavorites: new FavoritesFilter()
    };
  }

  construct() : HTMLElement {
    this.root = document.createElement('div');
    this.root.classList.add('filters-container');

    this.root.append(this.search.construct());
    this.root.append(this.sort.construct());
    
    this.root.append(this.categories.construct());
    
    for (let value of Object.values(this.filterComponentsObject)){
      this.root.append(value.construct());
    }

    this.buttonReset = this.drawButtonReset();
    this.root.append(this.buttonReset);

    this.updateFilters();

    this.subscribe();

    
    return super.construct();
  }

  initFiltersObj(): void{
    this.filters = {};
  }

  drawButtonReset(): HTMLButtonElement {
    let btn = document.createElement('button');
    btn.innerText = 'Сбросить фильтры';
    btn.classList.add('button-reset-filters');
    //this.resetAllFilters.bind(this);
    btn.addEventListener('click', () => {
      this.resetAllFilters()
    });
    return btn;
  }

  resetAllFilters(): void {
    for (let value of Object.values(this.filterComponentsObject)){
      value.reset();
    }
    this.search.reset();
  }

  subscribe(): void {
    this.root.addEventListener('categoriesChangeEvent', ((event: CustomEvent) => {
      this.updateFilters();
    }) as (e: Event) => void);
    this.root.addEventListener('searchChange', ((event: CustomEvent) => {
      if (event.detail.value !== ""){
        this.filters.str = event.detail.value;
      }
      else {
        this.filters.str = undefined;
      }
      this.root.dispatchEvent(this.filtersChangeEvent);      
    }) as (e: Event) => void);
    this.root.addEventListener('sortChange', ((event: CustomEvent) => {
    }) as (e: Event) => void);
    this.root.addEventListener('countSliderChange', ((event: CustomEvent) => {
      this.filters.countFrom = event.detail.value[0];
      this.filters.countTo = event.detail.value[1];
      this.root.dispatchEvent(this.filtersChangeEvent);   
    }) as (e: Event) => void);
    this.root.addEventListener('yearSliderChange', ((event: CustomEvent) => {
      this.filters.yearFrom = event.detail.value[0];
      this.filters.yearTo = event.detail.value[1];
      this.root.dispatchEvent(this.filtersChangeEvent);   
    }) as (e: Event) => void);
    this.root.addEventListener('shapeFilterEvent', () => {
      this.filters.shape = this.filterComponentsObject.shape.filter as FilteredShapes;
      this.root.dispatchEvent(this.filtersChangeEvent);
    });
    this.root.addEventListener('colorFilterEvent', () => {
      this.filters.color = this.filterComponentsObject.color.filter as FilteredColors;
      this.root.dispatchEvent(this.filtersChangeEvent);
    });
    this.root.addEventListener('sizeFilterEvent', () => {
      this.filters.size = this.filterComponentsObject.size.filter as FilteredSizes;
      this.root.dispatchEvent(this.filtersChangeEvent);
    });
    this.root.addEventListener('favoritesFilterEvent', () => {
      this.filters.onlyFavorites = this.filterComponentsObject.onlyFavorites.filter as boolean;
      this.root.dispatchEvent(this.filtersChangeEvent);
    });
  }

  updateFilters(){
    for (let key of Object.keys(this.categories.categories) as Array<keyof FilterCategories>){
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