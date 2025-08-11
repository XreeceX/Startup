import { useEffect, useState } from "react";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import LinkRow from "../components/LinkRow.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
const { user } = useAuth();
const [links, setLinks] = useState([]);
const nav = useNavigate();

const load = async () => {
const { data } = await api.get("/links/mine");
setLinks(data);
};
useEffect(() => { load(); }, []);

const del = async (l) => { await api.delete(/links/${l._id}); load(); };
const qr = (l) => { window.open(/api/links/${l._id}/qrcode, "_blank"); };

const upgrade = async () => {
const { data } = await api.post("/payments/checkout");
window.location.href = data.url;
};

return (
<div className="max-w-6xl mx-auto p-4">
<div className="flex items-center justify-between mb-4">
<div>
<div className="text-sm text-gray-600">Plan: {user.isPro ? "Pro" : "Free"}</div>
{!user.username && <div className="text-sm text-red-600">Set a username to enable your bio page.</div>}
</div>
<div className="flex gap-2">
{!user.isPro && <button onClick={upgrade} className="bg-black text-white px-3 py-2 rounded">Upgrade to Pro</button>}
<Link to="/new" className="px-3 py-2 border rounded">New Link</Link>
<Link to="/bio" className="px-3 py-2 border rounded">Bio Page</Link>
</div>
</div>
<div className="grid gap-2">
{links.map(l => <LinkRow key={l._id} link={l} onDelete={del} onQR={qr} />)}
</div>
</div>
);
}
