import Product from '../../models/product';

export const restockProductCommand = async (productId: string, quantity: number) => {
    const product = await Product.findById(productId);
    if (!product) return null;

    product.stock += quantity;
    return await product.save();
};
