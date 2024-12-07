import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/productSchema.js";
import ErrorHandler from "../middlewares/errorHandler.js";

// Create a product
export const createProduct = catchAsyncErrors(async (req, res, next) => {
    
        const { name, image, price, location, description, quantity } = req.body;
        const seller = req.user.id;

        if (!name || !price || !location || !description || !quantity) {
            return next(new ErrorHandler("Please fill in all fields", 400));
        }
        if (req.user.role !== "seller") {
            return next(new ErrorHandler("Only sellers can create products.", 403));
        }

        const product = await Product.create({ name, image, price, location, description, quantity, seller });
        res.status(201).json(product);
});

// Get all products
export const getAllProducts = catchAsyncErrors(async (req, res, next) => {
    
        const products = await Product.find().populate("seller", "name email");
        res.status(200).json(products);
    
});

// Find product by name
export const findProductByName = catchAsyncErrors(async (req, res, next) => {
        const { name } = req.query;
        const products = await Product.find({ name: { $regex: name, $options: "i" } });
        res.status(200).json(products);
});


// Update a product
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
        const productId = req.params.id;
        const { name, image, price, location, description, quantity } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        if (product.seller.toString() !== req.user.id) {
            return next(new ErrorHandler("You can only update your own products.", 403));
        }

        if (name) product.name = name;
        if (image) product.image = image;
        if (price) product.price = price;
        if (location) product.location = location;
        if (quantity) product.quantity = quantity;
        if (description) product.description = description;

        await product.save();

        res.status(200).json({ message: "Product updated successfully", product });
});

// Get a product by ID
export const getProductById = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findById(id).populate("seller", "name email");

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});


// Delete a product (Seller only)
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        if (product.seller.toString() !== req.user.id) {
            return next(new ErrorHandler("You can only delete your own products.", 403));
        }

        await product.deleteOne();
        res.status(200).json({ message: "Product deleted successfully" });
});