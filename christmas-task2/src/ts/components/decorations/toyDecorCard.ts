import { Toy } from "../../model/toy";
import Component from "../abstractComponent";

export class ToyDecorCard extends Component {
  toyInfo: Toy;
  imgSrc: string;

  constructor(toy: Toy) {
    super();
    this.toyInfo = toy;
    this.imgSrc = `./assets/toys/${this.toyInfo.num}.png`;
  }

  construct(): HTMLElement {
    this.root = document.createElement('div') as HTMLDivElement;
    this.root.classList.add('toy-decor-card', 'card');

    this.root.append(...this.drawImages());

    const count = document.createElement('div');
    count.classList.add('toy-decor-card__number-left');
    count.innerText = '' + this.toyInfo.count;

    this.root.append(count);

    return this.root;
  }

  drawImages(): HTMLImageElement[]{
    let arr = [];
    for (let i = 0; i < this.toyInfo.count; i++){
      let img = document.createElement('img') as HTMLImageElement;
      img.classList.add('toy-decor-card__image');
      img.id = this.toyInfo.num + '_' + i;
      img.draggable = true;
      img.src = this.imgSrc;
      arr.push(img);
    }

    return arr;
  }

  //TODO subscribe to drop and move back


}