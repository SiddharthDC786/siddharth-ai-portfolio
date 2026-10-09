import { profile } from '../data/profileData'
import { signature } from '../data/signatureData'

export default function Hero({ onOpenTour }) {
  return (
    <section className="hero signature-hero container" id="top">
      <div className="hero-left signature-hero-copy">
        <div className="signature-status-row">
          <div className="status-pill"><span className="status-dot" /> Open to building, learning & collaborating</div>
          <span className="hero-location">VNRVJIET · Hyderabad</span>
        </div>

        <p className="eyebrow signature-eyebrow">AI/ML STUDENT · FULL-STACK BUILDER</p>
        <h1 className="signature-name">
          DC <span>Siddharth.</span>
        </h1>
        <p className="signature-statement">I build to figure out <em>where I want to go deeper.</em></p>
        <p className="hero-subtitle signature-subtitle">
          Second-year AIML student with a <strong>{signature.cgpa} CGPA</strong>, currently learning the <strong>MERN stack</strong>, building backend systems with <strong>Node.js and Python</strong>, strengthening <strong>C++ + DSA on LeetCode</strong>, and exploring applied AI through real projects.
        </p>

        <div className="hero-actions signature-actions">
          <a className="primary-btn magnetic" href="#projects">See selected work <span>↘</span></a>
          <a className="secondary-btn magnetic" href="#ask">Ask my AI <span>✦</span></a>
          <button className="secondary-btn tour-btn magnetic" onClick={onOpenTour}>60-sec tour</button>
        </div>

        <div className="signature-metrics" aria-label="Portfolio highlights">
          <div><span>CGPA</span><strong>{signature.cgpa}</strong></div>
          <div><span>ACADEMIC</span><strong>2nd Year AIML</strong></div>
          <div><span>TRAINING</span><strong>MERN Stack</strong></div>
          <div><span>BUILDING WITH</span><strong>Python · C++ · JS</strong></div>
        </div>
      </div>

      <aside className="signature-orbit" aria-label="Current technical direction">
        <div className="orbit-ring orbit-ring-one" />
        <div className="orbit-ring orbit-ring-two" />
        <div className="orbit-core">
          <span>NOW</span>
          <strong>BUILDING<br />RANGE</strong>
          <small>before choosing depth</small>
        </div>
        <span className="orbit-chip chip-react">React</span>
        <span className="orbit-chip chip-python">Python</span>
        <span className="orbit-chip chip-node">Node.js</span>
        <span className="orbit-chip chip-cpp">C++</span>
        <span className="orbit-chip chip-ai">AI / ML</span>
      </aside>
    </section>
  )
}
