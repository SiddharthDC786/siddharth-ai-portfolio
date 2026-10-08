import { profile } from '../data/profileData'

export default function Hero({ onOpenTour }) {
  return (
    <section className="hero container" id="top">
      <div className="hero-left">
        <div className="status-pill"><span className="status-dot" /> 2nd-year AIML · currently in VNRVJIET MERN training</div>
        <p className="eyebrow">HELLO, I'M</p>
        <h1>DC <span>Siddharth.</span></h1>
        <p className="hero-hook">{profile.heroLine}</p>
        <p className="hero-subtitle">
          I am learning <strong>full-stack development through VNRVJIET's MERN training</strong>, strengthening <strong>C++ + DSA</strong>, and using real projects to explore where I want to go deeper in <strong>AI and data</strong>.
        </p>
        <div className="hero-actions">
          <a className="primary-btn" href="#current-focus">See what I'm learning <span>↘</span></a>
          <button className="secondary-btn tour-btn" onClick={onOpenTour}>▶ 60-sec technical tour</button>
          <a className="secondary-btn" href="#ask">Ask my portfolio <span>✦</span></a>
        </div>
        <div className="hero-meta">
          <div><span>COLLEGE</span><strong>VNRVJIET</strong></div>
          <div><span>PROGRAM</span><strong>AIML</strong></div>
          <div><span>CURRENT TRAINING</span><strong>MERN Stack</strong></div>
          <div><span>FOCUS</span><strong>C++ · DSA · AI/Data</strong></div>
        </div>
      </div>

      <aside className="hero-panel" aria-label="Developer profile snapshot">
        <div className="panel-top">
          <span className="terminal-dots"><i /><i /><i /></span>
          <span>profile.json</span>
        </div>
        <pre>{`{
  "developer": "DC Siddharth",
  "college": "VNRVJIET",
  "degree": "B.Tech AIML",
  "year": "2nd",
  "currently_learning": [
    "MERN stack",
    "C++ + DSA",
    "AI / data systems"
  ],
  "built": [
    "Vigil",
    "CampusSpace AI",
    "Malaria Detection"
  ],
  "mindset": "learn by building"
}`}</pre>
        <div className="panel-note">I have not chosen one specialization yet. I am building enough range to make that decision from real experience, not guesswork.</div>
      </aside>
    </section>
  )
}
