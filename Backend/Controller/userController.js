import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // Correct way to import dotenv in ES Modules

const CreateUser = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({
      message: "Input in empty",
    });
  }

  const hashpassowrd = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({
      userName,
      email,
      password: hashpassowrd,
    });

    const saveUser = await newUser.save();

    if (!saveUser) {
      res.status(500).json({
        message: `server Error  `,
      });
    }

    res.status(200).json({
      message: "Succes",
      data: saveUser,
      
    });


    // res.send('testing')
  } catch (error) {
    res.status(500).json({
      message: `${error}`,
    });
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "input is empty",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email is Invalid",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        message: "Password is Wrong",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Login Success",
      token,
      user
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error: ${error}`,
    });
  }
};
const UpdateUser = async (req, res) => {
  const { id, email, userName, password } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "Id is required",
    });
  }

  // console.log(req.user);

  if (req.user.userId  !== id) {
    return res
      .status(403)
      .json({ message: "Unauthorized to update this user" });
  }

  try {
    const updateData = {};

    if (email) updateData.email = email;
    if (userName) updateData.userName = userName;
    if (password) {
      const saltRound = 10;
      const hashpassowrd = await bcrypt.hash(password, saltRound);
      if (password) updateData.password = hashpassowrd;
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error updating user: ${error.message}`,
    });
  }
};

const GetAll = async (req, res) => {
  const { id } = req.query;

 
  try {
    let query = {};

    if (id) query._id = id;

    const findAll = await User.find(query);

    res.status(200).json({
      message: "Succes",
      data: findAll,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error updating user: ${error.message}`,
    });
  }
};

const SoftDeleteUser = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "Id is requiredr",
    });
  }

  if (req.user.userId !== id) {
    return res
      .status(403)
      .json({ message: "Unauthorized to update this user" });
  }
  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.isActive = false;

    await user.save(); // Save the changes to the database

    res.status(200).json({
      message: "User account deactivated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: `Error deactivating user: ${error.message}`,
    });
  }
};

export { CreateUser, UpdateUser, GetAll, SoftDeleteUser, LoginUser };
