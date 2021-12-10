export default class View {
  state: 'open' | 'closed';
  initialized: boolean;
  root: HTMLElement;

  constructor(){
    this.state = 'closed';
    this.initialized = false;
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