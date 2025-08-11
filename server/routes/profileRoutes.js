import express from "express";
import { protect } from "../middleware/auth.js";
import { upsertProfile, getMyProfile, publicBio } from "../controllers/profileController.js";
const router = express.Router();
router.get("/me", protect, getMyProfile);
router.post("/me", protect, upsertProfile);
router.get("/public/:username", publicBio);
export default router;
