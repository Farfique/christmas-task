import Component from "../components/abstractComponent";
import ChristmasTree from "../components/christmas-tree";
import Header from "../components/header";
import Toys from "../components/toys";
import View from "./abstractView";
import { Data } from "../model/data";

export default class Game extends View {
  header: Component;
  toys: Component;
  xmasTree: Component;

  constructor(toysData: Data) {
    super();
    console.log("gameview constructor: toysdata: ", toysData);
    this.toys = new Toys(toysData);
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