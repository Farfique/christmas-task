import View from './abstractView';

export default class WelcomePage extends View {

  constructor() {
    super();
  }


initialize(): HTMLElement {
  const main = document.createElement('main') as HTMLElement;
  main.classList.add('welcome-container');

  /*const header = document.createElement('h1') as HTMLElement;
  header.classList.add('welcome-container__header');
  header.innerText = 'Помогите бабушке нарядить ёлку';

  const button = document.createElement('button') as HTMLButtonElement;
  button.classList.add('welcome-container__start-button', 'button');
  button.innerText = 'Начать';

  main.append(header);
  main.append(button); 
  */

  main.innerHTML = str;

  this.root = main;

  return super.initialize();
}

subscribe(callback: (e: Event) => void): void {
  this.root.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.matches('button')){
      callback(event);
    }   
  });
}


}

const str =
`<h1 class="welcome-container__header">Помогите бабушке нарядить ёлку</h1>
<button class="welcome-container__start-button button">Начать</button>`