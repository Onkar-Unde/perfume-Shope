import express from 'express';
import Review from '../models/Review.js';
const router = express.Router();

router.post('/', async(req, res) => {
    const newReview = new Review(req.body);
    await newReview.save();
    res.json(newReview);
});

router.get('/:productId', async(req, res) => {
    const reviews = await Review.find({ productId: req.params.productId });
    res.json(reviews);
});

export default router;