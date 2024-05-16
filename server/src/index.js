import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import grapesRoutes from './routes/grapes.routes.js';

dotenv.config();

const URL = process.env.MONGODB_URI;
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
// Connect to MongoDB
try {
  mongoose.connect(URL)
  console.log('Connected to MongoDB')
} catch (error) {
  console.log(error)
} 

// Define routes and middleware

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api",authRoutes);
app.use("/api",grapesRoutes);