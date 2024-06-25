import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRouter from './userRouter.js';

const app = express();

const db =
  'mongodb+srv://notesmaker:1234567890@cluster0.aejqplt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(db)
  .then(() => console.log('Established a connection to db'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
  })
);

app.use('/', userRouter);

app.listen(8800, () => {
  console.log('Server Initialized on Port 8800');
});
