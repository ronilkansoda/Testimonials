import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 10 * 1000, // 10 seconds
    max: 1, // Max 2 requests per window
    message: { error: "Too many requests, please try again later." }
});

export default limiter;