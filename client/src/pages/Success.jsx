import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api.js";
export default function Success() {
const [params] = useSearchParams();
const nav = useNavigate();
useEffect(() => { (async () => {
const id = params.get("session_id");
if (id) await api.get(/payments/confirm?session_id=${id});
alert("Pro activated!"); nav("/dashboard");
})(); }, []);
return <div className="p-6">Activating your Pro plan…</div>;
}
