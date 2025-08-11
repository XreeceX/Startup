import mongoose from "mongoose";
const linkSchema = new mongoose.Schema(
{
user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
slug: { type: String, required: true, unique: true },
title: { type: String, default: "" },
url: { type: String, required: true },
clicks: { type: Number, default: 0 },
isActive: { type: Boolean, default: true }
},
{ timestamps: true }
);
export default mongoose.model("Link", linkSchema);
