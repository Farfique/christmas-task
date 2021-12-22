import { Data } from "./model/data";
import GameView from "./views/gameView";
import WelcomeView from "./views/welcomeView";

class App {
  root: HTMLElement;
  welcomeView : WelcomeView;
  gameView : GameView;
  data: Data;

  constructor(){
    this.root = document.querySelector('#app')!;
    this.welcomeView = new WelcomeView();
    this.data = new Data();
  }


  async start(): Promise<void> {
    await this.data.init();
    this.gameView = new GameView(this.data);    
    this.root.append(this.welcomeView.initialize());
    this.welcomeView.subscribe((e) => {      
      this.root.append(this.gameView.initialize());
      this.welcomeView.close();
    })
  }
}

export default App;