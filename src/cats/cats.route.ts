import { Cat, CatType } from './cats.model';
import { Router } from 'express';
import { Module } from 'module';
import {
  createCat,
  deleteCat,
  readAllcat,
  readCat,
  updateCat,
  updatePartialCat,
} from './cats.service';

const router = Router();

router.get('/cats', readAllcat);

router.get('/cats/:id', readCat);

router.post('/cats', createCat);

router.put('/cats/:id', updateCat);

router.patch('/cats/:id', updatePartialCat);

router.delete('/cats/:id', deleteCat);

export default router;
