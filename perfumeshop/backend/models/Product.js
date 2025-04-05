import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    images: [String],
    sizes: [String]
});

export default mongoose.model('Product', ProductSchema);