import { Router } from "express";
import {
  CreatePost,
  GetAllPost,
  UpdatePost,
  AddLike,
  DeletePost,
  AddComment,
} from "../Controller/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const PostRoute = Router();

PostRoute.post("/post", authMiddleware, CreatePost);
PostRoute.get("/post", authMiddleware, GetAllPost);
PostRoute.patch("/post", authMiddleware, UpdatePost);
PostRoute.post("/post/like", authMiddleware, AddLike);
PostRoute.delete("/post", authMiddleware, DeletePost);
PostRoute.post("/post/comment", authMiddleware, AddComment);

export default PostRoute;
