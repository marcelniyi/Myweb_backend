import app from './app';
import dotenv from 'dotenv';
import {config} from '../config';


const port = config.port || 3000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
