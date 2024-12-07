import User from "../models/userSchema.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import ErrorHandler from "./errorHandler.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  if (!req.user) {
    res.clearCookie("token"); // Clear the invalid token
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  next();
});