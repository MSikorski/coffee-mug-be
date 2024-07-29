import Joi from 'joi';

export const validateProduct = (product: any) => {
    const schema = Joi.object({
        name: Joi.string().max(50).required(),
        description: Joi.string().max(50).required(),
        price: Joi.number().positive().required(),
        stock: Joi.number().min(0).required(),
    });

    return schema.validate(product);
};

export const validateStock = (data: any) => {
    const schema = Joi.object({
        quantity: Joi.number().min(1).required(),
    });

    return schema.validate(data);
};

export const validateOrder = (order: any) => {
    const schema = Joi.object({
        customerId: Joi.string().required(),
        products: Joi.array().items(Joi.object({
            productId: Joi.string().required(),
            quantity: Joi.number().min(1).required(),
        })).required(),
    });

    return schema.validate(order);
};
