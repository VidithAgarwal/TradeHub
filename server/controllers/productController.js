import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/productSchema.js";
import ErrorHandler from "../middlewares/errorHandler.js";

// Create a product
export const createProduct = catchAsyncErrors(async (req, res) => {
    try {
        const { name, image, price, location } = req.body;
        const seller = req.user.id;

        if (req.user.role !== "seller") {
            return next(new ErrorHandler("Only sellers can create products.", 403));

        }

        const product = await Product.create({ name, image, price, location, seller });
        res.status(201).json(product);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// Get all products
export const getAllProducts = catchAsyncErrors(async (req, res) => {
    try {
        const products = await Product.find().populate("seller", "name email");
        res.status(200).json(products);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// Find product by name
export const findProductByName = catchAsyncErrors(async (req, res) => {
    try {
        const { name } = req.query;
        const products = await Product.find({ name: { $regex: name, $options: "i" } });
        res.status(200).json(products);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});


// Update a product
export const updateProduct = catchAsyncErrors(async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, image, price, location } = req.body;

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

        await product.save();

        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});


// Delete a product (Seller only)
export const deleteProduct = catchAsyncErrors(async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        if (product.seller.toString() !== req.user.id) {
            return next(new ErrorHandler("You can only delete your own products.", 403));
        }

        await product.remove();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});