import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
export default function Register() {
const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
const { login } = useAuth(); const nav = useNavigate();
const submit = async (e) => {
e.preventDefault();
const { data } = await api.post("/auth/register", { name, email, password });
login({ token: data.token, ...data.user }); nav("/dashboard");
};
return (
<form onSubmit={submit} className="max-w-md mx-auto p-6 space-y-3">
<h1 className="text-xl font-bold">Create account</h1>
<input className="border p-2 w-full" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
<input className="border p-2 w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
<input className="border p-2 w-full" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
<button className="bg-black text-white px-4 py-2 rounded w-full">Sign up</button>
</form>
);
}
