import GameView from "./views/gameView";
import WelcomeView from "./views/welcomeView";

class App {
  root: HTMLElement;
  welcomeView : WelcomeView;
  gameView : GameView;


  constructor(){
    this.root = document.querySelector('#app');
    this.welcomeView = new WelcomeView();
    this.gameView = new GameView();
  }


  start(): void {
    this.root.append(this.welcomeView.initialize());
    this.welcomeView.subscribe((e) => {      
      this.root.append(this.gameView.initialize());
      this.welcomeView.close();
    })
  }
}

export default App;