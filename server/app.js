import express from 'express';
import routers from './routes/route';
import joiErrors from './middlewares/joiErrors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {config} from '../config';

const database = config.dbUrl;
const app = express();
mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

dotenv.config(); // Sets environment's varibles

db.on('error', console.error.bind(console, "connection Error"))
db.once('open', () => {
  //console.log("DB is connected")
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routers);

// use celebrate middleware to handle joi errors
app.use(joiErrors());

app.use('*', (req, res) => res.status(404).send({
  status: 404,
  message: 'URL NOT FOUND',
}));

export default app;
