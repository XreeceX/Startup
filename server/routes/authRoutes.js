import express from "express";
import { register, login, me, setUsername } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);
router.post("/username", protect, setUsername);
export default router;
