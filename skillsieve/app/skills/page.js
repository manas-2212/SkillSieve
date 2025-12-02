"use client";
import { useState } from "react";
import "../styles/skills.css";

export default function SkillsPage() {
  const [input, setInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      if (!skills.includes(input.trim())) {
        setSkills([...skills, input.trim()]);
      }
      setInput("");
    }
  };

  const removeSkill = (s) => {
    setSkills(skills.filter((skill) => skill !== s));
  };

  const saveSkills = async () => {
    if (skills.length === 0) {
      setMessage("Please add at least one skill.");
      return;
    }

    const userId = localStorage.getItem("userId");

    const res = await fetch("https://skillsieve.onrender.com/api/skills/save", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, skills }),
    });

    const data = await res.json();
    if (data.success) {
      setMessage("Skills saved successfully! 🎉");
    } else {
      setMessage("Error saving skills.");
    }
  };

  return (
    <div className="skills-container">
      <h1 className="skills-heading">Add Your Skills</h1>

      <input
        className="skills-input"
        placeholder="Type a skill & press Enter"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <div className="skills-tag-box">
        {skills.map((s) => (
          <div key={s} className="skill-tag">
            {s}
            <span className="skill-remove" onClick={() => removeSkill(s)}>
              ×
            </span>
          </div>
        ))}
      </div>

      <button className="skills-btn" onClick={saveSkills}>
        Save Skills
      </button>

      {message && <p className="skills-message">{message}</p>}
    </div>
  );
}
