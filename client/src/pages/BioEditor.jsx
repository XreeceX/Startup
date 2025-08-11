import { useEffect, useState } from "react";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function BioEditor() {
  const { user } = useAuth();
  const [username, setUsername] = useState(user.username || "");
  const [profile, setProfile] = useState({
    title: "",
    bio: "",
    avatarUrl: "",
    theme: "light",
  });

  useEffect(() => {
    (async () => {
      if (user.username) {
        const { data } = await api.get("/profile/me");
        if (data) setProfile((prev) => ({ ...prev, ...data }));
      }
    })();
  }, [user.username]);

  const saveUsername = async () => {
    const { data } = await api.post("/auth/username", { username });
    localStorage.setItem("user", JSON.stringify({ ...user, username: data.username }));
    window.location.reload();
  };

  const saveProfile = async () => {
    await api.post("/profile/me", profile);
    alert("Saved!");
  };

  const publicUrl = username
    ? `${window.location.origin}/b/${encodeURIComponent(username)}`
    : null;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-3">
      <h1 className="text-xl font-bold">Bio Page</h1>

      <div className="border rounded p-3">
        <div className="font-semibold mb-2">Username</div>
        <div className="flex gap-2">
          <input
            className="border p-2 flex-1"
            placeholder="yourname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={saveUsername} className="px-3 py-2 border rounded">
            Set
          </button>
        </div>
        {publicUrl && (
          <div className="text-sm mt-2">
            Public URL:{" "}
            <a className="underline" href={publicUrl} target="_blank" rel="noreferrer">
              {publicUrl}
            </a>
          </div>
        )}
      </div>

      <div className="border rounded p-3 space-y-2">
        <div className="font-semibold">Page Settings</div>
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={profile.title}
          onChange={(e) => setProfile({ ...profile, title: e.target.value })}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Bio/description"
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        ></textarea>
        <input
          className="border p-2 w-full"
          placeholder="Avatar URL"
          value={profile.avatarUrl}
          onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
        />
        <select
          className="border p-2"
          value={profile.theme}
          onChange={(e) => setProfile({ ...profile, theme: e.target.value })}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <button onClick={saveProfile} className="px-4 py-2 bg-black text-white rounded">
          Save
        </button>
      </div>
    </div>
  );
}
