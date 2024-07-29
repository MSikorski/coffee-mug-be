import { Request, Response, NextFunction } from 'express';
import { createProductCommand } from '../services/commands/createProductCommand';
import { restockProductCommand } from '../services/commands/restockProductCommand';
import { sellProductCommand } from '../services/commands/sellProductCommand';
import { getAllProductsQuery } from '../services/queries/getAllProductsQuery';
import { validateProduct, validateStock } from '../validators/validate';

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await getAllProductsQuery();
        res.json(products);
    } catch (err) {
        next(err);
    }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = validateProduct(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const product = await createProductCommand(req.body);
        res.status(201).json(product);
    } catch (err) {
        next(err);
    }
};

export const restockProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = validateStock(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const product = await restockProductCommand(req.params.id, req.body.quantity);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        res.json(product);
    } catch (err) {
        next(err);
    }
};

export const sellProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = validateStock(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const product = await sellProductCommand(req.params.id, req.body.quantity);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        res.json(product);
    } catch (err) {
        next(err);
    }
};
