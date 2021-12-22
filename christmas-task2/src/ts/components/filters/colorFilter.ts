import { Color } from "../../model/enums";
import { FilteredColors } from "../../model/filteredColors";
import { AbstractCheckboxFilter } from "./abstractCheckBoxFilter";

export class ColorFilter extends AbstractCheckboxFilter<FilteredColors> {
  filter: FilteredColors;
  innerHTML: (k: keyof FilteredColors, ch: string) => string;
  enumKeys: Array<keyof FilteredColors>;


  constructor(){
    super('color');
    this.enumKeys = this.initEnumKeys();
    this.filter = this.initFilter(true); //temporal
    this.innerHTML = this.drawLiInnerHtml;
  }

  construct(): HTMLElement {
    this.root = super.construct();
    this.paintDivIcons();
    return this.root;
  }

  initFilter(withTrue: boolean): FilteredColors {
    this.filter = {
      white: true,
      yellow: true,
      red: true,
      blue: true,
      green: true
    }
    return this.filter;
  }

  initEnumKeys(): Array<keyof FilteredColors> {
    this.enumKeys = Object.keys(Color) as Array<keyof FilteredColors>;
    return this.enumKeys;
  }

  drawLiInnerHtml(key: string, checkedString: string): string {
    return `<label class="color-filter-container__item_label color-icon">
    <input class="color-filter-container__item_checkbox color-icon__input" value="${key}" type="checkbox" ${checkedString}>
    <div class="color-filter-container__item_color color-icon__color"></div>
  </label>`
  }

  paintDivIcons(){
    if (this.root){
      const ul = this.root.querySelector('ul') as HTMLUListElement;
      ul.childNodes.forEach((li) => {
        if (li instanceof HTMLLIElement){
          const checkbox = li.querySelector('input') as HTMLInputElement;
          const coloredDiv = li.querySelector('.color-icon__color') as HTMLDivElement;
          coloredDiv.style.backgroundColor = checkbox.value;
        }
      });
    }
  }

}