import asyncHandler from "express-async-handler";
import { customAlphabet } from "nanoid";
import UAParser from "ua-parser-js";
import QRCode from "qrcode";
import Link from "../models/Link.js";
import Visit from "../models/Visit.js";

const nano = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 7);

// Create a short link
export const createLink = asyncHandler(async (req, res) => {
  const { url, title, slug } = req.body;

  if (!/^https?:\/\//i.test(url)) {
    return res.status(400).json({ message: "URL must start with http(s)://" });
  }

  const count = await Link.countDocuments({ user: req.user._id });
  if (!req.user.isPro && count >= 10) {
    return res.status(402).json({ message: "Free plan limit reached" });
  }

  const s = slug || nano();
  const exists = await Link.findOne({ slug: s });
  if (exists) {
    return res.status(409).json({ message: "Slug already in use" });
  }

  const link = await Link.create({
    user: req.user._id,
    slug: s,
    url,
    title: title || "",
  });

  return res.status(201).json(link);
});

// List my links
export const myLinks = asyncHandler(async (req, res) => {
  const links = await Link.find({ user: req.user._id }).sort({ createdAt: -1 });
  return res.json(links);
});

// Delete link and its visits
export const deleteLink = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Link.deleteOne({ _id: id, user: req.user._id });
  await Visit.deleteMany({ link: id });
  return res.json({ ok: true });
});

// Generate QR code PNG for a link
export const qrcode = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const link = await Link.findOne({ _id: id, user: req.user._id });
  if (!link) return res.status(404).json({ message: "Not found" });

  const dest = `${req.protocol}://${req.get("host")}/r/${link.slug}`;
  const png = await QRCode.toBuffer(dest, { width: 512, margin: 1 });
  res.setHeader("Content-Type", "image/png");
  return res.send(png);
});

// Basic analytics (per-day counts + recent sample)
export const visits = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const records = await Visit.find({ link: id })
    .sort({ ts: 1 })
    .limit(req.user.isPro ? 5000 : 500);

  const byDay = {};
  for (const v of records) {
    const d = new Date(v.ts).toISOString().slice(0, 10);
    byDay[d] = (byDay[d] || 0) + 1;
  }
  return res.json({ total: records.length, byDay, sample: records.slice(-20) });
});

// Public redirect
export const publicRedirect = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const link = await Link.findOne({ slug, isActive: true });
  if (!link) return res.status(404).send("Link not found");

  const parser = new UAParser(req.headers["user-agent"] || "");
  const result = parser.getResult();

  await Visit.create({
    link: link._id,
    ref: req.get("referer") || "",
    uaBrowser: result.browser?.name || "",
    uaOS: result.os?.name || "",
    ip:
      req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
      req.socket.remoteAddress ||
      "",
  });

  link.clicks += 1;
  await link.save();

  return res.redirect(302, link.url);
});
