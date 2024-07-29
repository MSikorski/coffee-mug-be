import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    price: number;
    stock: number;
}

const productSchema: Schema = new Schema({
    name: { type: String, required: true, maxlength: 50 },
    description: { type: String, required: true, maxlength: 50 },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 }
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
