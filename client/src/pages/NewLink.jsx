import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
export default function NewLink() {
const [title, setTitle] = useState("");
const [url, setUrl] = useState("");
const [slug, setSlug] = useState("");
const nav = useNavigate();
const submit = async (e) => {
e.preventDefault();
await api.post("/links", { title, url, slug: slug || undefined });
nav("/dashboard");
};
return (
<form onSubmit={submit} className="max-w-md mx-auto p-6 space-y-3">
<h1 className="text-xl font-bold">Create a short link</h1>
<input className="border p-2 w-full" placeholder="Title (optional)" value={title} onChange={e=>setTitle(e.target.value)} />
<input className="border p-2 w-full" placeholder="Destination URL (https://...)" value={url} onChange={e=>setUrl(e.target.value)} />
<input className="border p-2 w-full" placeholder="Custom slug (optional)" value={slug} onChange={e=>setSlug(e.target.value)} />
<button className="bg-black text-white px-4 py-2 rounded w-full">Save</button>
</form>
);
}
