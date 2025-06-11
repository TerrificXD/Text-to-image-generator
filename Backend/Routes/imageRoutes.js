// Routes/imageRoutes.js
import express from "express";
import { generateImage } from "../controller/imageControler.js";
import userAuth from "../Middlewares/auth.js";

const router = express.Router();

// POST /api/image/generate (protected route)
// localhost:5000/api/image/generate
router.post("/generate", userAuth, generateImage);

export default router;
