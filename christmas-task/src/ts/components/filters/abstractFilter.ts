import Component from "../abstractComponent";
import { FilterCategoriesNames } from "../../model/enums";

export class AbstractFilter extends Component {
  key: string //same as in Toy type

  constructor(key: string){
    super(FilterCategoriesNames[key]);
    this.key = key;
  }

  construct(): HTMLElement{
    return super.construct();
  }

  reset(): void {

  }
}