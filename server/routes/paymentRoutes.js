import express from "express";
import { protect } from "../middleware/auth.js";
import { createCheckoutSession, confirmPro } from "../controllers/paymentController.js";
const router = express.Router();
router.post("/checkout", protect, createCheckoutSession);
router.get("/confirm", confirmPro);
export default router;
