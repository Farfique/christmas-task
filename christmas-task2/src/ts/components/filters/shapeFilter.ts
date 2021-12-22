import { Shape } from "../../model/enums";
import { FilteredShapes } from "../../model/filteredShapes";
import { AbstractCheckboxFilter } from "./abstractCheckBoxFilter";

export class ShapeFilter extends AbstractCheckboxFilter<FilteredShapes> {
  filter: FilteredShapes;
  innerHTML: (k: keyof FilteredShapes, ch: string) => string;
  enumKeys: Array<keyof FilteredShapes>;

  constructor(){
    super('shape');
    this.enumKeys = this.initEnumKeys();
    this.filter = this.initFilter(true); //temporal
    this.innerHTML = this.drawLiInnerHtml;
  }

  construct(): HTMLElement {
    return super.construct();
  }

  initEnumKeys(): Array<keyof FilteredShapes> {
    this.enumKeys = Object.keys(Shape) as Array<keyof FilteredShapes>;
    return this.enumKeys;
  }

  initFilter(withTrue: boolean): FilteredShapes {
    if (withTrue) {
      this.filter = {
        bell : true,
        ball : true,
        cone : true,
        star : true,
        snowflake : true,
        figurine : true
      } as FilteredShapes;
    }
    return this.filter;
  }

  drawLiInnerHtml(key: string, checkedString: string): string {
    let key2 = key as keyof typeof Shape;
    return `<label class="shape-filter-container__item_label shape-icon">
    <input class="shape-filter-container__item_checkbox shape-icon__input" value="${key2}" type="checkbox" ${checkedString}>
    <img class="shape-filter-container__item_icon shape-icon__image" src="./assets/svg/${key2}.svg">
    <div class="shape-filter-container__item_title shape-icon__title">${Shape[key2]}</div>
    </label>`
  }

}