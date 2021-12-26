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

    this.subscribe();

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
  subscribe(){
    const imgArray = this.root?.querySelectorAll('.toy-decor-card__image') as NodeListOf<HTMLImageElement>;
    for (let img of imgArray){
      img.ondragstart = (event) => {
        console.log("dragstart detected");
        const target = event.target as HTMLElement;
        event.dataTransfer?.setData("text", target.id);
        event.dataTransfer?.setData('shiftx', "" + (event.clientX - target.getBoundingClientRect()?.left));
        event.dataTransfer?.setData('shifty', "" + (event.clientY - target.getBoundingClientRect()?.top));
      };
    }
  }


}