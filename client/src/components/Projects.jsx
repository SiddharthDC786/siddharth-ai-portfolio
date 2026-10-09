import { useEffect, useState } from 'react'
import { profile } from '../data/profileData'

const caseStudyMeta = {
  'Vigil / investigation-ai': {
    visual: 'network',
    architecture: ['React / Vite', 'FastAPI', 'PostgreSQL', 'Neo4j + NLP', 'Investigation views'],
    challenge: 'The difficult part is identity, not just extraction: noisy records can refer to the same person in different ways, so entity resolution and provenance matter before a graph can be trusted.',
    next: 'I would push the next iteration toward stronger confidence scoring, clearer provenance on every relationship and better evaluation of entity-resolution quality.'
  },
  'CampusSpace AI': {
    visual: 'booking',
    architecture: ['React / Vite', 'REST API', 'Express', 'MongoDB', 'RBAC + booking rules'],
    challenge: 'Booking systems look simple until two people request the same slot. The backend has to enforce conflicts and permissions even if the UI already looks correct.',
    next: 'I would add stronger concurrency handling, richer admin analytics and a cleaner audit trail for booking approvals and status changes.'
  },
  'Malaria Detection System': {
    visual: 'vision',
    architecture: ['Image upload', 'OpenCV preprocessing', 'CNN inference', 'Prediction logic', 'Streamlit result'],
    challenge: 'The uploaded image has to be transformed exactly as the model expects. A mismatch between training preprocessing and inference preprocessing can make a good model behave badly in the app.',
    next: 'I would add better confidence communication, error handling for poor-quality inputs and a clearer evaluation page showing model limitations and metrics.'
  },
  'AI Portfolio Assistant': {
    visual: 'assistant',
    architecture: ['React / Vite', 'Structured profile data', 'Node / Express', 'Gemini API', 'Grounded answer + fallback'],
    challenge: 'The assistant should be useful without inventing achievements. Grounding, proof links, fallbacks and failure states matter more here than simply connecting a model API.',
    next: 'I would add retrieval over project documentation, stronger source-level citations and lightweight analytics on what evaluators actually ask.'
  }
}

function ProjectVisual({ type }) {
  if (type === 'network') {
    return <div className="case-visual network-visual" aria-label="Abstract relationship graph visual">
      <span className="visual-label">SYSTEM SNAPSHOT · RELATIONSHIP GRAPH</span>
      <div className="graph-line line-a" /><div className="graph-line line-b" /><div className="graph-line line-c" /><div className="graph-line line-d" />
      <i className="graph-node node-a">P1</i><i className="graph-node node-b">SIM</i><i className="graph-node node-c">A/C</i><i className="graph-node node-d">V</i><i className="graph-node node-e">P2</i>
      <strong>messy records → resolved entities → explainable links</strong>
    </div>
  }
  if (type === 'booking') {
    return <div className="case-visual booking-visual" aria-label="Abstract booking workflow visual">
      <span className="visual-label">SYSTEM SNAPSHOT · BOOKING FLOW</span>
      <div className="booking-room"><small>SEMINAR HALL</small><b>10:00</b><em>AVAILABLE</em></div>
      <div className="booking-arrow">→</div>
      <div className="booking-room booked"><small>REQUEST</small><b>10:00</b><em>VALIDATE</em></div>
      <div className="booking-arrow">→</div>
      <div className="booking-room admin"><small>ADMIN</small><b>RBAC</b><em>DECISION</em></div>
      <strong>availability → validation → authorization</strong>
    </div>
  }
  if (type === 'vision') {
    return <div className="case-visual vision-visual" aria-label="Abstract computer vision pipeline visual">
      <span className="visual-label">SYSTEM SNAPSHOT · INFERENCE PIPELINE</span>
      <div className="vision-cell"><i /><i /><i /><i /><i /></div>
      <div className="vision-flow"><span>IMAGE</span><b>→</b><span>PREPROCESS</span><b>→</b><span>CNN</span><b>→</b><span>RESULT</span></div>
      <strong>consistent inputs matter as much as the prediction call</strong>
    </div>
  }
  return <div className="case-visual assistant-visual" aria-label="Abstract grounded AI assistant flow visual">
    <span className="visual-label">SYSTEM SNAPSHOT · GROUNDED ASSISTANT</span>
    <div className="assistant-bubble user">Compare Vigil and CampusSpace.</div>
    <div className="assistant-flow"><span>PROFILE DATA</span><i>+</i><span>PROJECT PROOF</span><i>→</i><span>AI</span></div>
    <div className="assistant-bubble ai">Compare by backend depth, data model and evidence.</div>
    <strong>question → context → grounded answer</strong>
  </div>
}

function CaseStudy({ project, onClose }) {
  const meta = caseStudyMeta[project.title] || {
    visual: 'assistant',
    architecture: project.tech.slice(0, 5),
    challenge: project.learned,
    next: 'Continue improving the architecture, usability and evidence around the project.'
  }

  useEffect(() => {
    const onKey = event => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  return <div className="case-study-backdrop" role="presentation" onMouseDown={onClose}>
    <article className="case-study-modal" role="dialog" aria-modal="true" aria-labelledby="case-study-title" onMouseDown={event => event.stopPropagation()}>
      <header className="case-study-nav">
        <div><span>PROJECT CASE STUDY</span><b>{project.tag}</b></div>
        <button onClick={onClose} type="button" aria-label="Close project case study">×</button>
      </header>

      <section className="case-study-hero">
        <div className="case-study-intro">
          <span>SELECTED WORK</span>
          <h2 id="case-study-title">{project.title}</h2>
          <p>{project.description}</p>
          <div className="case-tech-row">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div>
        </div>
        <ProjectVisual type={meta.visual} />
      </section>

      <section className="case-study-section case-problem-grid">
        <div><span className="case-label">01 / THE PROBLEM</span><h3>What needed to be solved?</h3><p>{project.problem}</p></div>
        <div><span className="case-label">02 / THE APPROACH</span><h3>How the system thinks about it.</h3><p>{project.approach}</p></div>
      </section>

      <section className="case-study-section architecture-section">
        <div className="case-section-heading"><span className="case-label">03 / SYSTEM ARCHITECTURE</span><h3>From input to useful output.</h3></div>
        <div className="architecture-rail">
          {meta.architecture.map((step, index) => <div className="architecture-step" key={step}><small>0{index + 1}</small><strong>{step}</strong>{index < meta.architecture.length - 1 && <i>→</i>}</div>)}
        </div>
      </section>

      <section className="case-study-section case-contribution">
        <div><span className="case-label">04 / MY CONTRIBUTION</span><h3>What I can actually explain.</h3><p>{project.contribution}</p></div>
        <div className="case-highlight-list">{project.highlights.map(item => <span key={item}>✓ {item}</span>)}</div>
      </section>

      <section className="case-study-section">
        <div className="case-section-heading"><span className="case-label">05 / TECHNICAL DECISIONS</span><h3>Tools with a reason behind them.</h3></div>
        <div className="case-decision-grid">
          {project.decisions.map(([tech, reason], index) => <article key={tech}><small>0{index + 1}</small><strong>{tech}</strong><p>{reason}</p></article>)}
        </div>
      </section>

      <section className="case-study-section judgment-grid">
        <div><span className="case-label">06 / HARD PART</span><h3>The engineering challenge.</h3><p>{meta.challenge}</p></div>
        <div><span className="case-label">07 / WHAT I LEARNED</span><h3>The takeaway.</h3><p>{project.learned}</p></div>
        <div className="next-iteration"><span className="case-label">08 / NEXT ITERATION</span><h3>What I would improve next.</h3><p>{meta.next}</p><small>Future direction — not claimed as already implemented.</small></div>
      </section>

      <footer className="case-study-footer">
        <div><span>VERIFY THE WORK</span><p>Open the repository or supporting README instead of taking the portfolio at face value.</p></div>
        <div>
          {project.github && <a className="primary-btn" href={project.github} target="_blank" rel="noreferrer">Open repository ↗</a>}
          {project.proof && <a className="secondary-btn" href={project.proof} target="_blank" rel="noreferrer">View proof ↗</a>}
          <a className="secondary-btn" href="#ask" onClick={onClose}>Ask AI about it ✦</a>
        </div>
      </footer>
    </article>
  </div>
}

export default function Projects() {
  const [selected, setSelected] = useState(null)

  return <section className="section premium-projects-section" id="projects">
    <div className="section-heading-row">
      <div>
        <div className="section-kicker">03 / PROJECTS</div>
        <h2>Evidence first. Pretty cards second.</h2>
      </div>
      <a href={profile.links.github} target="_blank" rel="noreferrer">View GitHub ↗</a>
    </div>

    <div className="projects-grid premium-project-grid">
      {profile.projects.map((project, index) => {
        const meta = caseStudyMeta[project.title] || { visual: 'assistant' }
        return <article className="project-card premium-project-card" key={project.title}>
          <div className="project-card-head"><div><span className="project-number">0{index + 1}</span><span className="project-tag">{project.tag}</span></div><button type="button" onClick={() => setSelected(project)} aria-label={`Open ${project.title} case study`}>↗</button></div>
          <ProjectVisual type={meta.visual} />
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="contribution compact-contribution"><span>MY CONTRIBUTION</span><p>{project.contribution}</p></div>
          <div className="tech-row">{project.tech.slice(0, 6).map(tech => <span key={tech}>{tech}</span>)}</div>
          <div className="project-links project-links-split"><button className="text-btn case-study-trigger" onClick={() => setSelected(project)}>Open case study →</button>{project.github && <a href={project.github} target="_blank" rel="noreferrer">Repository ↗</a>}</div>
        </article>
      })}
    </div>

    {selected && <CaseStudy project={selected} onClose={() => setSelected(null)} />}
  </section>
}
