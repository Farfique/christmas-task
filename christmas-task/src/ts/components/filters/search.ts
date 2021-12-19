import Component from "../abstractComponent";

export class Search extends Component {
  input: HTMLInputElement;
  
  constructor(){
    super('Поиск');
  }

  construct(): HTMLElement {
    this.root = document.createElement('div');
    this.root.classList.add('search-container');

    const title = document.createElement('h2');
    title.classList.add('search-container__title', 'h2-font');
    title.innerText = this.title;

    this.input = document.createElement('input') as HTMLInputElement;
    this.input.classList.add('search-container__input', 'input-theme');
    this.input.placeholder = 'Название игрушки';

    this.root.append(title, this.input);

    this.subscribe();

    return super.construct();
  }

  subscribe(): void {
    this.input.addEventListener('input', () => {
        let inputEvent = new CustomEvent('searchChange', {bubbles: true, detail: {
          value: this.input.value
        }});
        this.root.dispatchEvent(inputEvent);
    })
  }
}
