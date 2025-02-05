import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import UserRoutes from "./routes/UserRoutes.js"
import YtLinksRoutes from "./routes/YtLinksRoutes.js"

// Defining the requirements
const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
dotenv.config();

// Mongoose Connection
mongoose.connect(process.env.MONGO_URL)
    .then((result) => {
        console.log('connected to Mongodb');
    }).catch((err) => {
        console.error(err);
    });

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Max 20 requests per window
    error: "Too many requests, please try again later.",
});

// Routes
app.use('/user', UserRoutes, limiter);
app.use('/ytLinks', YtLinksRoutes, limiter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 