import express from "express";
import { login, register, logout, getUser, getUserById } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.get("/:id", isAuthenticated, getUserById);

export default router;