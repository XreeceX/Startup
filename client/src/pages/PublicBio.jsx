import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api.js";

export default function PublicBio() {
  const { username } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!username) return;
    (async () => {
      const { data } = await api.get(
        `/profile/public/${encodeURIComponent(username)}`
      );
      setData(data);
    })();
  }, [username]);

  if (!data) return <div className="p-6">Loading…</div>;

  const theme =
    data?.profile?.theme === "dark" ? "bg-black text-white" : "bg-white text-black";

  return (
    <div className={`${theme} min-h-screen`}>
      <div className="max-w-xl mx-auto p-8 text-center">
        {data.profile?.avatarUrl && (
          <img
            src={data.profile.avatarUrl}
            alt="avatar"
            className="w-24 h-24 rounded-full mx-auto mb-3"
          />
        )}
        <h1 className="text-2xl font-bold">
          {data.profile?.title || `@${data.username}`}
        </h1>
        <p className="mt-2">{data.profile?.bio}</p>
        <div className="mt-6 space-y-2">
          {data.links?.map((l, i) => (
            <a
              key={i}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="block px-4 py-3 border rounded hover:bg-gray-100"
            >
              {l.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
