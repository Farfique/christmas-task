import { FilterCategoriesNames } from "../../model/enums";
import { AbstractFilter } from "./abstractFilter";
import { Shape } from "../../model/enums";

export class ShapeFilter extends AbstractFilter {
  filteredShapes: {
    bell : boolean,
    ball : boolean,
    cone : boolean,
    star : boolean,
    snowflake : boolean,
    figurine : boolean
  };
  shapeFilterEvent: CustomEvent;

  constructor(){
    super('shape');
    this.initFilteredShapes(true); //temporal
    this.shapeFilterEvent = new CustomEvent('shapeFilterEvent', {bubbles: true});
  }

  construct(): HTMLElement {
    this.root = document.createElement('div');
    this.root.classList.add(`shape-filter-container`, 'filter-container');

    const title = document.createElement('h3');
    title.classList.add('shape-filter-container__title', 'filter-container__title','h4-font');
    title.innerText = this.title;

    const ul = document.createElement('ul');
    ul.classList.add('shape-filter-container__list');

    for (let shape of Object.keys(Shape)){
      const listItem = this.drawCheckbox(shape, this.filteredShapes[shape]);
      ul.append(listItem);
      const input = listItem.querySelector('input') as HTMLInputElement;
      input.addEventListener('change', () => {
        this.filteredShapes[shape] = input.checked;
        this.root.dispatchEvent(this.shapeFilterEvent);
      })
    }

    this.root.append(title, ul);

    return super.construct();
  }

  initFilteredShapes(withTrue? : boolean): void {
    if (withTrue) {
      this.filteredShapes = {
        bell : true,
        ball : true,
        cone : true,
        star : true,
        snowflake : true,
        figurine : true
      }
    }
  }




  drawCheckbox(key: string, checked: boolean): HTMLLIElement {
  const li = document.createElement('li');
  li.classList.add('shape-filter-container__item');
  li.innerHTML = 
  `<label class="shape-filter-container__item_label shape-icon">
  <input class="shape-filter-container__item_checkbox shape-icon__input" value="${key}" type="checkbox" checked="${checked}">
  <img class="shape-filter-container__item_icon shape-icon__image" src="${this.getImgUrl(key)}">
  <div class="shape-filter-container__item_title shape-icon__title">${Shape[key]}</div>
  </label>`

  return li;
  }

  getImgUrl(key: string): string {
    return `./assets/svg/${key}.svg`
  }

  reset() : void {
    this.initFilteredShapes(true);
    this.resetAllCheckboxes(true);
    this.root.dispatchEvent(this.shapeFilterEvent);
  }

  resetAllCheckboxes(value: boolean): void {
    const ul = this.root.querySelector('ul') as HTMLUListElement;
    ul.childNodes.forEach((li) => {
      if (li instanceof HTMLLIElement){
        const checkbox = li.querySelector('input') as HTMLInputElement;
        checkbox.checked = value;        
      }
    });
  }



}