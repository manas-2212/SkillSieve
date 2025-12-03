import "../styles/Features.css";

export default function Features() {
  return (
    <section className="features">
      <h2>Why SkillSieve?</h2>
      <div className="feature-grid">
        <div className="feature">
          <h3>(In Progress) AI Matching</h3>
          <p>Get paired with internships tailored to your unique skills.</p>
        </div>
        <div className="feature">
          <h3>Skill Insights</h3>
          <p>Understand what skills you need to boost your career potential.</p>
        </div>
        <div className="feature">
          <h3>(In progress) Guided Growth</h3>
          <p>Receive AI recommendations to enhance your resume and learning path.</p>
        </div>
      </div>
    </section>
  );
}
