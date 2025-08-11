import { Link } from "react-router-dom";
export default function Home() {
return (
<div className="max-w-4xl mx-auto p-8 text-center">
<h1 className="text-3xl font-bold">Create short links, QR codes, and a bio page.</h1>
<p className="mt-3 text-gray-700">Grow your socials, campaigns, and track clicks. Free plan included.</p>
<div className="mt-6 flex gap-3 justify-center">
<Link to="/register" className="px-4 py-2 bg-black text-white rounded">Get Started</Link>
<a href="https://example.com" target="_blank" className="px-4 py-2 border rounded" rel="noreferrer">Learn more</a>
</div>
</div>
);
}
