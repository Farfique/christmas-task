import { AbstractFilter } from "./abstractFilter";

export class FavoritesFilter extends AbstractFilter {
  filter: boolean;
  checkbox?: HTMLInputElement;
  filterEvent: CustomEvent;

  constructor(){
    super('onlyFavorites');
    this.filter = this.initFilter(false);
    this.filterEvent = new CustomEvent(`favoritesFilterEvent`, {bubbles: true});
  }

  initFilter(withTrue: boolean): boolean {
    if (!withTrue){
      this.filter = false;
    }
    else {
      this.filter = true;
    }
    return this.filter;
  }

  construct(): HTMLElement{
    this.root = document.createElement('div');
    this.root.classList.add(`favorites-filter-container`, 'filter-container');

    const title = document.createElement('h3');
    title.classList.add(`favorites-filter-container__title`, 'filter-container__title','h4-font');
    title.innerText = this.title;

    const labelContainer = document.createElement('div') as HTMLDivElement;
    labelContainer.classList.add('favorites-filter-container__label-container');

    let checkedString = this.filter? 'checked': '';
    labelContainer.innerHTML = this.drawLabel(this.key, checkedString);
    this.checkbox = labelContainer.querySelector('input')!;
    this.subscribe();

    this.root.append(title, labelContainer);

    return this.root;
  }

  drawLabel(key: string, checkedString: string): string {
    return `<label class="favorites-filter-container__item_label favorites-icon">
    <input class="favorites-filter-container__item_checkbox checkbox favorites-icon__input" value="${key}" type="checkbox" ${checkedString}>
    <div class="favorites-filter-container__item_color favorites-icon__title"></div>
  </label>`
  }

  reset() : void {
    this.initFilter(false);
    if (this.root && this.checkbox){
      this.checkbox.checked = false;
      this.root.dispatchEvent(this.filterEvent);
    }
  }

  subscribe(): void {
   if (this.checkbox){
      this.checkbox.addEventListener('change', () => {
        if (this.root && this.checkbox){
          this.filter = this.checkbox.checked;
          this.root.dispatchEvent(this.filterEvent);}
      })
   }
  }
}