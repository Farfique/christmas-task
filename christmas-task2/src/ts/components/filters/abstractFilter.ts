import Component from "../abstractComponent";
import { FilterCategoriesNames } from "../../model/enums";

export abstract class AbstractFilter extends Component {
  key: string //same as in Toy type

  constructor(key: keyof typeof FilterCategoriesNames){
    super(FilterCategoriesNames[key]);
    this.key = key;
  }

  abstract construct(): HTMLElement;

  abstract reset(): void;
}