"use client";
import { useEffect, useState } from "react";
import "../styles/opportunities.css";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters & pagination
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("matchScore");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMatches = async () => {
    setLoading(true);

    const userId = localStorage.getItem("userId");

    const res = await fetch(
      `https://skillsieve.onrender.com/api/match?userId=${userId}&page=${page}&search=${search}&sortBy=${sortBy}&order=${order}`
    );

    const data = await res.json();

    if (data.success) {
      setOpportunities(data.results);
      setTotalPages(data.totalPages);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMatches();
  }, [page, search, sortBy, order]);

  if (loading)
    return <p className="loading-text">Loading opportunities...</p>;

  return (
    <div className="opp-container">
      <h1 className="opp-heading">Matched Opportunities</h1>

      {/* Filters */}
      <div className="opp-filters">
        <input
          className="opp-search"
          placeholder="Search by title or company..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          className="opp-sort"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
        >
          <option value="matchScore">Best Match</option>
          <option value="title">Title</option>
          <option value="company">Company</option>
        </select>

        <select
          className="opp-sort"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="desc">High → Low</option>
          <option value="asc">Low → High</option>
        </select>
      </div>

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
                <p>
                  <strong>Required Skills:</strong>
                </p>
                <div className="skills-list">
                  {opp.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>

                <p>
                  <strong>Your Match:</strong>
                </p>
                <div className="skills-list">
                  {opp.matchedSkills.length > 0 ? (
                    opp.matchedSkills.map((ms) => (
                      <span key={ms} className="match-tag">
                        {ms}
                      </span>
                    ))
                  ) : (
                    <span className="no-match">No matched skills</span>
                  )}
                </div>
              </div>

              <button className="apply-btn">Apply Now</button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="opp-pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ⬅ Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
