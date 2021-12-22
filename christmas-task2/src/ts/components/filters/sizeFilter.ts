import { Size } from "../../model/enums";
import { FilteredShapes } from "../../model/filteredShapes";
import { FilteredSizes } from "../../model/filteredSizes";
import { AbstractCheckboxFilter } from "./abstractCheckBoxFilter";

export class SizeFilter extends AbstractCheckboxFilter<FilteredSizes> {

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
    this.enumKeys = Object.keys(Size) as Array<keyof FilteredSizes>;
  }

  initFilter(withTrue: boolean): void {
    if (withTrue) {
      this.filter = {
        small: true,
        medium: true,
        big: true
      } as FilteredSizes;
    }
  }

  drawLiInnerHtml(key: string, checkedString: string): string {
    let key2 = key as keyof typeof Size;
    return `<label class="size-filter-container__item_label size-icon">
    <input class="size-filter-container__item_checkbox size-icon__input checkbox" value="${key}" type="checkbox" ${checkedString}>
    <div class="size-filter-container__item_title size-icon__title">${Size[key2]}</div>
    </label>`
  }

}