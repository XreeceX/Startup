import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
export default function Login() {
const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
const { login } = useAuth(); const nav = useNavigate();
const submit = async (e) => {
e.preventDefault();
const { data } = await api.post("/auth/login", { email, password });
login({ token: data.token, ...data.user }); nav("/dashboard");
};
return (
<form onSubmit={submit} className="max-w-md mx-auto p-6 space-y-3">
<h1 className="text-xl font-bold">Login</h1>
<input className="border p-2 w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
<input className="border p-2 w-full" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
<button className="bg-black text-white px-4 py-2 rounded w-full">Login</button>
<div className="text-sm">No account? <Link to="/register" className="underline">Sign up</Link></div>
</form>
);
}
