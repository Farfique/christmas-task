import { Size } from "../../model/enums";
import { FilteredShapes } from "../../model/filteredShapes";
import { FilteredSizes } from "../../model/filteredSizes";
import { AbstractCheckboxFilter } from "./abstractCheckBoxFilter";

export class SizeFilter extends AbstractCheckboxFilter<FilteredSizes> {
  filter: FilteredSizes;
  innerHTML: (k: keyof FilteredSizes, ch: string) => string;
  enumKeys: Array<keyof FilteredSizes>;

  constructor(){
    super('size');
    this.enumKeys = this.initEnumKeys();
    this.filter = this.initFilter(true); //temporal
    this.innerHTML = this.drawLiInnerHtml;
  }

  construct(): HTMLElement {
    return super.construct();
  }

  initEnumKeys(): Array<keyof FilteredSizes> {
    this.enumKeys = Object.keys(Size) as Array<keyof FilteredSizes>;
    return this.enumKeys;
  }

  initFilter(withTrue: boolean): FilteredSizes {
    if (withTrue) {
      this.filter = {
        small: true,
        medium: true,
        big: true
      } as FilteredSizes;
    }
    return this.filter;
  }

  drawLiInnerHtml(key: string, checkedString: string): string {
    let key2 = key as keyof typeof Size;
    return `<label class="size-filter-container__item_label size-icon">
    <input class="size-filter-container__item_checkbox size-icon__input checkbox" value="${key}" type="checkbox" ${checkedString}>
    <div class="size-filter-container__item_title size-icon__title">${Size[key2]}</div>
    </label>`
  }

}