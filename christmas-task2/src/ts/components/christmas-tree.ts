import { Data } from "../model/data";
import { Toy } from "../model/toy";
import Component from "./abstractComponent";
import { DecorationSpace } from "./decorations/decorationSpace";
import { SelectToys } from "./decorations/selectToys";
import Settings from "../model/settings";

export default class ChristmasTree extends Component {
  toys: Toy[];
  decorationSpace: DecorationSpace;
  selectToys: SelectToys;
  
  constructor(toysData: Data) {
    super();
    this.title = 'Ёлка';
    this.toys = toysData.toys;
    this.decorationSpace = new DecorationSpace();

    let toysToSelect = this.toys.filter((toy) => toy.favorite);

    toysToSelect = toysToSelect.length > 0? toysToSelect : this.toys.slice(0, Settings.maxFavoritesNumber);

    this.selectToys = new SelectToys(toysToSelect);
  }

  construct(): HTMLElement {
    this.root = document.createElement('main');
    this.root.classList.add('christmas-tree-main');

    this.root.append(this.decorationSpace.construct());

    const rightDiv = document.createElement('div');
    rightDiv.classList.add('christmas-tree__right-section');
    rightDiv.append(this.selectToys.construct());

    this.root.append(rightDiv);


    return this.root;
  }
  
}