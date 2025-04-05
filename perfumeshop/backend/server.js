import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import path from 'path';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// ✅ Serve static image files
app.use('/uploads', express.static(path.resolve('uploads')));

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// ✅ Define routes
app.use('/products', productRoutes);
app.use('/reviews', reviewRoutes);

// ✅ Start the server
app.listen(5000, () => console.log("Server running on port 5000"));