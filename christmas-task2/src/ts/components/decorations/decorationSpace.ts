import { Tree } from "../../model/tree";
import Component from "../abstractComponent"
import { Trees } from "../../data/trees";
import { Garland } from "../../model/enums";

export class DecorationSpace extends Component {
  constructor(){
    super();
  }

  construct(): HTMLElement {
    this.root = document.createElement('div');
    this.root.classList.add('decoration-space-container');
    let bgrImage = new Image();
    bgrImage.src = "./assets/bg/1.jpg";
    bgrImage.onload = () => {
      this.root!.style.backgroundImage = 'url("' + bgrImage.src + '")';
    }
    
    this.root.append(this.drawGarland("none", this.drawTree(Trees[0])));

    this.subscribe();

    return this.root;
  }

  changeTree(treeInfo: Tree): void {
    let image = new Image();
    image.src = `./assets/tree/${treeInfo.num}.png`;
    image.onload = () => {
      const tree = this.root?.querySelector('.decoration-space__image') as SVGImageElement;
      //tree.setAttribute('href', image.src);
      tree.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', image.src);
      const polygon = this.root?.querySelector('polygon') as SVGPolygonElement;
      //polygon.points = treeInfo.points;
      polygon.setAttribute('points', treeInfo.points)

      const svg = this.root?.querySelector('.decoration-space__svg') as SVGImageElement;
      svg.setAttribute('viewBox', `0 0 ${treeInfo.width} ${treeInfo.height}`);
    }
  }

  changeBackground(num: number): void {
    let bgrImage = new Image();
    bgrImage.src = `./assets/bg/${num}.jpg`;
    bgrImage.onload = () => {
      this.root!.style.backgroundImage = 'url("' + bgrImage.src + '")';
    }
  }

  changeGarland(key: keyof typeof Garland): void {
      const tree = this.root?.querySelector('.decoration-space__tree') as HTMLElement;
      const regex = /garland-color-[\w]*/i;
      for (let i = 0; i < tree.classList.length; i++){
        if (regex.test(tree.classList[i])){
          tree.classList.remove(tree.classList[i]);
        }
      }
      tree.classList.add(`garland-color-${key}`);
  }

  drawTree(tree: Tree): HTMLElement {
    const figure = document.createElement('div') as HTMLElement;
    figure.classList.add("decoration-space__tree");
    figure.id = "decorated-tree";
    figure.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="decoration-space__svg" viewBox="0 0 ${tree.width} ${tree.height}" >
    <image class="decoration-space__image" xlink:href="./assets/tree/${tree.num}.png">
    </image>
    <polygon class="decoration-space__polygon" preserveAspectRatio="XmidYmid meet" points="${tree.points}"/>
    </svg>`;
    return figure;
  }

  drawGarland(type: keyof typeof Garland, container: HTMLElement): HTMLElement {

    container.classList.add(`garland-color-${type}`);

    for (let i = 1; i <= 9; i++){
      let ball = document.createElement('div') as HTMLElement;
      ball.classList.add('garland-container__ball', `garland-ball-${i}`);
      container.append(ball);
    }

    return container;
  }


  subscribe(){
    const polygon = this.root?.querySelector('polygon') as SVGPolygonElement;
    polygon.ondrop = (event) => {
      event.preventDefault();
      console.log("drop detected");
      const data = event.dataTransfer?.getData("text");
      if (data && document.getElementById(data)){
        const dropped = document.getElementById(data) as HTMLElement;
       
        const rectX = this.root?.getBoundingClientRect()?.x;
        const rectY = this.root?.getBoundingClientRect()?.y;
        console.log("top rect: ", rectY, "left rect:", rectX);
        const eventX = event.clientX;
        const eventY = event.clientY;
        console.log("eventX: ", eventX, "eventY:", eventY);
        const shiftX = event.dataTransfer?.getData("shiftx");
        let shiftXNumber = shiftX? +shiftX : 0;
        const shiftY = event.dataTransfer?.getData("shifty");
        let shiftYNumber = shiftY? +shiftY : 0;


        dropped.style.left = "" + (eventX - rectX! - shiftXNumber) + "px";

        dropped.style.top = "" + (eventY - rectY! - shiftYNumber) + "px";
        console.log("top: ", dropped.style.top, "left:", dropped.style.left);
        this.root?.append(dropped);
      }
      
    };
    polygon.ondragover = (event) => {
      event.preventDefault();
      console.log("dragover detected");
    };
    document.ondragover = (event) => {
      if (event.defaultPrevented) return;
      event.preventDefault();
      console.log("other dragover");
    }
    document.ondrop = (event) => {
      if (event.defaultPrevented) return;
      event.preventDefault();
      const data = event.dataTransfer?.getData("text");
      if (data && document.getElementById(data)){
        const dropped = document.getElementById(data) as HTMLElement;
        const home = document.getElementById(data.split('_')[0]) as HTMLElement;
        if (home){
          dropped.style.left = "";
          dropped.style.top = "";
          home.append(dropped);
          const returnHomeEvent= new CustomEvent('returnHomeEvent', {bubbles: true});
          home.dispatchEvent(returnHomeEvent);
        }
      }

      console.log("other drop");
    }
  }
}