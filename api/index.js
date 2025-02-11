import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
dotenv.config();

import UserRoutes from "./routes/UserRoutes.js"
import YtLinksRoutes from "./routes/YtLinksRoutes.js"

// Defining the requirements
const app = express();
app.use(cors({
    origin: [process.env.CORS_ORIGIN],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())

// Mongoose Connection
mongoose.connect(process.env.MONGO_URL)
    .then((result) => {
        console.log('connected to Mongodb');
    }).catch((err) => {
        console.error(err);
    });

const limiter = rateLimit({
    windowMs: 10 * 1000, // 10 seconds
    max: 1, // Max 2 requests per window
    message: { error: "Too many requests, please try again later." }
});

// Routes
app.use('/user', limiter, UserRoutes);
app.use('/ytLinks', limiter, YtLinksRoutes);


app.listen(3000, "0.0.0.0", () => {
    console.log('Server is running on port 3000');
}); 