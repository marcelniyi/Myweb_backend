import express from 'express';
import dotenv from 'dotenv';
import routers from './routes/route';
import joiErrors from './middlewares/joiErrors';
import mongoose from 'mongoose';
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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

export default app;
