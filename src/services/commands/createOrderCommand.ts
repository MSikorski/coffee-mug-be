import Order from '../../models/order';
import Product from '../../models/product';

interface CreateOrderData {
    customerId: string;
    products: Array<{
        productId: string;
        quantity: number;
    }>;
}

export const createOrderCommand = async (data: CreateOrderData) => {
    const { customerId, products } = data;
    const productIds = products.map(p => p.productId);

    const dbProducts = await Product.find({ _id: { $in: productIds } });

    for (const product of products) {
        const dbProduct = dbProducts.find(p => p._id.toString() === product.productId);
        if (!dbProduct || dbProduct.stock < product.quantity) {
            throw new Error('Insufficient stock for one or more product');
        }
    }

    for (const product of products) {
        const dbProduct = dbProducts.find(p => p._id.toString() === product.productId)!;
        dbProduct.stock -= product.quantity;
        await dbProduct.save();
    }

    const order = new Order({ customerId, products });
    return await order.save();
};
