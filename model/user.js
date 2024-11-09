import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim:true
    },
    password: {
      type: String,
      required: true,
      trim:true
    },
    isActive: {
      type: Boolean,
      default: true, // By default, the user is active
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', UserSchema);
