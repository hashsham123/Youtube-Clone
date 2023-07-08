import { createError } from "../error.js";
// import { createError } from "../error";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
export const addComment = async (req,res,next)=>{
    const newComment = new Comment({...req.body,userId:req.user.id});
try{
const savedComment = await newComment.save();
res.status(200).json(savedComment);
}catch(err){
    next(err);
}
} 

export const deleteComment = async (req,res,next)=>{
        try{
        const comment = await Comment.findById(req.params.id);
       
        const video= await Video.findById(req.params.id);
        if(req.user.id === comment.userId || req.user.id === video.userId ){
          await Comment.findByIdAndDelete(req.params.id);
        }
        else{
            next(createError(403,"you can delete only your comment!"))
        }
        res.status(200).json("Comment Deleted!");
        }catch(err){
            next(err);
        }
        } 

export const getComment = async (req,res,next)=>{
            try{
            const findComment = await Comment.find({videoId:req.params.videoId});
             if(!findComment){
                next(createError(403,"Comment not found"));
             }

            res.status(200).json(findComment);
            }catch(err){
                next(err);
            }
            } 