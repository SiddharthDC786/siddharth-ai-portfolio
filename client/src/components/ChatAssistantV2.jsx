import { useEffect, useMemo, useRef, useState } from 'react'
import { profile } from '../data/profileData'

const evaluatorActions = [
  { label: '30-sec candidate brief', prompt: 'Give me a 30 second evaluator brief on Siddharth.' },
  { label: 'Personal contribution', prompt: 'What did Siddharth personally work on in Vigil and CampusSpace?' },
  { label: 'Compare strongest projects', prompt: 'Compare Vigil and CampusSpace and tell me what each proves about Siddharth.' },
  { label: 'Why select him?', prompt: 'Why should a technical student chapter select Siddharth?' },
  { label: 'Interview questions', prompt: 'Give me five technical interview questions you would ask Siddharth based on his actual projects.' },
  { label: 'Honest gap check', prompt: 'What are the biggest gaps in Siddharth’s current profile?' }
]

const explorePrompts = [
  'What exactly did Siddharth do in Vigil?',
  'Explain his CampusSpace backend work.',
  'Which project best proves backend ability?',
  'What is he learning right now?'
]

const evaluatePrompts = [
  'Why should we select Siddharth?',
  'Compare Vigil and CampusSpace AI.',
  'What should I question him about?',
  'Where is his profile still weak?'
]

const challengePrompts = [
  'Did Siddharth build Vigil alone?',
  'What did he personally own in Vigil?',
  'How did he contribute as team lead?',
  'Which CampusSpace APIs did the backend need?',
  'Does Siddharth know Java?',
  'Has he worked with Neo4j?',
  'Show proof for his CNN work',
  'What would expose a weak answer in an interview?'
]

const hasAny = (q, terms) => terms.some(term => q.includes(term))
const isGreeting = q => /^(hi|hello|hey|heyy+|hii+|yo|good morning|good evening|good afternoon)[!. ]*$/.test(q)
const isThanks = q => /^(thanks|thank you|thankyou|thx|ty)[!. ]*$/.test(q)

const contributionAnswer = (q) => {
  if (q.includes('vigil') && hasAny(q, ['contribution', 'personally', 'work on', 'worked on', 'own', 'role', 'team lead'])) {
    return `In Vigil, Siddharth’s main contribution was on the backend and API side, and he also served as team lead. He coordinated the team through GitHub, managed repository workflow and integrations, and worked on connecting structured case data and API endpoints with the graph/NLP-oriented parts of the system. Vigil is still a team project, so the portfolio does not claim that he built the entire product alone.`
  }
  if (q.includes('campusspace') && hasAny(q, ['contribution', 'personally', 'work on', 'worked on', 'own', 'role', 'backend', 'api'])) {
    return `For CampusSpace AI, Siddharth worked primarily on the backend and REST API layer. His contribution covers authenticated USER/ADMIN flows, resource and booking operations, validation, conflict-aware booking rules and MongoDB-backed integration. The project is collaborative, but the backend/API work is the part he can explain most directly.`
  }
  return null
}

const reliableFallback = (question, mode = 'explore') => {
  const q = question.toLowerCase().trim()
  const contribution = contributionAnswer(q)
  if (contribution) return contribution

  if (hasAny(q, ['compare vigil', 'vigil and campusspace', 'campusspace and vigil'])) {
    return `Vigil proves more about Siddharth’s Python/backend, API integration, structured data and team-lead experience: it uses FastAPI, PostgreSQL, Neo4j and NLP/graph concepts. CampusSpace proves more about conventional production-style backend rules in a MERN app: Express APIs, MongoDB/Mongoose, JWT cookies, RBAC, Zod validation and booking-conflict logic. Together they show range across two backend stacks rather than one repeated project pattern.`
  }

  if (hasAny(q, ['why should we select', 'why select', 'why hire', 'differentiate', 'different from other'])) {
    return `The strongest case for Siddharth is not that he already has one finished specialization; it is that he combines a 9.53 CGPA with actual build evidence across backend, AI and full-stack work. Vigil adds backend/API work plus team-lead and GitHub coordination experience, CampusSpace adds REST APIs and business-rule-heavy MERN backend work, and the portfolio itself shows that he can turn those experiences into a usable product. The main caveat is that he is still early in depth, which is exactly why his current focus on DSA and stronger backend fundamentals matters.`
  }

  if (hasAny(q, ['which project best shows backend', 'best backend', 'backend ability', 'backend knowledge'])) {
    return `Vigil is the strongest proof of backend breadth because Siddharth worked on backend/APIs in a system spanning FastAPI, PostgreSQL, Neo4j and data/NLP integrations. CampusSpace is the cleaner proof of backend fundamentals because its Express API has authentication, RBAC, validation, conflict rules and MongoDB-backed booking flows. If I were evaluating him, I would ask about both: Vigil for system integration and CampusSpace for business-rule correctness.`
  }

  if (hasAny(q, ['team lead', 'leadership', 'github coordination', 'managed github'])) {
    return `Siddharth says he served as team lead on Vigil while also contributing to backend and API development. His leadership contribution was practical rather than title-only: coordinating work through GitHub, managing repository workflow and helping keep integrations across team members connected. A good interview follow-up would be to ask him how he handled merge conflicts, task ownership or integration failures.`
  }

  if (hasAny(q, ['interview question', 'what should i ask', 'question him', 'test him'])) {
    return `I would test five things: 1) explain one Vigil API from request to database/graph response, 2) explain how CampusSpace detects overlapping bookings, 3) why use PostgreSQL and Neo4j together in Vigil, 4) how JWT + HTTP-only cookies and RBAC work in CampusSpace, and 5) describe one GitHub/integration problem he handled as team lead. These questions directly test the claims shown in his portfolio instead of asking generic theory.`
  }

  if (hasAny(q, ['weak', 'gap', 'limitation', 'concern'])) {
    return `The main gap is depth: Siddharth has useful range, but he is still a second-year student and is actively deciding where to specialize. His project evidence is stronger than his long-term production experience, and DSA is still something he is deliberately strengthening. For a student chapter, that is a manageable gap because there is already evidence that he builds, collaborates and can explain technical choices.`
  }

  if (q.includes('java')) return `Java is not listed as one of Siddharth’s current portfolio skills, so I would not claim that he knows it from the evidence available here.`
  if (q.includes('neo4j')) return `Yes. Vigil uses Neo4j for graph-oriented relationship data, alongside PostgreSQL for structured case records. The portfolio links to the project repository as evidence.`
  if (q.includes('mongodb')) return `Yes. CampusSpace AI uses MongoDB with Mongoose in its MERN backend, including resource, booking, user and notification-oriented data flows.`

  return mode === 'evaluate'
    ? `I can evaluate that only from Siddharth’s portfolio evidence. The strongest verified areas here are backend/API project work, full-stack exposure, applied AI projects, a 9.53 CGPA, and team-lead/GitHub coordination on Vigil. If you make the question more specific—project, skill, contribution, evidence or gap—I can give a sharper assessment.`
    : `I can answer that from Siddharth’s portfolio context, especially his projects, backend/API work, current learning, team experience and technical evidence. Try asking about a specific project or what he personally contributed.`
}

const instantAnswer = (question) => {
  const q = question.toLowerCase().trim()
  if (isGreeting(q)) return `Hey! I can separate Siddharth’s personal contribution from team work, compare projects, explain technical decisions, surface evidence, or evaluate where his profile is strong and weak.`
  if (isThanks(q)) return `You’re welcome. Keep going with a follow-up — I remember the recent conversation.`
  if (hasAny(q, ['what can you do', 'how can you help', 'help me', 'capabilities'])) return `I can discuss Siddharth’s portfolio naturally, explain what he personally contributed, compare projects by technical depth, challenge unsupported claims, show evidence, suggest interview questions and switch into a stricter evaluator mode.`
  if (q.includes('resume')) return `You can open Siddharth’s resume directly below.`
  if (q === 'github' || q.includes('github profile')) return `Siddharth’s GitHub is github.com/SiddharthDC786.`
  const contribution = contributionAnswer(q)
  if (contribution) return contribution
  return null
}

const getExtras = (question) => {
  const q = question.toLowerCase()
  const extras = {}
  if (q.includes('resume')) extras.resume = true
  if (hasAny(q, ['coding profile', 'leetcode', 'github', 'linkedin'])) extras.profiles = true
  if (hasAny(q, ['skill', 'technolog', 'learning right now', 'currently learning'])) extras.skills = true

  if (q.includes('vigil')) extras.projects = [profile.projects[0]]
  if (q.includes('campusspace')) extras.projects = [...(extras.projects || []), profile.projects[1]]
  if (q.includes('malaria') || q.includes('cnn')) extras.projects = [...(extras.projects || []), profile.projects[2]]

  if (q.includes('neo4j')) extras.evidence = profile.evidence.neo4j
  else if (q.includes('mongodb')) extras.evidence = profile.evidence.mongodb
  else if (hasAny(q, ['cnn', 'malaria', 'computer vision'])) extras.evidence = profile.evidence.cnn
  else if (q.includes('java')) extras.evidence = profile.evidence.java
  else if (hasAny(q, ['proof', 'source', 'verify', 'evidence', 'technical claims'])) extras.evidenceList = [profile.evidence.neo4j, profile.evidence.mongodb, profile.evidence.cnn]

  return extras
}

const followUpsFor = (question, mode) => {
  const q = question.toLowerCase()
  if (q.includes('vigil')) return ['What APIs/backend work did he do?', 'How did he lead the team?', 'Why use Neo4j?']
  if (q.includes('campusspace')) return ['What backend rules are important?', 'How is authentication handled?', 'Compare it with Vigil']
  if (q.includes('malaria') || q.includes('cnn')) return ['What was his contribution?', 'What tech stack was used?', 'Show the evidence']
  if (hasAny(q, ['skill', 'strength', 'technology'])) return ['Which project proves that?', 'What is he still weak at?', 'What is he learning now?']
  if (hasAny(q, ['weak', 'gap', 'limitation'])) return ['How is he improving that?', 'What would you test in an interview?', 'What is his strongest evidence?']
  return mode === 'evaluate'
    ? ['What evidence supports that?', 'What is the biggest concern?', 'What should I ask him next?']
    : ['Tell me more.', 'Which project shows that best?', 'What did he personally contribute?']
}

function ProjectResult({ project }) {
  return <div className="chat-project-card"><span>{project.tag}</span><strong>{project.title}</strong><p>{project.description}</p><div>{project.tech.slice(0, 4).map(tech => <b key={tech}>{tech}</b>)}</div><footer><a href={project.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href="#projects">Case study ↓</a></footer></div>
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
  const welcome = `Hi — I’m Siddharth’s evaluator-aware portfolio AI. Ask what he personally built, compare projects, test a technical claim, inspect evidence, or switch to Evaluate mode for a stricter assessment.`
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
    const historyForApi = messages.slice(-14).map(({ role, text }) => ({ role, text }))
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
    const timeoutId = setTimeout(() => controller.abort(), 14000)
    try {
      const response = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: clean, history: historyForApi, mode }),
        signal: controller.signal
      })
      if (!response.ok) throw new Error('AI unavailable')
      const data = await response.json()
      const reply = data.reply || reliableFallback(clean, mode)
      setMessages(prev => [...prev, { role: 'assistant', text: reply, extras: getExtras(clean) }])
      setFollowUps(followUpsFor(clean, mode))
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: reliableFallback(clean, mode), extras: getExtras(clean) }])
      setFollowUps(followUpsFor(clean, mode))
    } finally {
      clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  const suggestedPrompts = mode === 'evaluate' ? evaluatePrompts : explorePrompts

  return <section className="section ask-section" id="ask">
    <div className="ask-copy">
      <div className="section-kicker">08 / INTERACTIVE AI</div>
      <h2>Don’t just read the profile. <span>Interrogate it.</span></h2>
      <p>Ask what I personally contributed, compare projects by technical depth, challenge a claim, request proof, or switch into evaluator mode and make the assistant critique me.</p>

      <div className="chat-mode-switch" role="group" aria-label="AI conversation mode">
        <button className={mode === 'explore' ? 'active' : ''} onClick={() => setMode('explore')}><span>01</span><div><strong>Explore</strong><small>Natural project conversation</small></div></button>
        <button className={mode === 'evaluate' ? 'active' : ''} onClick={() => setMode('evaluate')}><span>02</span><div><strong>Evaluate</strong><small>Critical + evidence-focused</small></div></button>
      </div>

      {mode === 'evaluate' && <div className="evaluator-mode"><div className="evaluator-mode-head"><span>◆</span><div><strong>Evaluator shortcuts</strong><small>Contribution, evidence, comparisons and interview pressure-tests</small></div></div><div className="evaluator-action-grid evaluator-action-grid-strong">{evaluatorActions.map(item => <button key={item.label} onClick={() => ask(item.prompt)}>{item.label}<span>↗</span></button>)}</div></div>}

      <button className={`challenge-toggle ${challengeOpen ? 'active' : ''}`} onClick={() => setChallengeOpen(v => !v)}><span>⚡</span><div><strong>Stress-test the profile</strong><small>Ask things that expose exaggeration or shallow understanding.</small></div><b>{challengeOpen ? '−' : '+'}</b></button>
      {challengeOpen && <div className="challenge-list">{challengePrompts.map(prompt => <button key={prompt} onClick={() => ask(prompt)}>{prompt} ↗</button>)}</div>}
    </div>

    <div className="chat-card evaluator-chat-card">
      <div className="chat-header"><div><span className="ai-orb">✦</span><strong>Siddharth AI</strong><em>{mode === 'evaluate' ? 'Evaluator mode' : 'Explore mode'}</em></div><div className="chat-header-actions"><span className="online"><i /> grounded AI</span><button type="button" onClick={resetChat}>Clear</button></div></div>
      <div className="chat-messages" ref={messagesRef} aria-live="polite">
        {messages.map((msg, index) => <div className={`message-wrap ${msg.role}`} key={`${msg.role}-${index}`}><div className={`message ${msg.role}`}><span>{msg.text}</span></div>{msg.role === 'assistant' && <MessageExtras extras={msg.extras} />}</div>)}
        {loading && <div className="message assistant typing"><i /><i /><i /><span>Checking portfolio context and evidence…</span></div>}
      </div>
      {followUps.length > 0 && <div className="follow-up-row"><span>Probe deeper:</span><div>{followUps.map(prompt => <button key={prompt} onClick={() => ask(prompt)}>{prompt}</button>)}</div></div>}
      <div className="suggestions">{suggestedPrompts.map(prompt => <button onClick={() => ask(prompt)} key={prompt}>{prompt}</button>)}</div>
      <form className="chat-input" onSubmit={e => { e.preventDefault(); ask(input) }}><label className="sr-only" htmlFor="portfolio-question">Ask anything about Siddharth</label><input id="portfolio-question" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about contribution, architecture, evidence, gaps…" autoComplete="off" /><button type="submit" aria-label="Send question" disabled={loading}>↗</button></form>
    </div>
  </section>
}
