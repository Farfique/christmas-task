import { Data } from "../model/data";
import { Toy } from "../model/toy";
import Component from "./abstractComponent";
import { DecorationSpace } from "./decorations/decorationSpace";
import { SelectToys } from "./decorations/selectToys";
import Settings from "../model/settings";
import { SelectTree } from "./decorations/selectTree";
import { SelectBackground } from "./decorations/selectBackground";
import { SelectGarland } from "./decorations/selectGarland";

export default class ChristmasTree extends Component {
  toys: Toy[];
  decorationSpace: DecorationSpace;
  selectToys: SelectToys;
  selectTree: SelectTree;
  selectBackground: SelectBackground;
  selectGarland: SelectGarland;
  
  constructor(toysData: Data) {
    super();
    this.title = 'Ёлка';
    this.toys = toysData.toys;
    this.decorationSpace = new DecorationSpace();

    let toysToSelect = this.toys.filter((toy) => toy.favorite);

    toysToSelect = toysToSelect.length > 0? toysToSelect : this.toys.slice(0, Settings.maxFavoritesNumber);

    this.selectToys = new SelectToys(toysToSelect);
    this.selectTree = new SelectTree();
    this.selectBackground = new SelectBackground();
    this.selectGarland = new SelectGarland();
  }

  construct(): HTMLElement {
    this.root = document.createElement('main');
    this.root.classList.add('christmas-tree-main');

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('christmas-tree__left-section');
    leftDiv.append(this.selectTree.construct(), this.selectBackground.construct(), this.selectGarland.construct());
    this.root.append(leftDiv);

    this.root.append(this.decorationSpace.construct());

    


    const rightDiv = document.createElement('div');
    rightDiv.classList.add('christmas-tree__right-section');
    rightDiv.append(this.selectToys.construct());

    this.root.append(rightDiv);

    this.subscribe();


    return this.root;
  }

  subscribe(): void {
    this.root?.addEventListener('selectedTreeEvent', () => {
      this.decorationSpace.changeTree(this.selectTree.selectedTree);
    });
    this.root?.addEventListener('selectBackgroundEvent', () => {
      this.decorationSpace.changeBackground(this.selectBackground.selectedBackground);
    });
    this.root?.addEventListener('selectGarlandEvent', () => {
      this.decorationSpace.changeGarland(this.selectGarland.selectedGarland);
    })
  }

  redrawSelectToys(): void {
    let toysToSelect = this.toys.filter((toy) => toy.favorite);
    toysToSelect = toysToSelect.length > 0? toysToSelect : this.toys.slice(0, Settings.maxFavoritesNumber);

    this.selectToys.redrawToys(toysToSelect);
  }
  
}