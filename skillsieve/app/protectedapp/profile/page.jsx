"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const router = useRouter();

  // ✅ Redirect to login only after confirming user is null
  useEffect(() => {
    if (user === null) {
      router.replace("/login");
    }
  }, [user, router]);

  // ⏳ Prevent flicker while deciding (before redirect or render)
  if (user === null) return null;

  // ✅ Logout clears user + token and redirects
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.replace("/login");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to your profile 👋</h1>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "1.5rem",
          padding: "0.75rem 1.5rem",
          background: "#333",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
