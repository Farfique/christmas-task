import { Toy } from "../../model/toy";
import Component from "../abstractComponent";

export class ToyDecorCard extends Component {
  toyInfo: Toy;
  imgSrc: string;
  amountLeft: number;
  countElement: HTMLElement;

  constructor(toy: Toy) {
    super();
    this.toyInfo = toy;
    this.imgSrc = `./assets/toys/${this.toyInfo.num}.png`;
    this.amountLeft = this.toyInfo.count;
    this.countElement = document.createElement('div');
  }

  construct(): HTMLElement {
    this.root = document.createElement('div') as HTMLDivElement;
    this.root.classList.add('toy-decor-card', 'card');
    this.root.id = "" + this.toyInfo.num;

    this.root.append(...this.drawImages());

    this.countElement.classList.add('toy-decor-card__number-left');
    this.countElement.innerText = '' + this.amountLeft;

    this.root.append(this.countElement);

    this.subscribe();

    return this.root;
  }

  drawImages(): HTMLImageElement[]{
    let arr = [];
    for (let i = 0; i < this.amountLeft; i++){
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
      
        if (img.parentNode === this.root){
          this.countElement.innerText = "" + (--this.amountLeft);
        }
        
      };
    };

    this.root?.addEventListener('returnHomeEvent', (event) => {
      console.log("returnHomeevent target: ", event.target);
      this.countElement.innerText = "" + (++this.amountLeft);
    });
  }


}