import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
export default function Navbar() {
const { user, logout } = useAuth();
return (
<nav className="border-b">
<div className="max-w-6xl mx-auto p-3 flex justify-between items-center">
<Link to="/" className="font-bold text-lg">SmartLinks</Link>
<div className="flex gap-4 items-center">
{user ? (
<>
<Link to="/dashboard">Dashboard</Link>
<button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
</>
) : (
<>
<Link to="/login">Login</Link>
<Link to="/register" className="px-3 py-1 border rounded">Sign up</Link>
</>
)}
</div>
</div>
</nav>
);
}
