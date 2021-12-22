import { Toy } from "../model/toy";
import Component from "./abstractComponent";

export default class ToyInfoCard extends Component {
  toyInfo: Toy;

  constructor(info: Toy){
    super();
    this.toyInfo = info;
  }

  construct(){
    const card = document.createElement('div');
    card.classList.add('card', 'toy-info-card');
    card.innerHTML = this.innerHtml();
    

    this.root = card;
    this.subscribe();

    return this.root;
  }

  innerHtml(): string {
    let checkedString = this.toyInfo.favorite? 'checked': '';

    return `<h3 class="toy-info-card__title">${this.toyInfo.name}</h3>
    <img class="toy-info-card__img" src="./assets/toys/${this.toyInfo.num}.png" alt="Игрушка ${this.toyInfo.name}">
    <p class="toy-info-card__prop">Количество: ${this.toyInfo.count}</p>
    <p class="toy-info-card__prop">Год покупки: ${this.toyInfo.year}</p>
    <p class="toy-info-card__prop">Форма: ${this.toyInfo.shape}</p>
    <p class="toy-info-card__prop">Цвет: ${this.toyInfo.color}</p>
    <p class="toy-info-card__prop">Размер: ${this.toyInfo.size}</p>
    <label class="toy-info-card__favorite">
      <input class="toy-info-card__favorite-checkbox checkbox-favorite" type="checkbox" ${checkedString}>
      <div class="toy-info-card__favorite-icon"></div>
    </label>`
  }

  subscribe(): void {
    if (this.root){
      const input = this.root.querySelector('.checkbox-favorite') as HTMLInputElement;
      input.addEventListener('change', () => {
        this.toyInfo.favorite = input.checked;
      })
    }
  }

}