import { AbstractFilter } from "./abstractFilter";

export class FavoritesFilter extends AbstractFilter {
  filter: boolean;
  checkbox: HTMLInputElement;
  filterEvent: CustomEvent;

  constructor(){
    super('onlyFavorites');
    this.initFilter(false);
    this.filterEvent = new CustomEvent(`favoritesFilterEvent`, {bubbles: true});
  }

  initFilter(withTrue? : boolean): void {
    if (!withTrue){
      this.filter = false;
    }
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
    this.checkbox = labelContainer.querySelector('input');
    this.subscribe();

    this.root.append(title, labelContainer);

    return super.construct();
  }

  drawLabel(key: string, checkedString: string): string {
    return `<label class="favorites-filter-container__item_label favorites-icon">
    <input class="favorites-filter-container__item_checkbox checkbox favorites-icon__input" value="${key}" type="checkbox" ${checkedString}>
    <div class="favorites-filter-container__item_color favorites-icon__title"></div>
  </label>`
  }

  reset() : void {
    this.initFilter(false);
    this.checkbox.checked = false;
    this.root.dispatchEvent(this.filterEvent);
  }

  subscribe(): void {
    this.checkbox.addEventListener('change', () => {
      this.filter = this.checkbox.checked;
      this.root.dispatchEvent(this.filterEvent);
    })
  }
}