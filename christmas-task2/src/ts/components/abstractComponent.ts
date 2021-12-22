export default class Component {
  root: HTMLElement;
  title: string;
  displayPreviousState: string;

  constructor(title = 'No title'){
    this.title = title;
  }

  construct() : HTMLElement { //must create an element and assign to this.root!
    return this.root;
  }

  hide(): void {
    if (this.root){
      if (window.getComputedStyle(this.root, null).display !== 'none'){
        this.displayPreviousState =  window.getComputedStyle(this.root, null).display;
      }
      this.root.style.display = 'none';
    }    
  }

  show() : void {
    if (this.root){
      this.root.style.display = this.displayPreviousState? this.displayPreviousState : 'block';
    }    
  }
}