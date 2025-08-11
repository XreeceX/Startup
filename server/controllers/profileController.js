import asyncHandler from "express-async-handler";
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import Link from "../models/Link.js";

export const upsertProfile = asyncHandler(async (req, res) => {
  const { title, bio, avatarUrl, theme } = req.body;
  const p = await Profile.findOneAndUpdate(
    { user: req.user._id },
    { $set: { title, bio, avatarUrl, theme } },
    { upsert: true, new: true }
  );
  res.json(p);
});

export const getMyProfile = asyncHandler(async (req, res) => {
  const p = await Profile.findOne({ user: req.user._id });
  res.json(p || {});
});

export const publicBio = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });

  const p = await Profile.findOne({ user: user._id });
  const links = await Link.find({ user: user._id, isActive: true })
    .select("title slug")
    .sort({ createdAt: -1 });

  const base = `${req.protocol}://${req.get("host")}`;
  const items = links.map((l) => ({
    title: l.title || l.slug,
    url: `${base}/r/${l.slug}`,
  }));

  res.json({
    username,
    profile: p || { title: "", bio: "", avatarUrl: "", theme: "light" },
    links: items,
  });
});
