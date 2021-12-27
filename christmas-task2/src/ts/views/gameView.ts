import Component from "../components/abstractComponent";
import ChristmasTree from "../components/christmas-tree";
import Header from "../components/header";
import Toys from "../components/toys";
import View from "./abstractView";
import { Data } from "../model/data";

export default class Game extends View {
  header: Component;
  toys: Component;
  xmasTree: ChristmasTree;

  constructor(toysData: Data) {
    super();
    this.toys = new Toys(toysData);
    this.xmasTree = new ChristmasTree(toysData);
    this.header = new Header([this.toys, this.xmasTree]);
  }

  initialize() : HTMLElement {
    this.root = document.createElement('div');
    this.root.classList.add('game-view-container');
    this.root.append(this.header.construct());
    this.root.append(this.toys.construct());
    this.root.append(this.xmasTree.construct());
    this.xmasTree.hide();

    this.subscribe();

    return super.initialize();
  }

  subscribe(): void {
    this.root.addEventListener('changeFavoriteToyEvent', () => {
      this.xmasTree.redrawSelectToys();
    })
  }

}