import logger from "./logger.js";

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
    logger.error(`Error: ${err.message}`);

    res.status(500).json({
        error: "Internal Server Error",
        message: err.message,
    });
};

export default errorHandler;
