"use client";
import Link from "next/link";
import "../styles/Navbar.css";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">SkillSieve</Link>

      <div className="navbar-links">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/contact">Contact</Link>


        {user?.isAdmin && (
          <Link href="/admin" className="admin-link">
            Admin Dashboard
          </Link>
        )}

        {/*protected*/}
        {user ? (
          <Link href="/protectedapp/profile" className="profile-link">
            Your Profile
          </Link>
        ) : (
          <Link href="/login" className="login-link">
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
}
