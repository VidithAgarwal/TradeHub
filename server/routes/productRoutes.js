import express from "express";
import {
  createProduct,
  getAllProducts,
  findProductByName,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", isAuthenticated, createProduct);
router.get("/", getAllProducts);
router.get("/search", findProductByName);
router.put("/:id", isAuthenticated, updateProduct);
router.delete("/:id", isAuthenticated, deleteProduct);


export default router;