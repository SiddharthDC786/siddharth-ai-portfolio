import { useEffect, useMemo, useRef, useState } from 'react'
import { profile } from '../data/profileData'

const evaluatorActions = [
  { label: '30-sec candidate brief', prompt: 'Give me a 30 second evaluator brief on Siddharth.' },
  { label: 'Why is he different?', prompt: 'What actually differentiates Siddharth from other candidates?' },
  { label: 'Verify technical claims', prompt: 'Show me proof for Siddharth’s technical claims.' },
  { label: 'Honest gap check', prompt: 'What are the biggest gaps in Siddharth’s current profile?' }
]

const explorePrompts = [
  'Tell me about Vigil in simple words.',
  'What is Siddharth learning right now?',
  'Which project best shows backend work?',
  'What does he do beyond coding?'
]

const evaluatePrompts = [
  'Why should we select Siddharth?',
  'What should I question him about?',
  'Which claims can you verify?',
  'Where is his profile still weak?'
]

const challengePrompts = [
  'Does Siddharth know Java?',
  'Which project involved MongoDB?',
  'Has he worked with Neo4j?',
  'Show proof for his CNN work',
  'Compare Vigil and CampusSpace AI',
  'What would you ask him in an interview?'
]

const hasAny = (q, terms) => terms.some(term => q.includes(term))
const isGreeting = q => /^(hi|hello|hey|heyy+|hii+|yo|good morning|good evening|good afternoon)[!. ]*$/.test(q)
const isThanks = q => /^(thanks|thank you|thankyou|thx|ty)[!. ]*$/.test(q)

const instantAnswer = (question) => {
  const q = question.toLowerCase().trim()
  if (isGreeting(q)) return `Hey! Ask me anything about Siddharth’s projects, skills, learning, technical decisions, teamwork, profile gaps or evidence. You can also switch to Evaluate mode if you want a more critical view.`
  if (isThanks(q)) return `You’re welcome. Keep going with a follow-up — I remember the recent conversation.`
  if (hasAny(q, ['what can you do', 'how can you help', 'help me', 'capabilities'])) return `I can have a normal conversation about Siddharth’s portfolio, explain projects at different levels of detail, compare his work, answer follow-ups using recent context, show selected evidence, surface his resume/profiles, and switch into a more critical evaluator mode.`
  if (q.includes('resume')) return `You can open Siddharth’s resume directly below.`
  if (q === 'github' || q.includes('github profile')) return `Siddharth’s GitHub is github.com/SiddharthDC786.`
  return null
}

const getExtras = (question) => {
  const q = question.toLowerCase()
  const extras = {}
  if (q.includes('resume')) extras.resume = true
  if (hasAny(q, ['coding profile', 'leetcode', 'github', 'linkedin'])) extras.profiles = true
  if (hasAny(q, ['skill', 'technolog', 'learning right now', 'currently learning'])) extras.skills = true
  if (q.includes('neo4j')) {
    extras.projects = [profile.projects[0]]
    extras.evidence = profile.evidence.neo4j
  } else if (q.includes('mongodb')) {
    extras.projects = [profile.projects[1]]
    extras.evidence = profile.evidence.mongodb
  } else if (hasAny(q, ['cnn', 'malaria', 'computer vision'])) {
    extras.projects = [profile.projects[2]]
    extras.evidence = profile.evidence.cnn
  } else if (q.includes('java')) {
    extras.evidence = profile.evidence.java
  } else if (hasAny(q, ['proof', 'source', 'verify', 'evidence', 'technical claims'])) {
    extras.evidenceList = [profile.evidence.neo4j, profile.evidence.mongodb, profile.evidence.cnn]
  }
  return extras
}

const followUpsFor = (question, mode) => {
  const q = question.toLowerCase()
  if (q.includes('vigil')) return ['What exactly did he learn from it?', 'Why use Neo4j?', 'What was his contribution?']
  if (q.includes('campusspace')) return ['What backend concepts are used?', 'How is authentication handled?', 'Compare it with Vigil']
  if (q.includes('malaria') || q.includes('cnn')) return ['What was his contribution?', 'What tech stack was used?', 'Show the evidence']
  if (hasAny(q, ['skill', 'strength', 'technology'])) return ['Which project proves that?', 'What is he still weak at?', 'What is he learning now?']
  if (hasAny(q, ['weak', 'gap', 'limitation'])) return ['How is he improving that?', 'What would you test in an interview?', 'What is his strongest evidence?']
  return mode === 'evaluate'
    ? ['What evidence supports that?', 'What is the biggest concern?', 'What should I ask him next?']
    : ['Tell me more.', 'Which project shows that best?', 'What did he learn from that?']
}

function ProjectResult({ project }) {
  return <div className="chat-project-card"><span>{project.tag}</span><strong>{project.title}</strong><p>{project.description}</p><div>{project.tech.slice(0, 4).map(tech => <b key={tech}>{tech}</b>)}</div><footer><a href={project.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href="#projects">Details ↓</a></footer></div>
}

function EvidenceCard({ evidence }) {
  return <div className="evidence-card"><span>VERIFIABLE PROOF</span><strong>{evidence.claim}</strong><p>{evidence.source}</p>{evidence.url && <a href={evidence.url} target="_blank" rel="noreferrer">View source on GitHub ↗</a>}</div>
}

function MessageExtras({ extras }) {
  if (!extras) return null
  return <>
    {extras.projects?.length > 0 && <div className="chat-result-stack">{extras.projects.map(project => <ProjectResult project={project} key={project.title} />)}</div>}
    {extras.skills && <div className="chat-skills-card">{Object.entries(profile.skills).slice(0, 6).map(([group, items]) => <div key={group}><span>{group}</span><p>{items.join(' · ')}</p></div>)}</div>}
    {extras.profiles && <div className="chat-action-grid"><a href={profile.links.github} target="_blank" rel="noreferrer"><b>GH</b><span>GitHub<small>@SiddharthDC786</small></span>↗</a><a href={profile.links.leetcode} target="_blank" rel="noreferrer"><b>LC</b><span>LeetCode<small>@DCSiddharth</small></span>↗</a><a href={profile.links.linkedin} target="_blank" rel="noreferrer"><b>IN</b><span>LinkedIn<small>DC Siddharth</small></span>↗</a></div>}
    {extras.resume && <div className="resume-result-card"><span className="resume-icon">CV</span><div><strong>DC SIDDHARTH — RESUME</strong><small>AIML · VNRVJIET · Projects · Skills</small></div><a href={profile.links.resume} target="_blank" rel="noreferrer">Open ↗</a><a href={profile.links.resume} download>Download ↓</a></div>}
    {extras.evidence && <EvidenceCard evidence={extras.evidence} />}
    {extras.evidenceList?.map(item => <EvidenceCard evidence={item} key={item.source} />)}
  </>
}

export default function ChatAssistantV2() {
  const welcome = `Hi — I’m Siddharth’s interactive portfolio AI. Ask naturally, ask follow-ups, compare projects, challenge a claim, or switch to Evaluate mode for a more critical view.`
  const [messages, setMessages] = useState([{ role: 'assistant', text: welcome }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [challengeOpen, setChallengeOpen] = useState(false)
  const [mode, setMode] = useState('explore')
  const [followUps, setFollowUps] = useState([])
  const messagesRef = useRef(null)
  const apiBase = useMemo(() => import.meta.env.VITE_API_URL || 'http://localhost:5050', [])

  useEffect(() => {
    const box = messagesRef.current
    if (box) box.scrollTo({ top: box.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const resetChat = () => {
    setMessages([{ role: 'assistant', text: welcome }])
    setFollowUps([])
    setInput('')
  }

  const ask = async (question) => {
    const clean = question.trim()
    if (!clean || loading) return
    const historyForApi = messages.slice(-10).map(({ role, text }) => ({ role, text }))
    setMessages(prev => [...prev, { role: 'user', text: clean }])
    setInput('')
    setFollowUps([])

    const quick = instantAnswer(clean)
    if (quick) {
      setMessages(prev => [...prev, { role: 'assistant', text: quick, extras: getExtras(clean) }])
      setFollowUps(followUpsFor(clean, mode))
      return
    }

    setLoading(true)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 12000)
    try {
      const response = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: clean, history: historyForApi, mode }),
        signal: controller.signal
      })
      if (!response.ok) throw new Error('AI unavailable')
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply || `I couldn't form a response to that. Try rephrasing it once.`, extras: getExtras(clean) }])
      setFollowUps(followUpsFor(clean, mode))
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: `The live AI service is temporarily busy. Retry the same question, or ask about the resume, GitHub, Neo4j, MongoDB or CNN evidence while it recovers.`, extras: getExtras(clean) }])
    } finally {
      clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  const suggestedPrompts = mode === 'evaluate' ? evaluatePrompts : explorePrompts

  return <section className="section ask-section" id="ask">
    <div className="ask-copy">
      <div className="section-kicker">07 / INTERACTIVE AI</div>
      <h2>Have a conversation with <span>my portfolio.</span></h2>
      <p>It is not limited to preset questions. Ask naturally, refer back to earlier answers, compare projects, ask “why?”, or switch modes depending on whether you want to explore or evaluate my profile.</p>

      <div className="chat-mode-switch" role="group" aria-label="AI conversation mode">
        <button className={mode === 'explore' ? 'active' : ''} onClick={() => setMode('explore')}><span>01</span><div><strong>Explore</strong><small>Natural conversation</small></div></button>
        <button className={mode === 'evaluate' ? 'active' : ''} onClick={() => setMode('evaluate')}><span>02</span><div><strong>Evaluate</strong><small>Critical + evidence-focused</small></div></button>
      </div>

      {mode === 'evaluate' && <div className="evaluator-mode"><div className="evaluator-mode-head"><span>◆</span><div><strong>Evaluator shortcuts</strong><small>Starting points — not the limit of what you can ask</small></div></div><div className="evaluator-action-grid">{evaluatorActions.map(item => <button key={item.label} onClick={() => ask(item.prompt)}>{item.label}<span>↗</span></button>)}</div></div>}

      <button className={`challenge-toggle ${challengeOpen ? 'active' : ''}`} onClick={() => setChallengeOpen(v => !v)}><span>⚡</span><div><strong>Stress-test the AI</strong><small>Try follow-ups, comparisons and unsupported claims.</small></div><b>{challengeOpen ? '−' : '+'}</b></button>
      {challengeOpen && <div className="challenge-list">{challengePrompts.map(prompt => <button key={prompt} onClick={() => ask(prompt)}>{prompt} ↗</button>)}</div>}
    </div>

    <div className="chat-card evaluator-chat-card">
      <div className="chat-header"><div><span className="ai-orb">✦</span><strong>Siddharth AI</strong><em>{mode === 'evaluate' ? 'Evaluate mode' : 'Explore mode'}</em></div><div className="chat-header-actions"><span className="online"><i /> live AI</span><button type="button" onClick={resetChat}>Clear</button></div></div>
      <div className="chat-messages" ref={messagesRef} aria-live="polite">
        {messages.map((msg, index) => <div className={`message-wrap ${msg.role}`} key={`${msg.role}-${index}`}><div className={`message ${msg.role}`}><span>{msg.text}</span></div>{msg.role === 'assistant' && <MessageExtras extras={msg.extras} />}</div>)}
        {loading && <div className="message assistant typing"><i /><i /><i /><span>Thinking with portfolio context…</span></div>}
      </div>
      {followUps.length > 0 && <div className="follow-up-row"><span>Continue:</span><div>{followUps.map(prompt => <button key={prompt} onClick={() => ask(prompt)}>{prompt}</button>)}</div></div>}
      <div className="suggestions">{suggestedPrompts.map(prompt => <button onClick={() => ask(prompt)} key={prompt}>{prompt}</button>)}</div>
      <form className="chat-input" onSubmit={e => { e.preventDefault(); ask(input) }}><label className="sr-only" htmlFor="portfolio-question">Ask anything about Siddharth</label><input id="portfolio-question" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask anything about Siddharth — follow-ups work too…" autoComplete="off" /><button type="submit" aria-label="Send question" disabled={loading}>↗</button></form>
    </div>
  </section>
}
