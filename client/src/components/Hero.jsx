import { signature } from '../data/signatureData'

export default function Hero({ onOpenTour }) {
  return (
    <section className="hero signature-hero cinematic-hero container" id="top">
      <div className="cinematic-grid-lines" aria-hidden="true" />
      <div className="hero-left signature-hero-copy cinematic-copy">
        <div className="signature-status-row cinematic-status-row">
          <div className="status-pill"><span className="status-dot" /> OPEN TO BUILDING · LEARNING · COLLABORATING</div>
          <span className="hero-location">VNRVJIET · HYDERABAD</span>
        </div>

        <p className="cinematic-pretitle">AN INTERACTIVE PORTFOLIO SERIES</p>
        <h1 className="signature-name cinematic-title">
          DC <span>SIDDHARTH</span>
        </h1>
        <div className="cinematic-rule" />
        <p className="signature-statement cinematic-statement">Still exploring. Already building.</p>
        <p className="hero-subtitle signature-subtitle cinematic-subtitle">
          Second-year AIML student with a <strong>{signature.cgpa} CGPA</strong>. I am using projects to test where I want to go deeper across <strong>MERN</strong>, <strong>Python backend</strong>, <strong>C++ + DSA</strong> and <strong>applied AI</strong>.
        </p>

        <div className="cinematic-meta" aria-label="Portfolio highlights">
          <span><b>{signature.cgpa}</b> CGPA</span>
          <span><b>2nd</b> Year AIML</span>
          <span><b>MERN</b> Training</span>
          <span><b>AI + Backend</b> Projects</span>
        </div>

        <div className="hero-actions signature-actions cinematic-actions">
          <a className="primary-btn magnetic cinematic-primary" href="#about"><span>▶</span> Start the story</a>
          <button className="secondary-btn tour-btn magnetic" onClick={onOpenTour}>60-sec trailer</button>
          <a className="secondary-btn magnetic" href="#ask">Ask my AI ✦</a>
        </div>
      </div>

      <aside className="cinematic-poster" aria-label="Current technical direction">
        <div className="poster-glow" />
        <div className="poster-noise" />
        <div className="poster-topline"><span>SEASON 02</span><b>2026</b></div>
        <div className="poster-core">
          <small>NOW PLAYING</small>
          <strong>BUILDING<br />RANGE</strong>
          <p>before choosing depth</p>
        </div>
        <div className="poster-stack">
          <span>React</span><span>Node.js</span><span>Python</span><span>C++</span><span>AI / ML</span>
        </div>
        <div className="poster-footer">
          <span>LEARN</span><i /> <span>BUILD</span><i /> <span>BREAK</span><i /> <span>IMPROVE</span><i /> <span>EXPLAIN</span>
        </div>
      </aside>
    </section>
  )
}
