import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken'
dotenv.config();

import UserRoutes from "./routes/UserRoutes.js"
import YtLinksRoutes from "./routes/YtLinksRoutes.js"
import rateLimiter from "./middleware/rateLimiter.js";

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

// Routes
app.use('/user', rateLimiter, UserRoutes);
app.use('/ytLinks', rateLimiter, YtLinksRoutes);

const verifyUser = (req, res, next) => {
    const accessTokens = req.cookies.accessToken

    if (!accessTokens) {
        console.log("No access token found, attempting renewal...");
        return renewTokens(req, res, next); // Try to renew token
    }

    jwt.verify(accessTokens, "jwt-access-token-secret-key", (err, decoded) => {
        if (err) {
            console.log("Invalid access token, attempting renewal...");
            return renewTokens(req, res, next); // Try to renew token
        }

        req.email = decoded.email;
        next();
    });
}

const renewTokens = (req, res, next) => {
    const refreshTokens = req.cookies.refreshToken

    if (!refreshTokens) {
        return res.status(401).json({ valid: false, message: "No Refresh Token" });
    }

    jwt.verify(refreshTokens, "jwt-refresh-token-secret-key", (err, decoded) => {
        if (err) {
            return res.status(403).json({ valid: false, message: "Invalid Refresh Token" });
        }

        // Generate a new access token
        const newAccessToken = jwt.sign({ email: decoded.email }, "jwt-access-token-secret-key", { expiresIn: "1m" });

        // Set new access token in cookie
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None", // Important for cross-site requests
            maxAge: 60000, // 1 minute
        });

        req.email = decoded.email; // Set user data for next middleware

        console.log("Access token renewed successfully!");
    });
    next();
}
app.get('/home', verifyUser, (req, res) => {
    return res.json({ valid: true, message: "authorized" })
})


app.listen(3000, "0.0.0.0", () => {
    console.log('Server is running on port 3000');
}); 