export default class Component {
  root: HTMLElement;
  title: string;

  constructor(){
    this.title = 'No title';
  }

  construct() : HTMLElement {
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