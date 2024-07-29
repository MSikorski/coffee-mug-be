import request from 'supertest';
import mongoose from 'mongoose';
import Product from '../../models/product';
import Order from '../../models/order';
import app from '../../server';

describe('Order Controller Test', () => {
    beforeAll(async () => {
        await Product.deleteMany({});
        await Order.deleteMany({});
        const product = new Product({
            name: 'Coffee Mug',
            description: 'A large coffee mug',
            price: 9.99,
            stock: 100,
        });
        await product.save();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create and save an order successfully', async () => {
        const product = await Product.findOne({ name: 'Coffee Mug' });
        const res = await request(app)
            .post('/orders')
            .send({
                customerId: 'customer123',
                products: [
                    {
                        productId: product?._id.toString(),
                        quantity: 2,
                    },
                ],
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.customerId).toBe('customer123');
        expect(res.body.products[0].productId).toEqual(product?._id.toString());
        expect(res.body.products[0].quantity).toBe(2);
    });

    it('should fail to create an order without required fields', async () => {
        const res = await request(app)
            .post('/orders')
            .send({
                products: [
                    {
                        productId: new mongoose.Types.ObjectId().toString(),
                        quantity: 2,
                    },
                ],
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toContain('customerId');
    });

    it('should fail to create an order with insufficient stock', async () => {
        const product = await Product.findOne({ name: 'Coffee Mug' });
        const res = await request(app)
            .post('/orders')
            .send({
                customerId: 'customer123',
                products: [
                    {
                        productId: product?._id.toString(),
                        quantity: 1000,
                    },
                ],
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toContain('Insufficient stock for one or more products');
    });
});
