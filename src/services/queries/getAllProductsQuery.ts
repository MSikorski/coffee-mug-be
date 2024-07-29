import Product from '../../models/product';

export const getAllProductsQuery = async () => {
    return Product.find();
};
