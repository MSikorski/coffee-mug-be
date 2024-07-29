import Order from '../../models/order';

export const getOrderByIdQuery = async (orderId: string) => {
    return Order.findById(orderId).populate('products.productId');
};
