import App from './ts/app';
import './styles.scss';
import { reportText2 } from './ts/utils/reportFile2';


const app = new App();
app.start();
writeReport();

function writeReport(){
  reportText2.forEach((str) => {
    console.log(str);
  })
}

