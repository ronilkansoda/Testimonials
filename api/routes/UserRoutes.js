import express from "express";
import { SignIn, SignUp } from "../controllers/userControllers.js";
import errorHandler from "../utils/errorHandler.js";

const router = express.Router();

router.post('/signUp', SignUp);
router.post('/signIn', SignIn);

router.use(errorHandler);

export default router;