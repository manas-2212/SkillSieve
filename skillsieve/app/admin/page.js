"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";
import "../styles/admin.css";
import { SKILL_OPTIONS } from "../data/skills";

export default function AdminPage() {
  const router = useRouter();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Create form state
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [stipend, setStipend] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [msg, setMsg] = useState("");

  // Helper to read token / admin flag
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const isAdmin = typeof window !== "undefined" ? localStorage.getItem("isAdmin") === "true" : false;

  const BACKEND_URL = "https://skillsieve.onrender.com";

  useEffect(() => {
    if (!isAdmin) {
      router.replace("/");
      return;
    }
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/internships/list`);
      const data = await res.json();
      if (data.success) {
        setInternships(data.internships || []);
      } else {
        setMsg("Failed to load internships");
      }
    } catch (err) {
      setMsg("Network error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!title || !company || selectedSkills.length === 0) {
      setMsg("Title, company and at least one skill are required.");
      return;
    }

    const skills = selectedSkills.map((s) => s.value);

    try {
      const res = await fetch(`${BACKEND_URL}/api/internships/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, company, skills, location, stipend }),
      });

      const data = await res.json();

      if (data.success) {
        setMsg("Internship created successfully!");

        // Reset form
        setTitle("");
        setCompany("");
        setLocation("");
        setStipend("");
        setSelectedSkills([]);

        // Refresh list
        fetchList();
      } else {
        setMsg(data.message || "Create failed");
      }
    } catch (err) {
      console.error(err);
      setMsg("Network/create error");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this internship?")) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/internships/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setMsg("Deleted");
        fetchList();
      } else {
        setMsg(data.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      setMsg("Network/delete error");
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p className="admin-sub">Create, view and delete internships</p>
      </div>

      <div className="admin-grid">
        <section className="admin-create">
          <h2>Create Internship</h2>
          <form onSubmit={handleCreate} className="admin-form">
            <input
              placeholder="Title (eg. Frontend Developer Intern)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              placeholder="Company (eg. Google)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />

            <Select
              isMulti
              options={SKILL_OPTIONS}
              placeholder="Select required skills..."
              value={selectedSkills}
              onChange={(v) => setSelectedSkills(v)}
              className="react-select-admin"
            />

            <input
              placeholder="Location (eg. Remote)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <input
              placeholder="Stipend (eg. ₹20,000 / month)"
              value={stipend}
              onChange={(e) => setStipend(e.target.value)}
            />

            <button type="submit" className="admin-create-btn">
              Create Internship
            </button>
          </form>

          {msg && <p className="admin-msg">{msg}</p>}
        </section>

        <section className="admin-list">
          <h2>All Internships</h2>
          {loading ? (
            <p>Loading...</p>
          ) : internships.length === 0 ? (
            <p>No internships found.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Company</th>
                  <th>Skills</th>
                  <th>Location</th>
                  <th>Stipend</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {internships.map((it) => (
                  <tr key={it.id}>
                    <td>{it.title}</td>
                    <td>{it.company}</td>
                    <td>
                      {it.skills?.map((s) => (
                        <span key={s} className="admin-skill">{s}</span>
                      ))}
                    </td>
                    <td>{it.location || "-"}</td>
                    <td>{it.stipend || "-"}</td>
                    <td>
                      <button className="admin-delete" onClick={() => handleDelete(it.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </section>
      </div>
    </div>
  );
}
