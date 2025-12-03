"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";
import "../../styles/Profile.css";

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace("/login");
    }
  }, [user, router]);

  if (user === null) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.replace("/login");
  };

  return (
    <div className="profile-wrapper">
      <div className="bg-shape p1"></div>
      <div className="bg-shape p2"></div>

      <div className="profile-container">
        <div className="profile-header">

          <div className="profile-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="profile-name">{user?.name}</div>
          <div className="profile-email">{user?.email}</div>


          <div className="profile-tag">Member Since 2025</div>
        </div>


        <div className="profile-stats">
          <div className="stat-box">
            <h2></h2>
            <p>Projects</p>
          </div>

          <div className="stat-box">
            <h2></h2>
            <p>Certificates</p>
          </div>

          <div className="stat-box">
            <h2></h2>
            <p>Completion</p>
          </div>
        </div>


        <div className="profile-info">
          <h3>Profile Details</h3>

          <div className="info-item">
            <div className="icon bullet"></div>
            <span>Name:</span> {user?.name}
          </div>

          <div className="info-item">
            <div className="icon bullet"></div>
            <span>Email:</span> {user?.email}
          </div>

          <div className="info-item">
            <div className="icon bullet"></div>
            <span>Account Type:{user.isAdmin ? "Admin":"Standard User"}</span>
          </div>

          <div className="info-item">
            <div className="icon bullet"></div>
            <span>Role:</span> Student
          </div>
        </div>


        <div className="activity-box">
          <h3>Recent Activity</h3>
          <ul>
            <li>Logged in recently</li>
            <li>Profile updated last week</li>
            <li>Completed skill test</li>
          </ul>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
