import express from "express";
import {signup} from "../controllers/auth.js"
import { signin } from "../controllers/auth.js";
const router = express.Router();

// CREATE A USER
router.post("/signup",signup);
// SIGN IN
router.post("/signin",signin);
// GOOGLE AUTH
router.post("/google",)


export default router;