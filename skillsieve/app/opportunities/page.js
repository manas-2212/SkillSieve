"use client";
import { useEffect, useState } from "react";
import "../styles/opportunities.css";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMatches = async () => {
    const userId = localStorage.getItem("userId");

    const res = await fetch("https://skillsieve.onrender.com/api/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();
    if (data.success) {
      setOpportunities(data.results);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  if (loading) return <p className="loading-text">Loading opportunities...</p>;

  return (
    <div className="opp-container">
      <h1 className="opp-heading">Matched Opportunities</h1>

      {opportunities.length === 0 ? (
        <p className="no-opps">No matching internships found.</p>
      ) : (
        <div className="opp-grid">
          {opportunities.map((opp) => (
            <div key={opp.id} className="opp-card">
              <h2>{opp.title}</h2>
              <p className="opp-company">{opp.company}</p>

              <p className="match-score">
                Match Score: <strong>{opp.matchScore}%</strong>
              </p>

              <div className="skills-box">
                <p><strong>Required Skills:</strong></p>
                <div className="skills-list">
                  {opp.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>

                <p><strong>Your Match:</strong></p>
                <div className="skills-list">
                  {opp.matchedSkills.length > 0 ? (
                    opp.matchedSkills.map((ms) => (
                      <span key={ms} className="match-tag">{ms}</span>
                    ))
                  ) : (
                    <span className="no-match">No matched skills</span>
                  )}
                </div>
              </div>

              <button className="apply-btn">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
