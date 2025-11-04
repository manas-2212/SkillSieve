"use client";
import React, { useEffect, useRef, useState } from "react";
import "../styles/HowItWorks.css";

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setVisible(entry.isIntersecting));
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`how-it-works-section ${visible ? "fade-in" : "fade-out"}`}
    >
      <h2 className="section-title">How It Works</h2>
      <div className="steps">
        <div className="step">
          <h3>1. Upload Your Skills</h3>
          <p>List your top skills and interests for personalized internship matches.</p>
        </div>
        <div className="step">
          <h3>2. AI Analysis</h3>
          <p>Our AI evaluates your profile and finds the best-fit roles for you.</p>
        </div>
        <div className="step">
          <h3>3. Get Recommendations</h3>
          <p>Explore internship matches with guided insights for improvement.</p>
        </div>
      </div>
    </section>
  );
}
