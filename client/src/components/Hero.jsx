import { profile } from '../data/profileData'

export default function Hero({ onOpenTour }) {
  return (
    <section className="hero container" id="top">
      <div className="hero-left">
        <div className="status-pill"><span className="status-dot" /> Open to learning, building & collaborating</div>
        <p className="eyebrow">HELLO, I'M</p>
        <h1>DC <span>Siddharth.</span></h1>
        <p className="hero-hook">{profile.heroLine}</p>
        <p className="hero-subtitle">
          A second-year AIML student exploring <strong>AI</strong>, <strong>full-stack development</strong> and <strong>DSA</strong> through real builds instead of waiting to choose a specialization.
        </p>
        <div className="hero-actions">
          <a className="primary-btn" href="#projects">Explore my work <span>↘</span></a>
          <button className="secondary-btn tour-btn" onClick={onOpenTour}>▶ 60-sec technical tour</button>
          <a className="secondary-btn" href="#ask">Ask my portfolio <span>✦</span></a>
        </div>
        <div className="hero-meta">
          <div><span>COLLEGE</span><strong>VNRVJIET</strong></div>
          <div><span>PROGRAM</span><strong>AIML</strong></div>
          <div><span>YEAR</span><strong>2nd</strong></div>
        </div>
      </div>

      <aside className="hero-panel" aria-label="Developer profile snapshot">
        <div className="panel-top">
          <span className="terminal-dots"><i /><i /><i /></span>
          <span>profile.json</span>
        </div>
        <pre>{`{
  "developer": "DC Siddharth",
  "year": "2nd",
  "focus": [
    "full-stack",
    "AI/ML",
    "DSA"
  ],
  "projects": {
    "graph_ai": "Vigil",
    "full_stack": "CampusSpace",
    "computer_vision": "Malaria CNN"
  },
  "currently": "building > overthinking"
}`}</pre>
        <div className="panel-note">Not locked into one title. Building enough range to choose my strongest lane with evidence.</div>
      </aside>
    </section>
  )
}
