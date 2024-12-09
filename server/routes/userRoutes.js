import express from "express";
import { login, register, logout, getUser, getUserById, updateUserProfile, getAllUsersWithProducts, getProductsBoughtByUser, getProductsCreatedBySeller } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.get("/:id", isAuthenticated, getUserById);
router.put("/update-profile", isAuthenticated, updateUserProfile);
router.put("/get-users-with-products", isAuthenticated, getAllUsersWithProducts);
router.post("/products-bought", isAuthenticated, getProductsBoughtByUser);
router.post("/products-created", isAuthenticated, getProductsCreatedBySeller);

export default router;