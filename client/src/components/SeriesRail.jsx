import { useEffect, useState } from 'react'

const episodes = [
  {
    number: '01', title: 'The Full Story', subtitle: 'Who I am and how I am exploring', href: '#about', tone: 'story',
    label: 'ABOUT ME', heading: 'Exploring first. Specializing with evidence later.',
    description: 'A quick look at how I am thinking about college, projects and choosing the technical direction I eventually want to go deeper in.',
    bullets: ['2nd Year AIML at VNRVJIET', '9.53 CGPA', 'Learning through projects instead of labels']
  },
  {
    number: '02', title: 'Now Building', subtitle: 'MERN, Python backend and DSA', href: '#current-focus', tone: 'build',
    label: 'CURRENTLY', heading: 'The skills I am deliberately strengthening right now.',
    description: 'This is the most current snapshot of my learning: full-stack development, backend work, DSA practice and applied AI exposure.',
    bullets: ['MERN training', 'Python backend exploration', 'C++ + LeetCode practice']
  },
  {
    number: '03', title: 'Selected Work', subtitle: 'Projects with technical evidence', href: '#projects', tone: 'projects',
    label: 'PROJECTS', heading: 'The builds that best explain what I can currently do.',
    description: 'Instead of listing everything, this section focuses on projects where I can explain the architecture, contribution, choices and learning.',
    bullets: ['Vigil / investigation-ai', 'CampusSpace AI', 'Malaria Detection']
  },
  {
    number: '04', title: 'Skill Universe', subtitle: 'The stack behind the builds', href: '#skills', tone: 'stack',
    label: 'ENGINEERING STACK', heading: 'Tools grouped by how I actually use them.',
    description: 'Frontend, backend, data, AI/ML and problem-solving skills are grouped by real project exposure instead of being shown as a wall of logos.',
    bullets: ['React · Vite · Tailwind', 'Node · Express · FastAPI', 'MongoDB · PostgreSQL · Neo4j']
  },
  {
    number: '05', title: 'Evaluator AI', subtitle: 'Ask, compare and challenge claims', href: '#ask', tone: 'ai',
    label: 'INTERACTIVE AI', heading: 'A portfolio you can question, not just scroll through.',
    description: 'The assistant can compare projects, explain skills, surface evidence, answer follow-ups and switch into a more critical evaluator mode.',
    bullets: ['Natural follow-up questions', 'Evidence-aware answers', 'Honest gap checking']
  }
]

export default function SeriesRail() {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!selected) return undefined
    const onKey = event => event.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [selected])

  return (
    <section className="series-rail-shell container" aria-label="Continue exploring Siddharth's portfolio">
      <div className="series-rail-heading">
        <div>
          <span>CONTINUE EXPLORING</span>
          <h2>Pick an episode.</h2>
        </div>
        <small>Click a card to open a preview, then jump into the full section.</small>
      </div>

      <div className="series-rail">
        {episodes.map((episode, index) => (
          <button className={`series-episode-card episode-${episode.tone}`} type="button" onClick={() => setSelected(episode)} key={episode.number} style={{ '--episode-delay': `${index * 70}ms` }}>
            <div className="episode-card-top">
              <span>EPISODE {episode.number}</span>
              <b>▶</b>
            </div>
            <div>
              <h3>{episode.title}</h3>
              <p>{episode.subtitle}</p>
            </div>
            <i />
          </button>
        ))}
      </div>

      {selected && (
        <div className="experience-modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
          <section className="experience-modal episode-experience-modal" role="dialog" aria-modal="true" aria-labelledby="episode-preview-title" onMouseDown={event => event.stopPropagation()}>
            <div className="experience-modal-topline">
              <span>EPISODE {selected.number} / {selected.label}</span>
              <button type="button" onClick={() => setSelected(null)} aria-label="Close episode preview">×</button>
            </div>
            <div className="experience-modal-heading">
              <span>PREVIEW</span>
              <h2 id="episode-preview-title">{selected.heading}</h2>
              <p>{selected.description}</p>
            </div>
            <div className="episode-preview-points">
              {selected.bullets.map((bullet, index) => <div key={bullet}><span>0{index + 1}</span><strong>{bullet}</strong></div>)}
            </div>
            <div className="experience-modal-actions">
              <a href={selected.href} onClick={() => setSelected(null)}>Open full episode ↓</a>
            </div>
          </section>
        </div>
      )}
    </section>
  )
}
