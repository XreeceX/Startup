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
// Confirm Stripe session. Using axios params avoids template mistakes.
await api.get("/payments/confirm", { params: { session_id: id } });
}
// Optional: alert("Pro activated!");
nav("/dashboard");
})();
}, [params, nav]);

return <div className="p-6">Activating your Pro plan…</div>;
}
