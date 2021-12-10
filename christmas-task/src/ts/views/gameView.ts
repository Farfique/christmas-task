import Component from "../components/abstractComponent";
import ChristmasTree from "../components/christmas-tree";
import Header from "../components/header";
import Toys from "../components/toys";
import View from "./abstractView";

export default class Game extends View {
  header: Component;
  toys: Component;
  xmasTree: Component;

  constructor() {
    super();
    this.toys = new Toys();
    this.xmasTree = new ChristmasTree();
    this.header = new Header([this.toys, this.xmasTree]);
  }

  initialize() : HTMLElement {
    this.root = document.createElement('div');
    this.root.append(this.header.construct());

    this.root.append(this.toys.construct());

    return super.initialize();
  }

}