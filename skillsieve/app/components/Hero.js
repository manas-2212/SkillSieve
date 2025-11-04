"use client";
import React from "react";
import "../styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">Discover Internships That Fit You</h1>
        <p className="hero-subtitle">
          Upload your skills and let our AI match you with your dream internship.
        </p>

        <a href="#analyze" className="hero-btn">
          🚀 Start Analyzing
        </a>
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
