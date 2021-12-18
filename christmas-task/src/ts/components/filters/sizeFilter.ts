import { Size } from "../../model/enums";
import { AbstractCheckboxFilter } from "./abstractCheckBoxFilter";

export class SizeFilter extends AbstractCheckboxFilter {

  constructor(){
    super('size');
    this.initEnumKeys();
    this.initFilter(true); //temporal
    this.innerHTML = this.drawLiInnerHtml;
  }

  construct(): HTMLElement {
    return super.construct();
  }

  initEnumKeys(): void {
    this.enumKeys = Object.keys(Size);
  }

  initFilter(withTrue? : boolean): void {
    if (withTrue) {
      this.filter = {
        small: true,
        medium: true,
        big: true
      }
    }
  }

  drawLiInnerHtml(key: string, checkedString: string): string {
    return `<label class="size-filter-container__item_label size-icon">
    <input class="size-filter-container__item_checkbox size-icon__input" value="${key}" type="checkbox" ${checkedString}>
    <div class="size-filter-container__item_title size-icon__title">${Size[key]}</div>
    </label>`
  }

}