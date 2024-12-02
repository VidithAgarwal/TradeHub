import User from "../models/userSchema.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import sendToken from "../utils/sendAuthToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !phone || !password || !role) {
      return next(new ErrorHandler("Please fill full form !"));
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return next(new ErrorHandler("Email already registered !"));
    }
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role,
    });
    sendToken(user, 201, res, "User Registered Sucessfully !");
  });

  export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please provide email ,password!"));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Email Or Password !", 400));
    }
    sendToken(user, 201, res, "User Logged In Sucessfully !");
  });

  export const logout = catchAsyncErrors(async (req, res, next) => {
    res
      .status(201)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Logged Out Successfully!",
      });
  });

  export const getUser = catchAsyncErrors((req, res, next) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  });
  