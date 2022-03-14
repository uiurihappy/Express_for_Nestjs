import * as express from 'express';
import { nextTick } from 'process';
import { Cat, CatType } from './app.model';

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

//* Read 고양이 전체 데이터 조회
app.get('/cats', (req, res) => {
  try {
    const cats = Cat;
    throw new Error('db connect error');
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//* Read 특정 고양이 데이터 조회
//* dynamic routing
app.get('/cats/:id', (req, res) => {
  try {
    const params = req.params;
    console.log(params);
    const cat = Cat.find(cat => {
      return cat.id === params.id;
    });
    // throw new Error('db connect error');
    res.status(200).send({
      success: true,
      data: {
        cat,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//* Create 새로운 고양이 생성 API
app.post('/cats', (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    Cat.push(data); // create

    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//* 404 error middleware
app.use((req, res, next) => {
  console.log('this is logging middleware');
  res.send({ error: '404 not found error' });
});

app.listen(8000, () => {
  console.log('Server is on....');
});
