import { FilterCategories } from "../../model/categories";
import { FilterCategoriesNames } from "../../model/enums";
import Component from "../abstractComponent";

export class Categories extends Component {
  categories: FilterCategories;

  constructor() {
    super('Категории');
    this.initCategories();
  }

  construct(): HTMLElement {
    const categoriesContainer = document.createElement('div');
    categoriesContainer.classList.add('categories-container');

    const title = document.createElement('h2');
    title.classList.add('categories-container__title', 'h2-font');
    title.innerText = 'Категории';

    const ulCategories = document.createElement('ul');
    ulCategories.classList.add('filters-container__categories');
    this.drawCategories(ulCategories);

    categoriesContainer.append(title, ulCategories);

    this.root = categoriesContainer;

    return super.construct();
  }

  initCategories(): void { //todo: from localStorage
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

    for (let key of Object.keys(this.categories) as Array<keyof FilterCategories>){
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
            for (let key of Object.keys(this.categories) as Array<keyof FilterCategories>){
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

      const categoriesChangeEvent = new CustomEvent('categoriesChangeEvent', {bubbles: true});
      ul.dispatchEvent(categoriesChangeEvent);
      
      });

      ul.append(li);
    }
  }

  drawCheckbox(key: keyof FilterCategories, checked: boolean) : HTMLLIElement{
    let checkedString = checked? 'checked': '';
    let liCheckbox = document.createElement('li');
    liCheckbox.innerHTML = 
    `<label class="filters-container__categories__label categories__label-${key}">
    <input type="checkbox" class="filters-container__categories__checkbox  checkbox categories__checkbox-${key}" ${checkedString}><span class="filters-container__categories__title">${FilterCategoriesNames[key]}</span>
    </label>`;
    return liCheckbox;
  }

  

}