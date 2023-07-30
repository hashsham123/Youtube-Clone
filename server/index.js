import userRoutes from "./routes/users.js"
import commentRoutes from "./routes/comments.js"
import videoRoutes from "./routes/videos.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
// const userRoutes = require("./routes/Users");
import express from "express";

// import DB connection file
import DbConnection  from"./Connection.js";

// import db 
import dotenv from "dotenv";

dotenv.config();

const app = express();

DbConnection();

app.use(cookieParser())
app.use(express.json())
app.use("/api/users",userRoutes);
app.use("/api/comment",commentRoutes);
app.use("/api/video",videoRoutes);
app.use("/api/auth",authRoutes);
app.use((err,req,res,next)=>{
  const status = err.status || 500;
  const message = err.message || "something went wrong";
  return res.status(status).json({
    success:false,
    status,
    message,
  })
})
const PORT = process.env.PORT || 8081;

app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running succesfully",
  });
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
