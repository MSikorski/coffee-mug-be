import mongoose, { Document, Schema } from 'mongoose';

interface IOrder extends Document {
    _id: mongoose.Types.ObjectId;
    customerId: string;
    products: Array<{
        productId: mongoose.Schema.Types.ObjectId;
        quantity: number;
    }>;
    createdAt: Date;
}

const orderSchema: Schema = new Schema({
    customerId: { type: String, required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 }
    }],
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
