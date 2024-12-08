import express from "express";
import {
  createProduct,
  getAllProducts,
  findProductByName,
  updateProduct,
  deleteProduct,
  getProductById,
  getPresignedUrl,
  uploadFile
} from "../controllers/productController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/createProduct", isAuthenticated, createProduct);
router.get("/", isAuthenticated,getAllProducts);
router.get("/search", isAuthenticated,findProductByName);
router.get("/get-presigned-url", isAuthenticated, getPresignedUrl);
router.post("/upload-file", isAuthenticated, uploadFile);
router.put("/:id", isAuthenticated, updateProduct);
router.get("/:id", isAuthenticated,getProductById);
router.delete("/:id", isAuthenticated, deleteProduct);


export default router;