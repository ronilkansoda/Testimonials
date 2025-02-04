import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import UserRoutes from "./routes/UserRoutes.js"
import YtLinksRoutes from "./routes/YtLinksRoutes.js"

// Defining the requirements
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// Mongoose Connection
mongoose.connect(process.env.MONGO_URL)
    .then((result) => {
        console.log('connected to Mongodb');
    }).catch((err) => {
        console.error(err);
    });


// Routes
app.use('/user', UserRoutes);
app.use('/ytLinks', YtLinksRoutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 