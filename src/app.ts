import * as express from 'express';
import catsRouter from './cats/cats.route';
import { nextTick } from 'process';

const app: express.Express = express();
const data = [1, 2, 3, 4];

//* logging middleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log('this is logging middleware');
  next();
});

//* json middleware
app.use(express.json());

app.use(catsRouter);

//* 404 error middleware
app.use((req, res, next) => {
  console.log('this is logging middleware');
  res.send({ error: '404 not found error' });
});

app.listen(8000, () => {
  console.log('Server is on....');
});
