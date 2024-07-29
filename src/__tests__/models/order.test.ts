import mongoose from 'mongoose';
import Order from '../../models/order';
import Product from '../../models/product';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // Seed the database with a product for order tests
    await Product.deleteMany({});
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

describe('Order Model Test', () => {
    it('should create and save an order successfully', async () => {
        const product = await Product.findOne({ name: 'Coffee Mug' });
        const validOrder = new Order({
            customerId: 'customer123',
            products: [
                {
                    productId: product?._id,
                    quantity: 2,
                },
            ],
        });
        const savedOrder = await validOrder.save();
        expect(savedOrder._id).toBeDefined();
        expect(savedOrder.customerId).toBe(validOrder.customerId);
        expect(savedOrder.products[0].productId).toEqual(product?._id);
        expect(savedOrder.products[0].quantity).toBe(validOrder.products[0].quantity);
    });

    it('should fail to create an order without required fields', async () => {
        const invalidOrder = new Order({
            products: [
                {
                    productId: new mongoose.Types.ObjectId(),
                    quantity: 2,
                },
            ],
        });
        let err: any;
        try {
            await invalidOrder.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.customerId).toBeDefined();
    });

});
