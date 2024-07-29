import { Request, Response, NextFunction } from 'express';
import { createOrderCommand } from '../services/commands/createOrderCommand';
import { validateOrder } from '../validators/validate';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = validateOrder(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const order = await createOrderCommand(req.body);

        res.status(201).json(order);
    } catch (err) {
        return res.status(400).json({ error: 'Insufficient stock for one or more products' });
    }
};
