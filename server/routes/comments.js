import {addComment,deleteComment,getComment} from "../controllers/comment.js";
import express from "express";
import {verifyToken} from "../verifyToken.js"
const router = express.Router();
router.post("/",verifyToken,addComment);
router.delete("/:id",verifyToken,deleteComment);
router.get("/:videoId",getComment);

export default router;