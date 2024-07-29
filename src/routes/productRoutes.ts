import { Router } from 'express';
import { getAllProducts, createProduct, restockProduct, sellProduct } from '../controllers/productController';

const router = Router();

router.get('/', getAllProducts);
router.post('/', createProduct);
router.post('/:id/restock', restockProduct);
router.post('/:id/sell', sellProduct);

export default router;
