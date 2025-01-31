import express from "express";
import { SignIn, SignUp } from "../controllers/userControllers.js";

const router = express.Router();

router.post('/signUp', SignUp);
router.post('/signIn', SignIn);

export default router;