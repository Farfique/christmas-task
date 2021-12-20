import { Toy } from "./toy";

export class Data {
  toys: Toy[];
  rangeYear: number[];
  rangeCount: number[];

  constructor(){
    this.toys = [];
  }

  async init(): Promise<Toy[]>{
    try {
      let result = await fetch('assets/data/data.json');
      let info = await result.json() as {data: Toy[]};
      this.toys.push(...info.data);
      this.getRanges();
      return this.toys;
    }
    catch {
      console.log("error in getting toys data");
      return [];
    }    
  }

  getRanges(){
    this.rangeYear = this.getRange(this.toys, 'year');
    this.rangeCount = this.getRange(this.toys, 'count');
  }

  getRange(toysArr: Toy[], key: "year" | "count") : number[] {
    return [Math.min(...toysArr.map((toy) => toy[key])), Math.max(...toysArr.map((toy) => toy[key]))]
  }

}