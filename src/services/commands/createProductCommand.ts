import Product from '../../models/product';

interface CreateProductData {
    name: string;
    description: string;
    price: number;
    stock: number;
}

export const createProductCommand = async (data: CreateProductData) => {
    const product = new Product(data);
    return await product.save();
};
