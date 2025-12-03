"use client";
import { useState } from "react";
import Select from "react-select";
import { SKILL_OPTIONS } from "../data/skills";
import { useRouter } from "next/navigation";
import "../styles/skills.css";

export default function SkillsPage() {
  const router = useRouter();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false); //for tracking the saved skill changes

  const saveSkills = async () => {
    if (selectedSkills.length === 0) {
      setMessage("Please select at least one skill.");
      return;
    }

    const userId = localStorage.getItem("userId");
    const skills = selectedSkills.map((skill) => skill.value);

    const res = await fetch("https://skillsieve.onrender.com/api/skills/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, skills }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage("Skills saved successfully!");
      setSaved(true); //
    } else {
      setMessage("Error saving skills.");
    }
  };

  return (
    <div className="skills-container">
      <h1 className="skills-heading">Select Your Skills</h1>

      <Select
        isMulti
        name="skills"
        options={SKILL_OPTIONS}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder="Search and choose your skills..."
        value={selectedSkills}
        onChange={(value) => {
          setSelectedSkills(value);
          setSaved(false); 
        }}
      />

      <button className="skills-btn" onClick={saveSkills}>
        Save Skills
      </button>

      {message && <p className="skills-message">{message}</p>}


      {saved && (
        <button
          className="opp-btn"
          onClick={() => router.push("/opportunities")}
        >
          🔍 Find Opportunities
        </button>
      )}
    </div>
  );
}
