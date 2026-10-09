import { useEffect, useState } from 'react'
import { profile } from '../data/profileData'

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!project) return null
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onMouseDown={e => e.stopPropagation()}>
        <div className="modal-topline">
          <span>PROJECT TECHNICAL BREAKDOWN</span>
          <button className="icon-btn" onClick={onClose} aria-label="Close project details">×</button>
        </div>
        <div className="project-modal-body">
          <div className="project-modal-title">
            <span>{project.tag}</span>
            <h2 id="project-modal-title">{project.title}</h2>
            <p>{project.description}</p>
          </div>

          <div className="breakdown-grid">
            <div className="breakdown-block"><span>THE PROBLEM</span><p>{project.problem}</p></div>
            <div className="breakdown-block"><span>MY APPROACH</span><p>{project.approach}</p></div>
            <div className="breakdown-block contribution-block"><span>MY CONTRIBUTION</span><p>{project.contribution}</p></div>
            <div className="breakdown-block"><span>WHAT I LEARNED</span><p>{project.learned}</p></div>
          </div>

          <div className="decision-section">
            <span className="micro-label">TECHNICAL DECISIONS</span>
            <div className="decision-list">
              {project.decisions.map(([tech, reason]) => (
                <div key={tech}><strong>{tech}</strong><p>{reason}</p></div>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <a className="primary-btn" href={project.github} target="_blank" rel="noreferrer">Open repository ↗</a>
            <a className="secondary-btn" href={project.proof} target="_blank" rel="noreferrer">Show proof ↗</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <section className="section" id="projects">
      <div className="section-heading-row">
        <div>
          <div className="section-kicker">03 / PROJECTS</div>
          <h2>Not just what I built — how I thought about it.</h2>
        </div>
        <a href={profile.links.github} target="_blank" rel="noreferrer">View GitHub ↗</a>
      </div>

      <div className="projects-grid">
        {profile.projects.map((project, index) => (
          <article className="project-card" key={project.title}>
            <div className="project-number">0{index + 1}</div>
            <div className="project-tag">{project.tag}</div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="contribution">
              <span>MY CONTRIBUTION</span>
              <p>{project.contribution}</p>
            </div>
            <div className="engineering-highlights">
              <span>ENGINEERING HIGHLIGHTS</span>
              <div>{project.highlights.slice(0, 4).map(item => <b key={item}>✓ {item}</b>)}</div>
            </div>
            <div className="tech-row">
              {project.tech.map(t => <span key={t}>{t}</span>)}
            </div>
            <div className="project-links project-links-split">
              <button className="text-btn" onClick={() => setSelected(project)}>Technical breakdown →</button>
              {project.github && <a href={project.github} target="_blank" rel="noreferrer">Repository ↗</a>}
            </div>
          </article>
        ))}
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
