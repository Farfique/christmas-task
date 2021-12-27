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

  const ball1 = this.drawBall();
  ball1.classList.add("ball-container-big");

  const ball2 = this.drawBall();
  ball2.classList.add("ball-container-small");

  this.root.append(ball1, ball2);

  return super.initialize();
}

subscribe(callback: (e: Event) => void): void {
  this.root.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.matches('button')){
      callback(event);
    }   
  });
}

drawBall(): HTMLElement {
  const ballContainer = document.createElement('div') as HTMLDivElement;
  ballContainer.classList.add('ball-container');

  const thread = document.createElement('div') as HTMLDivElement;
  thread.classList.add('ball-thread');
  

  const img = new Image();
  img.src = "./assets/ball/1.png";
  img.onload = () => {
    const ball = document.createElement('img');
    ball.classList.add('ball-image');
    ball.src = img.src;
    ball.alt = "";
    ballContainer.append(thread, ball);
  }
  return ballContainer;
}


}

const str =
`<h1 class="welcome-container__header">Помогите бабушке нарядить ёлку</h1>
<button class="welcome-container__start-button button">Начать</button>`