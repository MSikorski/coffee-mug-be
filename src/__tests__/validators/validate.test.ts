import { validateProduct, validateStock, validateOrder } from '../../validators/validate';

describe('Validation Tests', () => {
    describe('Product Validation', () => {
        it('should validate a correct product', () => {
            const product = {
                name: 'Coffee Mug',
                description: 'A large coffee mug',
                price: 9.99,
                stock: 100,
            };
            const { error } = validateProduct(product);
            expect(error).toBeUndefined();
        });

        it('should invalidate a product without a name', () => {
            const product = {
                description: 'A large coffee mug',
                price: 9.99,
                stock: 100,
            };
            const { error } = validateProduct(product);
            expect(error).toBeDefined();
            expect(error!.details[0].message).toContain('"name" is required');
        });

        it('should invalidate a product with a negative price', () => {
            const product = {
                name: 'Coffee Mug',
                description: 'A large coffee mug',
                price: -1,
                stock: 100,
            };
            const { error } = validateProduct(product);
            expect(error).toBeDefined();
            expect(error!.details[0].message).toContain('"price" must be a positive number');
        });
    });

    describe('Stock Validation', () => {
        it('should validate a correct stock', () => {
            const stock = {
                quantity: 10,
            };
            const { error } = validateStock(stock);
            expect(error).toBeUndefined();
        });

        it('should invalidate a stock with a negative quantity', () => {
            const stock = {
                quantity: -10,
            };
            const { error } = validateStock(stock);
            expect(error).toBeDefined();
            expect(error!.details[0].message).toContain('"quantity" must be greater than or equal to 1');
        });

        it('should invalidate a stock without quantity', () => {
            const stock = {};
            const { error } = validateStock(stock);
            expect(error).toBeDefined();
            expect(error!.details[0].message).toContain('"quantity" is required');
        });
    });

    describe('Order Validation', () => {
        it('should validate a correct order', () => {
            const order = {
                customerId: 'customer123',
                products: [
                    {
                        productId: '609c16bb5d1b2c001f58f56e',
                        quantity: 2,
                    },
                ],
            };
            const { error } = validateOrder(order);
            expect(error).toBeUndefined();
        });

        it('should invalidate an order without customerId', () => {
            const order = {
                products: [
                    {
                        productId: '609c16bb5d1b2c001f58f56e',
                        quantity: 2,
                    },
                ],
            };
            const { error } = validateOrder(order);
            expect(error).toBeDefined();
            expect(error!.details[0].message).toContain('"customerId" is required');
        });

        it('should invalidate an order with products missing productId', () => {
            const order = {
                customerId: 'customer123',
                products: [
                    {
                        quantity: 2,
                    },
                ],
            };
            const { error } = validateOrder(order);
            expect(error).toBeDefined();
            expect(error!.details[0].message).toContain('"products[0].productId" is required');
        });

        it('should invalidate an order with products missing quantity', () => {
            const order = {
                customerId: 'customer123',
                products: [
                    {
                        productId: '609c16bb5d1b2c001f58f56e',
                    },
                ],
            };
            const { error } = validateOrder(order);
            expect(error).toBeDefined();
            expect(error!.details[0].message).toContain('"products[0].quantity" is required');
        });
    });
});