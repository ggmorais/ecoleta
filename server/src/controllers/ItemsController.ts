import { Request, Response } from 'express';
import db from '../database/connection';

class ItemsController {
  async index(req: Request, res: Response) {
    const items = await db('items').select('*');

    const serializedItems = items.map(item => ({
      ...item,
      image: `http://10.0.0.5:5000/uploads/${item.image}`
    }))

    return res.json(serializedItems);

  }
}

export default ItemsController;