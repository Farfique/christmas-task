import { Toy } from "./toy";

export class Data {
  toys: Toy[];

  constructor(){
    this.toys = [];
  }

  async init(): Promise<Toy[]>{
    try {
      let result = await fetch('assets/data/data.json');
      let info = await result.json();
      console.log("info = ", info.data);
      this.toys.push(...info.data);
      console.log("toys = ", this.toys);
      return this.toys;
    }
    catch {
      console.log("error in getting toys data");
      return [];
    }    
  }




}