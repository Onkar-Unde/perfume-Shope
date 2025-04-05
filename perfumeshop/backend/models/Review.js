import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    reviewer: String,
    comment: String,
    rating: Number
});

export default mongoose.model('Review', ReviewSchema);