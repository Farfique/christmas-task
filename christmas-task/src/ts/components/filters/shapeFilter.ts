import { AbstractFilter } from "./abstractFilter";
import { Shape } from "../../model/enums";
import { FilteredShapes } from "../../model/filteredShapes";
import { AbstractCheckboxFilter } from "./abstractCheckBoxFilter";

export class ShapeFilter extends AbstractCheckboxFilter {

  constructor(){
    super('shape');
    this.initEnumKeys();
    this.initFilter(true); //temporal
    this.innerHTML = this.drawLiInnerHtml;
  }

  construct(): HTMLElement {
    return super.construct();
  }

  initEnumKeys(): void {
    this.enumKeys = Object.keys(Shape);
  }

  initFilter(withTrue? : boolean): void {
    if (withTrue) {
      this.filter = {
        bell : true,
        ball : true,
        cone : true,
        star : true,
        snowflake : true,
        figurine : true
      }
    }
  }

  drawLiInnerHtml(key: string, checkedString: string): string {
    return `<label class="shape-filter-container__item_label shape-icon">
    <input class="shape-filter-container__item_checkbox shape-icon__input" value="${key}" type="checkbox" ${checkedString}>
    <img class="shape-filter-container__item_icon shape-icon__image" src="./assets/svg/${key}.svg">
    <div class="shape-filter-container__item_title shape-icon__title">${Shape[key]}</div>
    </label>`
  }

}