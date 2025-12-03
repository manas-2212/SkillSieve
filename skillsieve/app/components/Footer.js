import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>SkillSieve</h3>
        <p>Your skill & internship guidance platform</p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </div>

        <p className="footer-copy">© {new Date().getFullYear()} SkillSieve. All rights reserved.</p>
      </div>
    </footer>
  );
}
