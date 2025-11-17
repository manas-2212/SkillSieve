"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import "../styles/Login.css";

export default function LoginPage() {
  const router = useRouter();
  const { user, setUser } = useUser();

  const [hydrated, setHydrated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setHydrated(true);
  }, []);


  useEffect(() => {
    if (hydrated && user) {
      router.replace("/protectedapp/profile");
    }
  }, [hydrated, user, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://skillsieve.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("🔹 Login API response:", data);

      if (res.ok && data.token && data.user) {

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));


        setUser(data.user);

        alert("Login successful!");
        console.log("Saved token:", localStorage.getItem("token"));

        router.replace("/protectedapp/profile");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!hydrated) return null;

  return (
    <div className="auth-container">
      <h1>Log In</h1>

      <form className="auth-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="toggle-text">
        Don’t have an account?{" "}
        <span onClick={() => router.push("/register")}>Sign up</span>
      </p>
    </div>
  );
}