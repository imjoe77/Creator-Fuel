import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    name: {
      type: String,
      default: "", // ✅ IMPORTANT: do NOT require this
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    coverPicture: {
      type: String,
      default: "",
    },

    razorpayId: {
      type: String,
      default: "",
    },

    razorpaySecret: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // ✅ auto handles createdAt & updatedAt
  }
);

// Prevent model overwrite in Next.js
const User = mongoose.models.User || model("User", userSchema);

export default User;
