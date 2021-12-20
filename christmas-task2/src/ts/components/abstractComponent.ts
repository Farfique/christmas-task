export default class Component {
  root: HTMLElement;
  title: string;

  constructor(title = 'No title'){
    this.title = title;
  }

  construct() : HTMLElement { //must create an element and assign to this.root!
    return this.root;
  }

  hide(): void {
    if (this.root){
      this.root.style.display = 'none';
    }    
  }

  show() : void {
    if (this.root){
      this.root.style.display = 'block';
    }    
  }
}