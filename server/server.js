import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cookieParser from "cookie-parser";
import {errorMiddleware} from "./middlewares/errorHandler.js";
import AWS from 'aws-sdk';

// Load environment variables
dotenv.config();


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const s3 = new AWS.S3();

// Initialize Express
const app = express();
app.use(express.json({ limit: '150mb' }));


app.use(
    cors({
      origin: "http://localhost:5173",
      method: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );

app.options('*', cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use(errorMiddleware);


// Database Connection
connectDB();

app.get('/', (req, res) => {
    res.send('Hello from the server...');
});



// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
