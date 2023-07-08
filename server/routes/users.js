import express from "express";
import {update} from "../controllers/user.js"
import {deleteUser} from "../controllers/user.js" 
import {subscribe} from "../controllers/user.js" 
import {unsubscribe} from "../controllers/user.js" 
import {like} from "../controllers/user.js" 
import {dislike} from "../controllers/user.js" 
import { verifyToken } from "../verifyToken.js";
import { getUser } from "../controllers/user.js";

const router = express.Router();

//update user
router.put("/:id", verifyToken, update);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

//subscribe a user
router.put("/sub/:id", verifyToken, subscribe);

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe);

//like a video
router.put("/like/:videoId", verifyToken, like);

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislike);



export default router;