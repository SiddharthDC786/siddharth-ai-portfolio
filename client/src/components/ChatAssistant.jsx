import { useMemo, useState } from 'react'
import { profile } from '../data/profileData'

const starterPrompts = [
  'What projects has Siddharth worked on?',
  'Which project used Neo4j?',
  'Why should we select Siddharth?',
  'Show me his resume'
]

const challengePrompts = [
  'Does Siddharth know Java?',
  'Which project involved MongoDB?',
  'Which project used Neo4j?',
  'Show proof for his CNN work'
]

const localAnswer = (question) => {
  const q = question.toLowerCase()
  if (q.includes('java')) return `Java is not listed in Siddharth's current portfolio skills. I would rather say that clearly than invent a skill that is not in his profile.`
  if (q.includes('neo4j')) return `Vigil / investigation-ai is the project that uses Neo4j for graph-oriented relationship data. The repository README lists Neo4j in the graph-database stack.`
  if (q.includes('mongodb')) return `CampusSpace AI uses MongoDB with Mongoose as part of its MERN backend, alongside Node.js and Express.`
  if (q.includes('cnn') || q.includes('malaria')) return `Siddharth's Malaria Detection System uses TensorFlow/Keras CNN workflows. His documented contribution includes the Streamlit frontend, CNN integration and preprocessing/prediction flow.`
  if (q.includes('proof') || q.includes('source')) return `I can point you to the repository READMEs used as evidence for the technical claims on this portfolio. Try asking about Neo4j, MongoDB or the CNN project.`
  if (q.includes('resume')) return `You can open Siddharth's resume directly below. It is also available from the navigation bar and Profiles section.`
  if (q.includes('project')) return `Siddharth highlights four main builds: Vigil / investigation-ai, CampusSpace AI, the Malaria Detection System and this AI Portfolio Assistant. He also has a ParaDetect-AI CNN prototype on GitHub.`
  if (q.includes('skill') || q.includes('technolog')) return `His current toolkit includes React, Vite, MERN, C, C++, Python and DSA. Through projects he has also worked with or around FastAPI, PostgreSQL, MongoDB, TensorFlow/Keras, Streamlit, Neo4j, NLP concepts and graph analytics.`
  if (q.includes('select') || q.includes('why')) return `Siddharth's strongest case is not that he already knows everything. It is that he is building across different problem types, can show working evidence, and thinks about reliability, security and honest project ownership. His work spans graph-based AI, a full-stack MERN system, computer vision and this portfolio's grounded AI assistant.`
  if (q.includes('leetcode') || q.includes('coding profile')) return `Siddharth practices DSA on LeetCode. You can open his coding profile from the action card below.`
  if (q.includes('github')) return `Siddharth's GitHub is github.com/SiddharthDC786.`
  if (q.includes('goal') || q.includes('career') || q.includes('future')) return `He has not locked himself into one job title yet. He is building a strong technical base, exploring paths such as AI engineering and data engineering, and plans to specialize with more clarity as he progresses through college.`
  return `I can answer questions about Siddharth's skills, projects, technical choices, goals, profiles and resume. I also try to say when something is not in his portfolio instead of making it up.`
}

const getExtras = (question) => {
  const q = question.toLowerCase()
  const extras = {}

  if (q.includes('resume')) extras.resume = true
  if (q.includes('project') && !q.includes('which project')) extras.projects = profile.projects
  if (q.includes('coding profile') || q.includes('leetcode') || q.includes('github') || q.includes('linkedin')) extras.profiles = true
  if (q.includes('skill') || q.includes('technolog')) extras.skills = true

  if (q.includes('neo4j')) {
    extras.projects = [profile.projects[0]]
    extras.evidence = profile.evidence.neo4j
  } else if (q.includes('mongodb')) {
    extras.projects = [profile.projects[1]]
    extras.evidence = profile.evidence.mongodb
  } else if (q.includes('cnn') || q.includes('malaria')) {
    extras.projects = [profile.projects[2]]
    extras.evidence = profile.evidence.cnn
  } else if (q.includes('java')) {
    extras.evidence = profile.evidence.java
  } else if (q.includes('proof') || q.includes('source')) {
    extras.evidenceList = [profile.evidence.neo4j, profile.evidence.mongodb, profile.evidence.cnn]
  }

  return extras
}

function ProjectResult({ project }) {
  return (
    <div className="chat-project-card">
      <span>{project.tag}</span>
      <strong>{project.title}</strong>
      <p>{project.description}</p>
      <div>{project.tech.slice(0, 4).map(tech => <b key={tech}>{tech}</b>)}</div>
      <footer>
        <a href={project.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href="#projects">Details ↓</a>
      </footer>
    </div>
  )
}

function EvidenceCard({ evidence }) {
  return (
    <div className="evidence-card">
      <span>VERIFIABLE PROOF</span>
      <strong>{evidence.claim}</strong>
      <p>{evidence.source}</p>
      {evidence.url && <a href={evidence.url} target="_blank" rel="noreferrer">View source on GitHub ↗</a>}
    </div>
  )
}

function MessageExtras({ extras }) {
  if (!extras) return null
  return (
    <>
      {extras.projects?.length > 0 && (
        <div className="chat-result-stack">{extras.projects.map(project => <ProjectResult project={project} key={project.title} />)}</div>
      )}
      {extras.skills && (
        <div className="chat-skills-card">
          {Object.entries(profile.skills).slice(0, 5).map(([group, items]) => (
            <div key={group}><span>{group}</span><p>{items.join(' · ')}</p></div>
          ))}
        </div>
      )}
      {extras.profiles && (
        <div className="chat-action-grid">
          <a href={profile.links.github} target="_blank" rel="noreferrer"><b>GH</b><span>GitHub<small>@SiddharthDC786</small></span>↗</a>
          <a href={profile.links.leetcode} target="_blank" rel="noreferrer"><b>LC</b><span>LeetCode<small>@DCSiddharth</small></span>↗</a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer"><b>IN</b><span>LinkedIn<small>DC Siddharth</small></span>↗</a>
        </div>
      )}
      {extras.resume && (
        <div className="resume-result-card">
          <span className="resume-icon">CV</span>
          <div><strong>DC SIDDHARTH — RESUME</strong><small>AIML · VNRVJIET · Projects · Skills</small></div>
          <a href={profile.links.resume} target="_blank" rel="noreferrer">Open ↗</a>
          <a href={profile.links.resume} download>Download ↓</a>
        </div>
      )}
      {extras.evidence && <EvidenceCard evidence={extras.evidence} />}
      {extras.evidenceList?.map(item => <EvidenceCard evidence={item} key={item.source} />)}
    </>
  )
}

export default function ChatAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `Hi! I am Siddharth's portfolio assistant. Ask about his projects, skills, technical decisions or resume—and you can ask me to prove a claim.` }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [challengeOpen, setChallengeOpen] = useState(false)

  const apiBase = useMemo(() => import.meta.env.VITE_API_URL || 'http://localhost:5050', [])

  const ask = async (question) => {
    const clean = question.trim()
    if (!clean || loading) return
    setMessages(prev => [...prev, { role: 'user', text: clean }])
    setInput('')
    setLoading(true)

    let reply = ''
    try {
      const response = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: clean })
      })
      if (!response.ok) throw new Error('API unavailable')
      const data = await response.json()
      reply = data.reply || localAnswer(clean)
    } catch {
      reply = localAnswer(clean)
    }

    setMessages(prev => [...prev, { role: 'assistant', text: reply, extras: getExtras(clean) }])
    setLoading(false)
  }

  return (
    <section className="section ask-section" id="ask">
      <div className="ask-copy">
        <div className="section-kicker">06 / AI ASSISTANT</div>
        <h2>Don't just read my portfolio. <span>Ask it.</span></h2>
        <p>
          This assistant is grounded in my profile data. Common questions have local fallbacks, and technical claims can surface the GitHub source behind them.
        </p>
        <div className="ask-points">
          <div><span>01</span> Profile-grounded responses</div>
          <div><span>02</span> Rich project and resume actions</div>
          <div><span>03</span> GitHub proof for technical claims</div>
          <div><span>04</span> Local fallback for demo reliability</div>
        </div>
        <button className={`challenge-toggle ${challengeOpen ? 'active' : ''}`} onClick={() => setChallengeOpen(v => !v)}>
          <span>⚡</span><div><strong>Try to break my AI</strong><small>Test whether it admits what I do not know.</small></div><b>{challengeOpen ? '−' : '+'}</b>
        </button>
        {challengeOpen && (
          <div className="challenge-list">
            {challengePrompts.map(prompt => <button key={prompt} onClick={() => ask(prompt)}>{prompt} ↗</button>)}
          </div>
        )}
      </div>

      <div className="chat-card">
        <div className="chat-header">
          <div><span className="ai-orb">✦</span><strong>Siddharth AI</strong></div>
          <span className="online"><i /> grounded</span>
        </div>

        <div className="chat-messages" aria-live="polite">
          {messages.map((msg, index) => (
            <div className={`message-wrap ${msg.role}`} key={`${msg.role}-${index}`}>
              <div className={`message ${msg.role}`}><span>{msg.text}</span></div>
              {msg.role === 'assistant' && <MessageExtras extras={msg.extras} />}
            </div>
          ))}
          {loading && <div className="message assistant typing"><i /><i /><i /></div>}
        </div>

        <div className="suggestions">
          {starterPrompts.map(prompt => (
            <button onClick={() => ask(prompt)} key={prompt}>{prompt}</button>
          ))}
        </div>

        <form className="chat-input" onSubmit={(e) => { e.preventDefault(); ask(input) }}>
          <label className="sr-only" htmlFor="portfolio-question">Ask a question about Siddharth</label>
          <input id="portfolio-question" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask something about Siddharth..." autoComplete="off" />
          <button type="submit" aria-label="Send question">↗</button>
        </form>
      </div>
    </section>
  )
}
