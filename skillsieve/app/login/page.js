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

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (hydrated && user) {
      router.replace("/protectedapp/profile");
    }
  }, [hydrated, user, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://skillsieve.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("API RESPONSE:", data);

      if (res.ok && data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user.id); 
      
        setUser(data.user);
        alert("Login successful!");
      
        router.replace("/protectedapp/profile");      
      }else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!hydrated) return null;

  return (
    <div className="login-wrapper">
      <div className="bg-shape shape1"></div>
      <div className="bg-shape shape2"></div>
      <div className="auth-container">
        <h1>Welcome Back</h1>

        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
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
          <span onClick={() => router.push("/register")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}
