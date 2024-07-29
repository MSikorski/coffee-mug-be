import Product from '../../models/product';

export const sellProductCommand = async (productId: string, quantity: number) => {
    const product = await Product.findById(productId);
    if (!product) return null;

    if (product.stock < quantity) {
        throw new Error('Insufficient stock');
    }

    product.stock -= quantity;
    return await product.save();
};
