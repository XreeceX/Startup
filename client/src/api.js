import axios from "axios";
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "/api" });
api.interceptors.request.use((config) => {
const u = JSON.parse(localStorage.getItem("user") || "null");
if (u?.token) config.headers.Authorization = Bearer ${u.token};
return config;
});
export default api;
