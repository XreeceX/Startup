import { createContext, useContext, useState } from "react";
const Ctx = createContext();
export const useAuth = () => useContext(Ctx);
export default function AuthProvider({ children }) {
const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));
const login = (payload) => { setUser(payload); localStorage.setItem("user", JSON.stringify(payload)); };
const logout = () => { setUser(null); localStorage.removeItem("user"); };
return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
}
