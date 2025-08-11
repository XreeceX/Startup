import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import Protected from "./components/Protected.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NewLink from "./pages/NewLink.jsx";
import BioEditor from "./pages/BioEditor.jsx";
import PublicBio from "./pages/PublicBio.jsx";
import Success from "./pages/Success.jsx";
import "./styles.css";

export default function App() {
return (
<AuthProvider>
<BrowserRouter>
<Navbar />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
<Route path="/new" element={<Protected><NewLink /></Protected>} />
<Route path="/bio" element={<Protected><BioEditor /></Protected>} />
<Route path="/b/:username" element={<PublicBio />} />
<Route path="/success" element={<Success />} />
<Route path="*" element={<div className="p-6">Not found</div>} />
</Routes>
</BrowserRouter>
</AuthProvider>
);
}
