import { useEffect, useState } from 'react'
import { profile } from '../data/profileData'

const slides = [
  {
    eyebrow: '01 — WHO AM I?',
    title: 'Still exploring. Already building.',
    body: 'I am a second-year AIML student at VNRVJIET. I am deliberately building across AI, full-stack development and DSA before choosing one specialization.',
    chips: ['AIML', '2nd Year', 'VNRVJIET']
  },
  {
    eyebrow: '02 — MOST TECHNICAL BUILD',
    title: 'Vigil turns disconnected case data into a network.',
    body: 'The team project combines a React interface, FastAPI, PostgreSQL, Neo4j and NLP/entity-resolution ideas to make relationships, timelines and evidence easier to inspect.',
    chips: ['React', 'FastAPI', 'Neo4j', 'PostgreSQL']
  },
  {
    eyebrow: '03 — FULL-STACK BUILD',
    title: 'CampusSpace focuses on real application rules.',
    body: 'The collaborative MERN system includes authentication, USER/ADMIN access, strict validation, booking-conflict logic and notifications—not only screens.',
    chips: ['MERN', 'JWT', 'RBAC', 'Zod']
  },
  {
    eyebrow: '04 — THIS PORTFOLIO',
    title: "Don't just read my portfolio. Ask it.",
    body: 'Questions go through a Node/Express endpoint with structured profile context. Important questions also have deterministic local fallbacks and proof links, so the demo does not depend completely on the model.',
    chips: ['React', 'Express', 'Gemini', 'Fallbacks']
  }
]

export default function TourModal({ open, onClose }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!open) return
    setStep(0)
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') setStep(s => Math.min(slides.length - 1, s + 1))
      if (event.key === 'ArrowLeft') setStep(s => Math.max(0, s - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  const slide = slides[step]

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="tour-modal" role="dialog" aria-modal="true" aria-labelledby="tour-title" onMouseDown={e => e.stopPropagation()}>
        <div className="modal-topline">
          <span>SID'S 60-SECOND TECHNICAL TOUR</span>
          <button className="icon-btn" onClick={onClose} aria-label="Close technical tour">×</button>
        </div>
        <div className="tour-progress" aria-label={`Slide ${step + 1} of ${slides.length}`}>
          {slides.map((_, i) => <i key={i} className={i <= step ? 'active' : ''} />)}
        </div>
        <div className="tour-content">
          <span className="tour-count">{String(step + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
          <p className="eyebrow">{slide.eyebrow}</p>
          <h2 id="tour-title">{slide.title}</h2>
          <p>{slide.body}</p>
          <div className="tour-chips">{slide.chips.map(chip => <span key={chip}>{chip}</span>)}</div>
          {step === 3 && (
            <div className="mini-flow" aria-label="Portfolio AI flow">
              <span>Question</span><b>→</b><span>React</span><b>→</b><span>Express</span><b>→</b><span>Profile + Gemini</span><b>→</b><span>Answer</span>
            </div>
          )}
        </div>
        <div className="tour-controls">
          <button className="ghost-btn" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>← Back</button>
          {step < slides.length - 1 ? (
            <button className="primary-btn" onClick={() => setStep(s => s + 1)}>Next →</button>
          ) : (
            <a className="primary-btn" href="#ask" onClick={onClose}>Ask my AI ✦</a>
          )}
        </div>
        <div className="tour-footer">GitHub: {profile.links.github.replace('https://github.com/', '@')}</div>
      </div>
    </div>
  )
}
