import Component from "../abstractComponent"

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

    


    const tree = document.createElement('img') as HTMLImageElement;
    tree.classList.add("decoration-space__tree");
    tree.src = './assets/tree/1.png';
    tree.alt = "Tree";
    tree.useMap = "#map-1";

    const map = document.createElement('map') as HTMLMapElement;
    map.classList.add('decoration-space__map');
    map.innerHTML = `<map name="map-1">
    <area alt="tree" title="tree" coords="119,677,101,673,123,641,75,654,59,623,41,621,23,601,44,577,9,577,0,544,16,531,74,534,91,515,80,507,79,494,56,504,46,494,41,483,44,471,23,460,16,451,23,429,98,431,108,387,70,366,76,344,142,358,111,328,115,305,160,292,117,275,122,249,99,232,107,205,153,220,171,212,159,187,177,167,150,138,168,120,195,139,196,116,200,103,189,91,203,63,198,50,223,34,238,0,266,5,267,35,289,48,292,62,312,70,311,86,279,123,307,113,318,130,311,154,345,136,364,151,351,184,356,216,394,207,406,234,362,265,395,276,397,301,366,311,379,322,391,343,425,336,433,368,374,389,372,404,406,398,417,428,454,436,457,470,428,478,425,497,437,522,493,527,496,565,479,585,441,678,389,665,379,688,362,704,340,701,306,707,293,696,239,708,225,688,215,704,181,713,161,655,137,691,126,688" shape="poly">
    </map>`;

    this.root.append(tree, map);


    return this.root;
  }
}