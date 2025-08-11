import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

export const register = asyncHandler(async (req, res) => {
const { name, email, password } = req.body;
const exists = await User.findOne({ email });
if (exists) return res.status(400).json({ message: "Email already registered" });
const hash = await bcrypt.hash(password, 10);
const user = await User.create({ name, email, password: hash });
res.json({ token: genToken(user._id), user: { id: user._id, name, email, isPro: user.isPro, username: user.username } });
});

export const login = asyncHandler(async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ message: "Invalid credentials" });
const ok = await bcrypt.compare(password, user.password);
if (!ok) return res.status(401).json({ message: "Invalid credentials" });
res.json({ token: genToken(user._id), user: { id: user._id, name: user.name, email, isPro: user.isPro, username: user.username } });
});

export const me = asyncHandler(async (req, res) => {
const u = req.user;
res.json({ id: u._id, name: u.name, email: u.email, isPro: u.isPro, username: u.username });
});

export const setUsername = asyncHandler(async (req, res) => {
const { username } = req.body;
if (!username || !/^[a-z0-9-_]{3,20}$/.test(username)) return res.status(400).json({ message: "Invalid username" });
const taken = await User.findOne({ username });
if (taken && taken._id.toString() !== req.user._id.toString()) return res.status(409).json({ message: "Username taken" });
req.user.username = username;
await req.user.save();
res.json({ username });
});
