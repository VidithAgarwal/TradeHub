import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import {errorMiddleware} from "./middlewares/errorHandler.js";


// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use(errorMiddleware);


// Database Connection
connectDB();

app.get('/', (req, res) => {
    res.send('Hello from the server...');
});



// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
