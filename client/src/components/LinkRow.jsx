export default function LinkRow({ link, onDelete, onQR }) {
const short = ${window.location.origin}/r/${link.slug};
return (
<div className="border rounded p-3 flex items-center justify-between">
<div>
<div className="font-semibold">{link.title || link.slug}</div>
<div className="text-sm text-gray-600">{short}</div>
<div className="text-sm">Clicks: {link.clicks}</div>
</div>
<div className="flex gap-2">
<a className="px-3 py-1 border rounded" href={short} target="_blank" rel="noreferrer">Open</a>
<button onClick={() => onQR(link)} className="px-3 py-1 border rounded">QR</button>
<button onClick={() => onDelete(link)} className="px-3 py-1 border rounded text-red-600">Delete</button>
</div>
</div>
);
}
