"use client";
import React from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import "../styles/Hero.css";

const Hero = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleClick = () => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/skills"); // 👈 Redirect logged-in users to skill input page
    }
  };

  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">Discover Internships That Fit You</h1>
        <p className="hero-subtitle">
          Upload your skills and let our AI match you with your dream internship.
        </p>

        <button className="hero-btn" onClick={handleClick}>
          🚀 Start Analyzing
        </button>
      </div>

      <div className="hero-image-container">
        <img
          src="/assets/ai-hero.png"
          alt="AI Internship Analyzer"
          className="hero-image"
        />
      </div>
    </section>
  );
};

export default Hero;
