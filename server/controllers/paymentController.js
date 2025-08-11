import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import User from "../models/User.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = asyncHandler(async (req, res) => {
const session = await stripe.checkout.sessions.create({
mode: "subscription",
line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
success_url: ${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID},
cancel_url: ${process.env.CLIENT_URL}/dashboard,
metadata: { userId: req.user._id.toString() },
});
res.json({ url: session.url, id: session.id });
});

export const confirmPro = asyncHandler(async (req, res) => {
const { session_id } = req.query;
if (!session_id) return res.status(400).json({ message: "Missing session_id" });
const s = await stripe.checkout.sessions.retrieve(session_id);
if (s.status !== "complete" && s.payment_status !== "paid") {
return res.status(402).json({ message: "Payment not completed" });
}
const userId = s.metadata?.userId;
if (!userId) return res.status(400).json({ message: "No user metadata" });
await User.findByIdAndUpdate(userId, { $set: { isPro: true } });
res.json({ ok: true });
});
