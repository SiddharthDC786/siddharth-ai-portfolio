import { useEffect, useState } from 'react'
import { signature } from '../data/signatureData'

const directionLanes = [
  { label: 'FULL STACK', title: 'MERN', text: 'Building complete flows with React, Node.js, Express and MongoDB.' },
  { label: 'BACKEND', title: 'Python', text: 'Exploring API design and backend systems through FastAPI and project work.' },
  { label: 'PROBLEM SOLVING', title: 'C++ + DSA', text: 'Strengthening fundamentals through LeetCode and consistent practice.' },
  { label: 'APPLIED AI', title: 'AI / ML', text: 'Using computer vision, NLP and graph ideas inside real student projects.' }
]

export default function Hero({ onOpenTour }) {
  const [directionOpen, setDirectionOpen] = useState(false)

  useEffect(() => {
    if (!directionOpen) return undefined
    const onKey = event => event.key === 'Escape' && setDirectionOpen(false)
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [directionOpen])

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

      <button className="signature-orbit cinematic-orbit orbit-launcher" type="button" onClick={() => setDirectionOpen(true)} aria-label="Open current technical direction">
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
        <span className="orbit-click-hint">CLICK TO EXPLORE ↗</span>
      </button>

      {directionOpen && (
        <div className="experience-modal-backdrop" role="presentation" onMouseDown={() => setDirectionOpen(false)}>
          <section className="experience-modal orbit-experience-modal" role="dialog" aria-modal="true" aria-labelledby="direction-title" onMouseDown={event => event.stopPropagation()}>
            <div className="experience-modal-topline">
              <span>NOW BUILDING</span>
              <button type="button" onClick={() => setDirectionOpen(false)} aria-label="Close current direction">×</button>
            </div>
            <div className="experience-modal-heading">
              <span>THE IDEA BEHIND “BUILDING RANGE”</span>
              <h2 id="direction-title">I am exploring enough to choose depth with evidence.</h2>
              <p>I do not want to choose a specialization just because the title sounds good. Right now, I am deliberately testing four technical lanes through actual work.</p>
            </div>
            <div className="direction-lanes">
              {directionLanes.map((lane, index) => (
                <article key={lane.title}>
                  <span>0{index + 1} / {lane.label}</span>
                  <h3>{lane.title}</h3>
                  <p>{lane.text}</p>
                </article>
              ))}
            </div>
            <div className="experience-modal-actions">
              <a href="#current-focus" onClick={() => setDirectionOpen(false)}>See what I am learning ↓</a>
              <a href="#projects" onClick={() => setDirectionOpen(false)}>See the evidence ↓</a>
            </div>
          </section>
        </div>
      )}
    </section>
  )
}
