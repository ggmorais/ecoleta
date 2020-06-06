import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';
import ItemsController from './controllers/ItemsController';
import PointsController from './controllers/PointsController';
import multerConfig from './config/multer';

const routes = Router();
const upload = multer(multerConfig);

const items = new ItemsController();
const points = new PointsController();

routes.get('/items', items.index);

routes.get('/points/:id', points.show);
routes.get('/points', points.index);
routes.post(
  '/points',
  upload.single('image'), 
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
    })
  }), 
  points.create
);

export default routes;