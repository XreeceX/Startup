import mongoose from "mongoose";
const profileSchema = new mongoose.Schema(
{
user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
title: { type: String, default: "" },
bio: { type: String, default: "" },
avatarUrl: { type: String, default: "" },
theme: { type: String, default: "light" }
},
{ timestamps: true }
);
export default mongoose.model("Profile", profileSchema);
