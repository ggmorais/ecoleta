import { Request, Response } from 'express';
import db from '../database/connection';

class PointsController {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await db('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where({ city, uf })
      .distinct()
      .select('points.*');

    const serializedPoints = points.map(point => ({
      ...point,
      image: `http://10.0.0.5:5000/uploads/${point.image}`
    }));

    return res.json(serializedPoints);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await db('points').where({ id }).first();

    if (!point) {
      return res.status(400).json({ message: 'Point not found' });
    }

    const items = await db('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id);

    const serializedPoint = {
      ...point,
      image: `http://10.0.0.5:5000/uploads/${point.image}`
    }

    return res.json({ serializedPoint, items });

  }

  async create(req: Request, res: Response) {
    const { 
      name, 
      email, 
      whatsapp, 
      latitude, 
      longitude, 
      city,
      uf,
      items
    } = req.body;

    const point = {
      image: req.file.filename,
      name, 
      email, 
      whatsapp, 
      latitude, 
      longitude, 
      city, 
      uf
    }
  
    const trx = await db.transaction();
  
    const insertedIds = await trx('points').insert(point);
  
    const point_id = insertedIds[0];
  
    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => ({
        item_id,
        point_id
      }));
  
    await trx('point_items').insert(pointItems);
    
    await trx.commit();

    return res.json({ 
      ...point,
      id: point_id
    });
  }
}

export default PointsController;