import User from "../models/userSchema.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import sendToken from "../utils/sendAuthToken.js";
import Product from "../models/productSchema.js";

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

  export const getUserById = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
        success: true,
        user,
    });
  });

  export const getUser = catchAsyncErrors((req, res, next) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  });

  export const updateUserProfile = catchAsyncErrors(async (req, res, next) => {
    const { name, phone } = req.body;

    if (!name && !phone) {
      return next(new ErrorHandler("Please provide fields to update", 400));
    }
  
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (phone) updatedFields.phone = phone;
  
    const user = await User.findByIdAndUpdate(req.user._id, updatedFields, {
      new: true,
      runValidators: true,
    });
  
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  });

  export const getAllUsersWithProducts = catchAsyncErrors(async (req, res, next) => {
    if (req.user.role !== "admin") {
      return next(new ErrorHandler("Only admin can access this route", 403));
    }
    const sellers = await User.find({ role: "seller" }).lean();
    for (const seller of sellers) {
      const soldProducts = await Product.find({ seller: seller._id });
      seller.soldProducts = soldProducts;
    }
    const buyers = await User.find({ role: "buyer" })
      .populate("purchasedProducts")
      .lean();
    res.status(200).json({
      success: true,
      data: {
        sellers,
        buyers,
      },
    });
  });

  export const getProductsBoughtByUser = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.body;
  
    if (!userId) {
      return next(new ErrorHandler("User ID is required", 400));
    }
  
    const user = await User.findById(userId).populate("purchasedProducts");
  
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  
    res.status(200).json({
      success: true,
      products: user.purchasedProducts,
    });
  });

  export const getProductsCreatedBySeller = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.body;
  
    if (!userId) {
      return next(new ErrorHandler("User ID is required", 400));
    }


  
    const products = await Product.find({ seller: userId }).lean();
    
    for (const product of products) {
      const buyer = await User.findById(product.buyer).lean();
      product.buyerDetails = buyer;
    }
    console.log(products)
  
    res.status(200).json({
      success: true,
      products,
    });
  });

  export const deleteUser = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    
  
    if (!id) {
      return next(new ErrorHandler("User ID is required", 400));
    }
  
    const user = await User.findByIdAndDelete(id);

    if (req.user.role !== "admin") {
      return next(new ErrorHandler("Only admin can access this route", 403));
    }

  
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  });