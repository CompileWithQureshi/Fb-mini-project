import express from "express";
import {
  CreateUser,
  UpdateUser,
  GetAll,
  SoftDeleteUser,
  LoginUser,
} from "../Controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const UserRoute = express.Router();

UserRoute.post("/user", CreateUser);
UserRoute.post("/user/login", LoginUser);

UserRoute.patch("/user",authMiddleware, UpdateUser);
UserRoute.get("/users", GetAll);
UserRoute.delete("/user",authMiddleware, SoftDeleteUser);

export default UserRoute;
