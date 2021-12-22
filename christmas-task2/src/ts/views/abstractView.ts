export default abstract class View {
  state: 'open' | 'closed';
  initialized: boolean;
  root: HTMLElement;

  constructor(){
    this.state = 'closed';
    this.initialized = false;
    this.root = document.createElement('div'); //меня вынудили
  }

  initialize() : HTMLElement {
    this.open();
    return this.root;
  }

  open() : void {
    this.state = 'open';
    this.root.style.display = 'block';
  }

  close() : void {
    this.state = 'closed';
    this.root.style.display = 'none';
  }

}