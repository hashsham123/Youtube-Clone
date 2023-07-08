import { createError } from "../error.js"
import User from "../models/User.js" 
import Video from "../models/Video.js";

// Update Controller
export const update = async(req,res,next)=>{
    if(req.params.id === req.user.id){
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
         res.status(200).json("user has been updated!");
    }catch(err){
        next(err);
    }
    }else{
        return next(createError(403,"you can update only your account!"))
    }
}

// delete a user controlller 
export const deleteUser = async(req,res,next)=>{
    if(req.params.id === req.user.id){
        try {
            const deleteUser = await User.findByIdAndDelete(req.params.id,{$set:req.body},{new:true});
             res.status(200).json("user has been deleted!");
        }catch(err){
            next(err);
        }
        }else{
            return next(createError(403,"you can delete only your account!"))
        }
}

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { Subscribers: 1 },
    });
    res.status(200).json("Subscription successfull.")
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { Subscribers: -1 },
      });
      res.status(200).json("Unsubscription successfull.")
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const like = async (req,res,next)=>{
const id = req.user.id;
const videoId = req.params.videoId;

try{
  await Video.findByIdAndUpdate(videoId,{
    $addToSet:{likes:id},
    $pull:{dislikes:id}
    //$addToSet it will allow us to like only once
  })
  res.status(200).json("the video has been Liked!")
}catch(err){
  next(err);
}

}

export const dislike = async (req,res,next)=>{
  
  const id = req.user.id;
  const videoId = req.params.videoId;
  try{  
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{dislikes:id},
      $pull:{likes:id}
      //$addToSet it will allow us to like only once
    })
    res.status(200).json("the video has been Liked!")
  }catch(err){
    next(err);
  }
}
// Find a User
export const getUser = async (req,res,next)=>{

    try{
        const user=await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        next(err);
    }
}



