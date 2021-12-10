import Component from "./abstractComponent";

export default class Header extends Component{

  menu: Component[];

  constructor(menu : Component[]){
    super();
    this.title = '';
    this.menu = menu;
  }

  construct() : HTMLElement{
    const header = document.createElement('header') as HTMLElement;
    header.classList.add('app-header');

    const leftContainer = document.createElement('div') as HTMLElement;
    leftContainer.classList.add("app-header__left-container");

    const logo = document.createElement('div') as HTMLElement;
    logo.classList.add('app-header__logo-container');
    const logoImg = document.createElement('img') as HTMLImageElement;
    logoImg.alt = 'App logo';
    logoImg.src = './assets/svg/tree.svg';
    logo.append(logoImg);

    const menu = document.createElement('ul') as HTMLElement;
    menu.classList.add('main-menu');
    this.createMenu(menu);

    leftContainer.append(logo);
    leftContainer.append(menu);

    header.append(leftContainer);

    this.root = header;

    return super.construct();
  }

  createMenu(ul : HTMLElement) : void{
    for (let menuItem of this.menu) {
      let listItem = document.createElement('li') as HTMLElement;
      listItem.classList.add('main-menu__item');

      let itemLink = document.createElement('a') as HTMLAnchorElement;
      itemLink.classList.add('main-menu__link');
      itemLink.innerText = menuItem.title;
      itemLink.href = '#';
      itemLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (e.target instanceof HTMLElement){
          console.log("item with title = ", e.target.innerText);
          for (let item of this.menu) {
            if ( item.title !== e.target.innerText){
              item.hide()
            }
            else {
              menuItem.show();
            }
          }      
        }  
      });

      listItem.append(itemLink);

      ul.append(listItem);

    }
  }

}
