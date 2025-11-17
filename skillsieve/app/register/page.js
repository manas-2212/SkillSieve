"use client";
import { useState } from "react";
import "./../styles/Register.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("Registering...");

    try {
      const res = await fetch("https://skillsieve.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Registration successful ✅");
        window.location.href = "/login";
      } else {
        setMessage(data.message || "Registration failed ❌");
      }
    } catch (err) {
      setMessage("Server error ❌");
    }
  };

  return (
    <div className="auth-container">
      <h1>Create Account</h1>
      <form onSubmit={handleRegister} className="auth-form">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
      <a href="/login" className="link">
        Already have an account? Login
      </a>
    </div>
  );
}
