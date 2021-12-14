import { Filter } from "../model/filter";
import Component from "./abstractComponent";
import { Search } from "./filters/search";
import { Sort } from "./filters/sort";

export class Filters extends Component {
  filters: Filter;
  categories: {
    all: boolean,
    year: boolean,
    count: boolean,
    shape: boolean,
    color: boolean,
    size: boolean,
    onlyFavorites: boolean
  };
  search: Search;
  sort: Sort;

  constructor(){
    super();
    this.filters = {};
    this.initCategories();
    this.search = new Search();
    this.sort = new Sort();
  }

  initCategories(): void {
    this.categories = {
      all: true,
      year: true,
      count: true,
      shape: true,
      color: true,
      size: true,
      onlyFavorites: true
    }
  }

  drawCategories(ul: HTMLUListElement): void {
    //TODO? clean ul

    let labelCollection = [] as HTMLElement[];

    for (let key of Object.keys(this.categories)){
      let li = this.drawCheckbox(key, this.categories[key]);
      labelCollection.push(li);
      
      let input = li.querySelector('input') as HTMLInputElement;
      if (this.categories.all && !input.classList.contains(`categories__checkbox-all`)){
        li.style.display = "none";
      }

      input.addEventListener('change', () => {
        this.categories[key] = input.checked;
        
        //TODO: save in localStorage

        if (input.classList.contains(`categories__checkbox-all`)){
          if (input.checked){
            for (let key of Object.keys(this.categories)){
              this.categories[key] = true;
            }
            labelCollection.forEach((listItem) => {
              let listItemInput = listItem.querySelector('input') as HTMLInputElement;
              if (!listItemInput.classList.contains(`categories__checkbox-all`)){
                listItemInput.checked = true;
                listItemInput.dispatchEvent(new Event('change'));
                listItem.style.display = "none";
              }              
            });
          }
          else {
            labelCollection.forEach((listItem) => {
              listItem.style.display = "";
            })
          }
        }
      });

      ul.append(li);
    }
  }

  drawCheckbox(key: string, checked: boolean) : HTMLLIElement{
    let liCheckbox = document.createElement('li');
    liCheckbox.innerHTML = 
    `<label class="filters-container__categories__label categories__label-${key}">
    <input type="checkbox" class="filters-container__categories__checkbox  categories__checkbox-${key}" checked="${checked}"><span class="filters-container__categories__title">${key}</span>
    </label>`;
    return liCheckbox;
  }

  drawCategoriesContainer(): HTMLElement {
    const categoriesContainer = document.createElement('div');
    categoriesContainer.classList.add('categories-container');

    const title = document.createElement('h2');
    title.classList.add('categories-container__title', 'h2-font');
    title.innerText = 'Категории';

    const ulCategories = document.createElement('ul');
    ulCategories.classList.add('filters-container__categories');
    this.drawCategories(ulCategories);

    categoriesContainer.append(title, ulCategories);

    return categoriesContainer;
  }

  construct() : HTMLElement {
    this.root = document.createElement('div');
    this.root.classList.add('filters-container');

    this.root.append(this.search.construct());
    this.root.append(this.sort.construct());
    
    this.root.append(this.drawCategoriesContainer());

    this.subscribe();

    
    return super.construct();
  }

  subscribe(): void {
    this.root.addEventListener('searchChange', (event: CustomEvent) => {
      console.log("I got search change, it's value = ", event.detail.value);
    });
    this.root.addEventListener('sortChange', (event: CustomEvent) => {
      console.log("I got sort change, it's value = ", event.detail.value);
    });
  }
}