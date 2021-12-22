import App from './ts/app';
import './styles.scss';
import { reportText } from './ts/utils/reportFile';


const app = new App();
app.start();
//writeReport();

function writeReport(){
  reportText.forEach((str) => {
    console.log(str);
  })
}

