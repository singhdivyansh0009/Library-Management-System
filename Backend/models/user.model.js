import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// Define the schema for the user model
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken : {
      type : String
    },
  },
  { timestamps: true }
);

// add pre save hook to generate userId with first 3 letters of name and current timestamp
userSchema.pre("save", function (next) {
    if (!this.userId) {
      const prefix = this.name.slice(0, 3).toUpperCase(); 
      const timestamp = Date.now().toString().slice(-4); 
      this.userId = `${prefix}${timestamp}`;
    }
    next();
  });

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ userId: this.userId }, 
    process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ userId: this.userId }, 
    process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    });
};

// Export the model
export const User = mongoose.model("User", userSchema);
