import express from "express";
import cors from "cors";
import UserRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

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
app.use('/api', UserRoutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 