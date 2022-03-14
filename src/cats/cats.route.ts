import { Cat, CatType } from './cats.model';
import { Router } from 'express';
import { Module } from 'module';

const router = Router();

//* Read 고양이 전체 데이터 조회
router.get('/cats', (req, res) => {
  try {
    const cats = Cat;
    //throw new Error('db connect error');
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
router.get('/cats/:id', (req, res) => {
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
router.post('/cats', (req, res) => {
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

export default router;
