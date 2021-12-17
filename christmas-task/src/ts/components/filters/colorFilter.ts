import { AbstractFilter } from "./abstractFilter";
import { Color } from "../../model/enums";
import { FilteredColors } from "../../model/filteredColors";

export class ColorFilter extends AbstractFilter {
  filteredColors: FilteredColors;
  colorFilterEvent: CustomEvent;

  constructor(){
    super('color');
    this.initFilteredColors(true); //temporal
    this.colorFilterEvent = new CustomEvent('colorFilterEvent', {bubbles: true});
  }

  construct(): HTMLElement {
    this.root = document.createElement('div');
    this.root.classList.add(`color-filter-container`, 'filter-container');

    const title = document.createElement('h3');
    title.classList.add('color-filter-container__title', 'filter-container__title','h4-font');
    title.innerText = this.title;

    const ul = document.createElement('ul');
    ul.classList.add('color-filter-container__list');

    for (let color of Object.keys(Color)){
      const listItem = this.drawCheckbox(color, this.filteredColors[color]);
      ul.append(listItem);
      const input = listItem.querySelector('input') as HTMLInputElement;
      input.addEventListener('change', () => {
        console.log("color checked has changed");
        this.filteredColors[color] = input.checked;
        this.root.dispatchEvent(this.colorFilterEvent);
      })

      const coloredDiv = listItem.querySelector('.color-icon__color') as HTMLDivElement;
      coloredDiv.style.backgroundColor = color;
    }

    this.root.append(title, ul);

    return super.construct();
  }

  initFilteredColors(withTrue? : boolean): void {
    if (withTrue) {
      this.filteredColors = {
        white: true,
        yellow: true,
        red: true,
        blue: true,
        green: true
      }
    }
  }




  drawCheckbox(key: string, checked: boolean): HTMLLIElement {
    let checkedString = checked? 'checked': '';
    const li = document.createElement('li');
    li.classList.add('color-filter-container__item');
    li.innerHTML = 
    `<label class="color-filter-container__item_label color-icon">
      <input class="color-filter-container__item_checkbox color-icon__input" value="${key}" type="checkbox" ${checkedString}>
      <div class="color-filter-container__item_color color-icon__color"></div>
    </label>`

    return li;
  }

  

  reset() : void {
    this.initFilteredColors(true);
    this.resetAllCheckboxes(true);
    this.root.dispatchEvent(this.colorFilterEvent);
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