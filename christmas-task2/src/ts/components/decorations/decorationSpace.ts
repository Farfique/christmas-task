import { Tree } from "../../model/tree";
import Component from "../abstractComponent"
import { Trees } from "../../data/trees";

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
    
    this.root.append(this.drawTree(Trees[0]));

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
  }
}