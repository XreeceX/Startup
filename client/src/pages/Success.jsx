import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api.js";

export default function Success() {
const [params] = useSearchParams();
const nav = useNavigate();

useEffect(() => {
(async () => {
const id = params.get("session_id");
if (id) {
// Either template string OR axios params works; this is the safest
await api.get("/payments/confirm", { params: { session_id: id } });
// Alternative:
// await api.get(/payments/confirm?session_id=${id});
}
alert("Pro activated!");
nav("/dashboard");
})();
}, [params, nav]);

return <div className="p-6">Activating your Pro plan…</div>;
}

server/controllers/paymentController.js
import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import User from "../models/User.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = asyncHandler(async (req, res) => {
const clientUrl = (process.env.CLIENT_URL || "").replace(//$/, "");
const session = await stripe.checkout.sessions.create({
mode: "subscription",
payment_method_types: ["card"],
line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
success_url: ${clientUrl}/success?session_id={CHECKOUT_SESSION_ID},
cancel_url: ${clientUrl}/dashboard,
metadata: { userId: req.user._id.toString() },
});
res.json({ url: session.url, id: session.id });
});
