import { AbstractFilter } from "./abstractFilter";
import { FilteredColors } from "../../model/filteredColors";
import { FilteredShapes } from "../../model/filteredShapes";
import { FilteredSizes } from "../../model/filteredSizes";
import { FilterCategoriesNames } from "../../model/enums";

export abstract class AbstractCheckboxFilter<T extends {[key: string]: boolean}> extends AbstractFilter {
  abstract filter: T;
  filterEvent: CustomEvent;
  abstract enumKeys: Array<keyof T>;
  abstract innerHTML: (k: keyof T, ch: string) => string;

  constructor(key: "color" | "shape" | "size"){
    super(key);
    this.filterEvent = new CustomEvent(`${this.key}FilterEvent`, {bubbles: true});
  }

  construct(): HTMLElement {
    this.root = document.createElement('div');
    this.root.classList.add(`${this.key}-filter-container`, 'filter-container');

    const title = document.createElement('h3');
    title.classList.add(`${this.key}-filter-container__title`, 'filter-container__title','h4-font');
    title.innerText = this.title;

    const ul = document.createElement('ul');
    ul.classList.add(`${this.key}-filter-container__list`);

    for (let enumKey of this.enumKeys){
      
      const listItem = this.drawCheckbox(enumKey, this.filter[enumKey], this.innerHTML);
      ul.append(listItem);
      const input = listItem.querySelector('input') as HTMLInputElement;
      input.addEventListener('change', () => {
        this.filter[enumKey] = input.checked as T[keyof T];
        this.root!.dispatchEvent(this.filterEvent);
      })
    }

    this.root.append(title, ul);

    return this.root;
  }

  abstract initEnumKeys(): Array<keyof T>; 

  abstract initFilter(withTrue: boolean): T;


  drawCheckbox(key: keyof T, checked: boolean, innerHTML: (k: keyof T, ch: string) => string): HTMLLIElement {
    let checkedString = checked? 'checked': '';
    const li = document.createElement('li');
    li.classList.add(`${this.key}-filter-container__item)`);
    li.innerHTML = innerHTML(key, checkedString);
    return li;
  }

  drawLiInnerHtml(key: string, checkedString: string): string {
    return ``
  }

  

  reset() : void {
    this.initFilter(true);
    this.resetAllCheckboxes(true);
    if (this.root){
      this.root.dispatchEvent(this.filterEvent);
    }
    
  }

  resetAllCheckboxes(value: boolean): void {
    if (this.root){
      const ul = this.root.querySelector('ul') as HTMLUListElement;
      ul.childNodes.forEach((li) => {
        if (li instanceof HTMLLIElement){
          const checkbox = li.querySelector('input') as HTMLInputElement;
          checkbox.checked = value;        
        }
      });
    }
  }
}