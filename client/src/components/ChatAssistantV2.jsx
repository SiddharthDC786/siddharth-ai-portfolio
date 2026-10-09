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
  'Tell me about Siddharth.',
  'What exactly did Siddharth do in Vigil?',
  'Which project best proves backend ability?',
  'What is he learning right now?'
]

const evaluatePrompts = [
  'Why should we select Siddharth?',
  'Compare Vigil and CampusSpace AI.',
  'What should I question him about?',
  'Where is his profile still weak?'
]

const interviewPrompts = [
  'Interview me on Vigil.',
  'Interview me on CampusSpace AI.',
  'Test my backend fundamentals from my projects.',
  'Ask me one difficult project question.'
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
const normalize = value => value.toLowerCase().trim().replace(/\s+/g, ' ')
const isGreeting = q => /^(hi+|hello+|hey+|heyy+|yo+|sup|good morning|good evening|good afternoon)[!?. ]*$/.test(q)
const isThanks = q => /^(thanks|thank you|thankyou|thx|ty|cool|nice)[!?. ]*$/.test(q)

const contributionAnswer = q => {
  if (q.includes('vigil') && hasAny(q, ['contribution', 'personally', 'work on', 'worked on', 'own', 'role', 'team lead', 'build'])) {
    return `In Vigil, Siddharth’s main contribution was backend and API work, and he also served as team lead. He coordinated the team through GitHub, managed repository workflow and integrations, and helped connect structured case data and API endpoints with the graph/NLP-oriented parts of the system. Vigil is a team project, so I would not claim he built the whole product alone.`
  }
  if (q.includes('campusspace') && hasAny(q, ['contribution', 'personally', 'work on', 'worked on', 'own', 'role', 'backend', 'api', 'build'])) {
    return `For CampusSpace AI, Siddharth worked primarily on the backend and REST API layer: authenticated USER/ADMIN flows, resource and booking operations, validation, conflict-aware booking rules and MongoDB integration. It is collaborative, but the backend/API side is the part he can explain most directly.`
  }
  return null
}

const basicAnswer = question => {
  const q = normalize(question)
  if (isGreeting(q)) return `Hey! 👋 I’m Siddharth’s portfolio AI. You can chat normally with me, ask about his projects or skills, or make me evaluate and interview-test his profile.`
  if (isThanks(q)) return `Glad to help. You can keep the conversation going — I remember the recent context.`
  if (/^(how are you|how r u|how're you)[!?. ]*$/.test(q)) return `I’m doing well — ready to talk about Siddharth or answer a quick general question. What do you want to know?`
  if (hasAny(q, ['who are you', 'what are you'])) return `I’m the AI assistant inside DC Siddharth’s portfolio. I’m designed to answer normal questions, explain his work, separate personal contribution from team work, and help evaluators test his technical claims.`
  if (hasAny(q, ['who is siddharth', 'tell me about siddharth', 'introduce siddharth'])) return `DC Siddharth is a second-year B.Tech AIML student at VNRVJIET with a 9.53 CGPA. He is currently building across backend/full-stack, DSA in C++, and applied AI before choosing a deeper specialization.`
  if (hasAny(q, ['cgpa', 'gpa', 'grade'])) return `Siddharth’s current portfolio lists a CGPA of 9.53.`
  if (hasAny(q, ['college', 'where does he study', 'university'])) return `He studies B.Tech Artificial Intelligence & Machine Learning at VNRVJIET in Hyderabad.`
  if (hasAny(q, ['what year', 'which year', 'year is he'])) return `He is currently in his second year of B.Tech AIML.`
  if (hasAny(q, ['favorite project', 'favourite project'])) return `Vigil / investigation-ai is the project he says he connected with most because it combines backend APIs, structured data, graph relationships and AI-oriented workflows.`
  if (hasAny(q, ['what can you do', 'how can you help', 'help me', 'capabilities'])) return `I can chat normally, explain Siddharth’s profile, compare projects, show what he personally contributed, surface evidence, critique gaps, or run a project-specific technical interview.`
  if (q.includes('resume')) return `You can open Siddharth’s resume directly below.`
  if (q === 'github' || q.includes('github profile')) return `Siddharth’s GitHub is github.com/SiddharthDC786.`
  return contributionAnswer(q)
}

const reliableFallback = (question, mode = 'explore') => {
  const q = normalize(question)
  const basic = basicAnswer(q)
  if (basic) return basic
  if (hasAny(q, ['compare vigil', 'vigil and campusspace', 'campusspace and vigil'])) return `Vigil proves more about Python/backend integration, structured data, graph systems and team leadership. CampusSpace proves more about conventional backend correctness: Express APIs, MongoDB/Mongoose, authentication, RBAC, validation and booking-conflict rules. Together they show backend range across two different stacks.`
  if (hasAny(q, ['why should we select', 'why select', 'why hire', 'differentiate', 'different from other'])) return `The strongest case is the combination of a 9.53 CGPA with actual build evidence: backend/API work, applied AI projects, full-stack exposure and team-lead/GitHub coordination on Vigil. The honest gap is depth — he is still early in specialization — but he already has enough project evidence to show that he builds, collaborates and can explain technical choices.`
  if (hasAny(q, ['best backend', 'backend ability', 'backend knowledge'])) return `Vigil is the strongest proof of backend breadth; CampusSpace is the cleaner proof of backend fundamentals and business rules. I would use both in an interview: Vigil for system integration, CampusSpace for auth, validation and booking correctness.`
  if (hasAny(q, ['team lead', 'leadership', 'github coordination', 'managed github'])) return `On Vigil, Siddharth says he served as team lead while contributing to backend and APIs. His leadership work included GitHub/repository coordination and helping keep integrations across the team connected.`
  if (hasAny(q, ['interview question', 'what should i ask', 'question him', 'test him'])) return `I would ask about one Vigil API end-to-end, CampusSpace booking-conflict logic, why PostgreSQL and Neo4j serve different roles, JWT + HTTP-only cookies + RBAC, and one GitHub integration problem he handled as team lead.`
  if (hasAny(q, ['weak', 'gap', 'limitation', 'concern'])) return `The main gap is depth: his range is currently stronger than long-term specialization or production experience. DSA is also still being strengthened. Those are fair areas to test rather than hide.`
  if (q.includes('java')) return `Java is not listed as one of Siddharth’s current portfolio skills, so I would not claim it from the evidence here.`
  if (q.includes('neo4j')) return `Yes. Vigil uses Neo4j for graph-oriented relationship data alongside PostgreSQL for structured case records.`
  if (q.includes('mongodb')) return `Yes. CampusSpace AI uses MongoDB with Mongoose in its MERN backend.`
  if (mode === 'interview') return `Let’s keep this as a technical interview. Answer the last project question in your own words, and I’ll challenge the reasoning or ask the next question.`
  if (mode === 'evaluate') return `I don’t have enough portfolio evidence to make a strong claim about that. Ask me about a specific project, contribution, skill, proof point or gap and I’ll evaluate it directly.`
  return `I don’t have enough portfolio-specific evidence for a confident answer to that. I can still handle simple general questions, or you can ask about Siddharth’s projects, skills, college, CGPA, contribution or current learning.`
}

const getExtras = question => {
  const q = normalize(question)
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
  const q = normalize(question)
  if (mode === 'interview') return ['Give me a harder one.', 'Why is that answer important?', 'Switch project.']
  if (q.includes('vigil')) return ['What APIs/backend work did he do?', 'How did he lead the team?', 'Interview me on Vigil']
  if (q.includes('campusspace')) return ['What backend rules are important?', 'How is authentication handled?', 'Interview me on CampusSpace']
  if (q.includes('malaria') || q.includes('cnn')) return ['What was his contribution?', 'What tech stack was used?', 'Show the evidence']
  if (hasAny(q, ['skill', 'strength', 'technology'])) return ['Which project proves that?', 'What is he still weak at?', 'What is he learning now?']
  return mode === 'evaluate' ? ['What evidence supports that?', 'What is the biggest concern?', 'What should I ask him next?'] : ['Tell me more.', 'Which project shows that best?', 'What did he personally contribute?']
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
  const welcome = `Hi — I’m Siddharth’s portfolio AI. Chat normally, ask about his work, switch to Evaluate for a stricter review, or use Interview mode to pressure-test a project.`
  const [messages, setMessages] = useState([{ role: 'assistant', text: welcome }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [challengeOpen, setChallengeOpen] = useState(false)
  const [mode, setMode] = useState('explore')
  const [followUps, setFollowUps] = useState([])
  const messagesRef = useRef(null)
  const apiBase = useMemo(() => import.meta.env.VITE_API_URL || 'http://localhost:5050', [])

  const askRef = useRef(null)
  askRef.current = async (question, requestedMode = mode) => {
    const clean = question.trim()
    if (!clean || loading) return
    const activeMode = requestedMode || mode
    const historyForApi = messages.slice(-14).map(({ role, text }) => ({ role, text }))
    setMessages(prev => [...prev, { role: 'user', text: clean }])
    setInput('')
    setFollowUps([])
    const quick = basicAnswer(clean)
    if (quick) {
      setMessages(prev => [...prev, { role: 'assistant', text: quick, extras: getExtras(clean) }])
      setFollowUps(followUpsFor(clean, activeMode))
      return
    }
    setLoading(true)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 14000)
    try {
      const response = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: clean, history: historyForApi, mode: activeMode }),
        signal: controller.signal
      })
      if (!response.ok) throw new Error('AI unavailable')
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply || reliableFallback(clean, activeMode), extras: getExtras(clean) }])
      setFollowUps(followUpsFor(clean, activeMode))
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: reliableFallback(clean, activeMode), extras: getExtras(clean) }])
      setFollowUps(followUpsFor(clean, activeMode))
    } finally {
      clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  const ask = (question, requestedMode) => askRef.current?.(question, requestedMode)

  useEffect(() => {
    const handler = event => {
      const prompt = event.detail?.prompt
      const nextMode = event.detail?.mode
      if (['explore', 'evaluate', 'interview'].includes(nextMode)) setMode(nextMode)
      if (prompt) window.setTimeout(() => askRef.current?.(prompt, nextMode || mode), 60)
    }
    window.addEventListener('portfolio-ai-question', handler)
    return () => window.removeEventListener('portfolio-ai-question', handler)
  }, [mode])

  useEffect(() => {
    const box = messagesRef.current
    if (box) box.scrollTo({ top: box.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const resetChat = () => {
    setMessages([{ role: 'assistant', text: welcome }])
    setFollowUps([])
    setInput('')
  }

  const suggestedPrompts = mode === 'evaluate' ? evaluatePrompts : mode === 'interview' ? interviewPrompts : explorePrompts

  return <section className="section ask-section" id="ask">
    <div className="ask-copy">
      <div className="section-kicker">08 / INTERACTIVE AI</div>
      <h2>Don’t just read the profile. <span>Interrogate it.</span></h2>
      <p>Chat normally, inspect what I personally contributed, compare projects, challenge a claim, request proof, or make the assistant run a technical interview.</p>
      <div className="chat-mode-switch three-mode" role="group" aria-label="AI conversation mode">
        <button className={mode === 'explore' ? 'active' : ''} onClick={() => setMode('explore')}><span>01</span><div><strong>Explore</strong><small>Natural conversation</small></div></button>
        <button className={mode === 'evaluate' ? 'active' : ''} onClick={() => setMode('evaluate')}><span>02</span><div><strong>Evaluate</strong><small>Critical + evidence-first</small></div></button>
        <button className={mode === 'interview' ? 'active' : ''} onClick={() => setMode('interview')}><span>03</span><div><strong>Interview</strong><small>One technical question at a time</small></div></button>
      </div>
      {mode === 'evaluate' && <div className="evaluator-mode"><div className="evaluator-mode-head"><span>◆</span><div><strong>Evaluator shortcuts</strong><small>Contribution, evidence, comparisons and interview pressure-tests</small></div></div><div className="evaluator-action-grid evaluator-action-grid-strong">{evaluatorActions.map(item => <button key={item.label} onClick={() => ask(item.prompt)}>{item.label}<span>↗</span></button>)}</div></div>}
      {mode === 'interview' && <div className="interview-mode-banner"><span>● LIVE INTERVIEW MODE</span><strong>Answer in your own words.</strong><p>The AI asks one project-grounded technical question at a time and challenges shallow answers.</p></div>}
      <button className={`challenge-toggle ${challengeOpen ? 'active' : ''}`} onClick={() => setChallengeOpen(v => !v)}><span>⚡</span><div><strong>Stress-test the profile</strong><small>Ask things that expose exaggeration or shallow understanding.</small></div><b>{challengeOpen ? '−' : '+'}</b></button>
      {challengeOpen && <div className="challenge-list">{challengePrompts.map(prompt => <button key={prompt} onClick={() => ask(prompt)}>{prompt} ↗</button>)}</div>}
    </div>

    <div className="chat-card evaluator-chat-card">
      <div className="chat-header"><div><span className="ai-orb">✦</span><strong>Siddharth AI</strong><em>{mode === 'evaluate' ? 'Evaluator mode' : mode === 'interview' ? 'Interview mode' : 'Explore mode'}</em></div><div className="chat-header-actions"><span className="online"><i /> grounded AI</span><button type="button" onClick={resetChat}>Clear</button></div></div>
      <div className="chat-messages" ref={messagesRef} aria-live="polite">
        {messages.map((msg, index) => <div className={`message-wrap ${msg.role}`} key={`${msg.role}-${index}`}><div className={`message ${msg.role}`}><span>{msg.text}</span></div>{msg.role === 'assistant' && <MessageExtras extras={msg.extras} />}</div>)}
        {loading && <div className="message assistant typing"><i /><i /><i /><span>{mode === 'interview' ? 'Preparing the next technical question…' : 'Checking portfolio context and evidence…'}</span></div>}
      </div>
      {followUps.length > 0 && <div className="follow-up-row"><span>{mode === 'interview' ? 'Interview controls:' : 'Probe deeper:'}</span><div>{followUps.map(prompt => <button key={prompt} onClick={() => ask(prompt)}>{prompt}</button>)}</div></div>}
      <div className="suggestions">{suggestedPrompts.map(prompt => <button onClick={() => ask(prompt)} key={prompt}>{prompt}</button>)}</div>
      <form className="chat-input" onSubmit={e => { e.preventDefault(); ask(input) }}><label className="sr-only" htmlFor="portfolio-question">Ask anything about Siddharth</label><input id="portfolio-question" value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'interview' ? 'Answer the question or ask for another…' : 'Say hi, ask a basic question, or inspect the portfolio…'} autoComplete="off" /><button type="submit" aria-label="Send question" disabled={loading}>↗</button></form>
    </div>
  </section>
}
