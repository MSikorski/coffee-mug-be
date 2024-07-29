import mongoose from 'mongoose';
import Product from '../../models/product';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Product Model Test', () => {
    it('should create and save a product successfully', async () => {
        const validProduct = new Product({
            name: 'Coffee Mug',
            description: 'A large coffee mug',
            price: 9.99,
            stock: 100,
        });
        const savedProduct = await validProduct.save();
        expect(savedProduct._id).toBeDefined();
        expect(savedProduct.name).toBe(validProduct.name);
        expect(savedProduct.description).toBe(validProduct.description);
        expect(savedProduct.price).toBe(validProduct.price);
        expect(savedProduct.stock).toBe(validProduct.stock);
    });

    it('should fail to create a product without required fields', async () => {
        const invalidProduct = new Product({
            description: 'A large coffee mug',
            price: 9.99,
        });
        let err: any;
        try {
            await invalidProduct.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.name).toBeDefined();
        expect(err.errors.stock).toBeDefined();
    });

    it('should fail to create a product with a negative price', async () => {
        const invalidProduct = new Product({
            name: 'Coffee Mug',
            description: 'A large coffee mug',
            price: -1,
            stock: 100,
        });
        let err: any;
        try {
            await invalidProduct.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.price).toBeDefined();
    });
});
