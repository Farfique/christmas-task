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

    return super.construct();
  }

  innerHtml(): string {
    return `<h3 class="toy-info-card__title">${this.toyInfo.name}</h3>
    <img class="toy-info-card__img" src="./assets/toys/${this.toyInfo.num}.png" alt="Игрушка ${this.toyInfo.name}">
    <p class="toy-info-card__prop">Количество: ${this.toyInfo.count}</p>
    <p class="toy-info-card__prop">Год покупки: ${this.toyInfo.year}</p>
    <p class="toy-info-card__prop">Форма игрушки: ${this.toyInfo.shape}</p>
    <p class="toy-info-card__prop">Цвет игрушки: ${this.toyInfo.color}</p>
    <p class="toy-info-card__prop">Размер игрушки: ${this.toyInfo.size}</p>
    <p class="toy-info-card__prop">Любимая: нет</p>`
  }
}