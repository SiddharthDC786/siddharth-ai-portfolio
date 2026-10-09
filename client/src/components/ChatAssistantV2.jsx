import { useMemo, useState } from 'react'
import { profile } from '../data/profileData'

const evaluatorActions = [
  { label: '30-sec candidate brief', prompt: 'Give me a 30 second evaluator brief on Siddharth.' },
  { label: 'Why is he different?', prompt: 'What actually differentiates Siddharth from other candidates?' },
  { label: 'Verify technical claims', prompt: 'Show me proof for Siddharth’s technical claims.' },
  { label: 'Honest gap check', prompt: 'What are the biggest gaps in Siddharth’s current profile?' }
]

const starterPrompts = [
  'What project did Siddharth enjoy most?',
  'What are his strongest technical areas?',
  'What did he learn from Vigil?',
  'Why should we select Siddharth?'
]

const challengePrompts = [
  'Does Siddharth know Java?',
  'Which project involved MongoDB?',
  'Has he worked with Neo4j?',
  'Show proof for his CNN work',
  'What is he still figuring out?',
  'What would you question him about in an interview?'
]

const hasAny = (q, terms) => terms.some(term => q.includes(term))
const isGreeting = q => /^(hi|hello|hey|heyy+|hii+|yo|good morning|good evening|good afternoon)[!. ]*$/.test(q)
const isThanks = q => /^(thanks|thank you|thankyou|thx|ty)[!. ]*$/.test(q)

const localAnswer = (question) => {
  const q = question.toLowerCase().trim()

  if (isGreeting(q)) {
    return `Hey! I’m Siddharth’s portfolio evaluator assistant. I can give you a quick candidate brief, explain what differentiates him, verify selected technical claims from his projects, show his resume or profiles, and point out gaps instead of pretending he knows everything.`
  }

  if (isThanks(q)) {
    return `You’re welcome. If you’re evaluating him, try “What actually differentiates Siddharth?” or “Show proof for his technical claims.”`
  }

  if (hasAny(q, ['what can you do', 'help me', 'how can you help', 'capabilities'])) {
    return `I’m designed for evaluation, not just small talk. I can summarize Siddharth in 30 seconds, explain his projects and learning choices, verify selected claims with GitHub evidence, surface his resume and profiles, answer follow-ups, and explicitly say when something is not supported by his portfolio.`
  }

  if (hasAny(q, ['30 second', '30-second', 'quick brief', 'candidate brief', 'summarize siddharth', 'summary of siddharth'])) {
    return `DC Siddharth is a second-year AIML student at VNRVJIET building breadth before choosing a specialization. His current evidence includes MERN training, C++/DSA practice, Vigil — an AI/graph investigation project, a collaborative MERN booking system, CNN-based malaria work, and this portfolio assistant. His strongest signal is not expert depth yet; it is that he learns by building, can explain why tools were used, and is honest about what he has not learned.`
  }

  if (hasAny(q, ['differentiate', 'different', 'stand out', 'unique', 'why him over', 'other candidates'])) {
    return `The differentiator is not simply “he has a chatbot” — many candidates can add one. The stronger differentiator is that this assistant is built as an evaluator tool: it can verify selected claims, expose project evidence, answer follow-ups, admit missing skills, surface gaps, and connect questions back to real work. Siddharth’s profile also shows deliberate exploration across full-stack, AI/data and DSA instead of pretending to have already mastered one field.`
  }

  if (hasAny(q, ['gap check', 'biggest gaps', 'weakness', 'weaknesses', 'limitation', 'limitations', 'what is missing', 'still figuring out'])) {
    return `The biggest gap is depth. Siddharth has explored several areas, but he is still building stronger specialization and more consistent DSA depth. He also does not claim every common skill — for example, Java is not currently listed. This portfolio is meant to show evidence and learning direction, not inflate the profile.`
  }

  if (hasAny(q, ['interview question', 'question him', 'ask him in an interview', 'challenge him'])) {
    return `I would ask him: why Neo4j made sense for Vigil, what he personally contributed in team projects, and what technical area he would choose to go deeper in if he had six months. Those questions test understanding rather than memorized stack names.`
  }

  if (hasAny(q, ['street cause', 'beyond coding', 'outside coding', 'community', 'club', 'extracurricular'])) {
    return `Beyond technical work, Siddharth is part of Street Cause at VNRVJIET. He values it as a space to work with people, contribute to community-focused initiatives and build teamwork outside software projects.`
  }

  if (hasAny(q, ['favorite project', 'favourite project', 'enjoyed most', 'liked most', 'most interesting project'])) {
    return `The project Siddharth enjoyed most is Vigil / investigation-ai. It stood out because it connects AI, graph relationships, backend APIs, structured data and an investigation-style interface in one system.`
  }

  if (q.includes('vigil') && hasAny(q, ['learn', 'takeaway', 'why', 'experience'])) {
    return `Vigil taught Siddharth how several layers connect in a real system: data cleaning, APIs, graph relationships, NLP concepts and a usable interface. It also made graph thinking feel concrete because relationships matter as much as individual records.`
  }

  if (hasAny(q, ['mern', 'training', 'learning right now', 'currently learning', 'learning now', 'studying now'])) {
    return `Siddharth is currently undergoing MERN Stack training through VNRVJIET, covering React, Node.js, Express and MongoDB. Alongside that, he is strengthening C++ and DSA and exploring AI engineering, data engineering and backend-oriented systems through projects.`
  }

  if (hasAny(q, ['strongest technical', 'technical strength', 'best skill', 'strongest skill', 'good at'])) {
    return `His strongest evidence today is breadth with hands-on project exposure: React/MERN on the full-stack side, C++ and DSA for problem solving, and project experience around FastAPI, PostgreSQL, MongoDB, TensorFlow/Keras, Neo4j and NLP/graph concepts. He is still deciding where to specialize rather than claiming expert depth everywhere.`
  }

  if (hasAny(q, ['about siddharth', 'who is siddharth', 'tell me about', 'introduce siddharth'])) {
    return `Siddharth is a second-year AIML student at VNRVJIET. He is deliberately using full-stack, DSA and AI/ML projects to understand what he enjoys before locking himself into one specialization. Beyond coding, he is also part of Street Cause at VNRVJIET.`
  }

  if (q.includes('learn') && hasAny(q, ['how', 'style', 'approach', 'new technology'])) {
    return `Siddharth learns best by building. His loop is: learn → build → break → improve → explain. He tries to understand why a technology is being used, not only the syntax needed to make it work.`
  }

  if (q.includes('java')) {
    return `Java is not listed in Siddharth’s current portfolio skills. I would rather say that clearly than invent a skill that is not supported by his profile.`
  }

  if (q.includes('neo4j')) {
    return `Vigil / investigation-ai is the project that uses Neo4j for graph-oriented relationship data. The repository evidence in this portfolio points to that project.`
  }

  if (q.includes('mongodb')) {
    return `CampusSpace AI uses MongoDB with Mongoose as part of its MERN backend, alongside Node.js and Express.`
  }

  if (hasAny(q, ['cnn', 'malaria', 'computer vision'])) {
    return `Siddharth’s Malaria Detection System uses TensorFlow/Keras CNN workflows. His documented contribution includes the Streamlit frontend, CNN integration and preprocessing/prediction flow.`
  }

  if (hasAny(q, ['teamwork', 'team project', 'collaboration', 'collaborative'])) {
    return `Siddharth has worked in collaborative settings, especially on Vigil and CampusSpace AI. The portfolio intentionally labels those as team/collaborative projects rather than presenting them as solo work. Street Cause adds a non-technical teamwork dimension.`
  }

  if (hasAny(q, ['backend', 'api', 'server'])) {
    return `His backend exposure includes Node.js + Express through MERN work and FastAPI through Vigil. He has also worked around MongoDB and PostgreSQL, so he has seen both document-oriented and relational data flows in projects.`
  }

  if (hasAny(q, ['ai', 'machine learning', 'ml', 'data engineering', 'data systems'])) {
    return `His AI/data exposure comes mainly from projects rather than a claimed specialization: CNN-based malaria detection, NLP/entity-resolution and graph concepts in Vigil, plus PostgreSQL/Neo4j-backed data work.`
  }

  if (hasAny(q, ['proof', 'source', 'verify', 'evidence', 'technical claims'])) {
    return `I can verify selected technical claims with repository evidence. The strongest examples here are Neo4j in Vigil, MongoDB in CampusSpace AI, and CNN/TensorFlow work in the malaria project.`
  }

  if (q.includes('resume')) return `You can open Siddharth’s resume directly below. It is also available from the navigation bar and Profiles section.`

  if (hasAny(q, ['projects', 'project work', 'what has he built', 'what did he build'])) {
    return `Siddharth highlights four main builds: Vigil / investigation-ai, CampusSpace AI, the Malaria Detection System and this AI Portfolio Assistant. Vigil is the one he enjoyed most because it combined AI, graph data, backend APIs and product thinking in one system.`
  }

  if (hasAny(q, ['skills', 'skillset', 'technologies', 'tech stack', 'tools'])) {
    return `His current toolkit includes React, Vite, MERN, C, C++, Python and DSA. Through projects he has also worked with or around FastAPI, PostgreSQL, MongoDB, TensorFlow/Keras, Streamlit, Neo4j, NLP concepts and graph analytics.`
  }

  if (hasAny(q, ['select', 'why him', 'why siddharth', 'hire', 'choose him', 'choose siddharth'])) {
    return `Siddharth’s strongest case is that he is actively converting learning into projects. He is in VNRVJIET MERN Stack training, strengthening C++ and DSA, and has worked across graph-based AI, a collaborative MERN system, computer vision and this evaluator-oriented portfolio assistant. He also presents limitations honestly instead of padding the profile.`
  }

  if (hasAny(q, ['leetcode', 'coding profile', 'dsa practice'])) return `Siddharth practices DSA on LeetCode while strengthening his C++ fundamentals.`
  if (q.includes('github')) return `Siddharth’s GitHub is github.com/SiddharthDC786.`

  if (hasAny(q, ['goal', 'career', 'future', 'where does he want to go'])) {
    return `He wants to build a strong technical base during college, earn a strong engineering role and choose a specialization from real experience. Right now he is especially exploring AI engineering, data engineering and backend/full-stack systems.`
  }

  return null
}

const getExtras = (question) => {
  const q = question.toLowerCase()
  const extras = {}

  if (q.includes('resume')) extras.resume = true
  if ((q.includes('project') || q.includes('built')) && !q.includes('which project')) extras.projects = profile.projects
  if (hasAny(q, ['coding profile', 'leetcode', 'github', 'linkedin'])) extras.profiles = true
  if (hasAny(q, ['skill', 'technolog', 'learning right now', 'currently learning', 'strongest technical'])) extras.skills = true

  if (hasAny(q, ['favorite project', 'favourite project', 'enjoyed most', 'liked most']) || (q.includes('vigil') && q.includes('learn'))) {
    extras.projects = [profile.projects[0]]
  } else if (q.includes('neo4j')) {
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
      {extras.projects?.length > 0 && <div className="chat-result-stack">{extras.projects.map(project => <ProjectResult project={project} key={project.title} />)}</div>}
      {extras.skills && (
        <div className="chat-skills-card">
          {Object.entries(profile.skills).slice(0, 6).map(([group, items]) => <div key={group}><span>{group}</span><p>{items.join(' · ')}</p></div>)}
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

export default function ChatAssistantV2() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `Hi — I’m not just a portfolio chatbot. I’m built to help evaluate Siddharth. Ask me for a 30-second brief, proof behind a technical claim, his strongest project, or even where his profile is still weak.` }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [challengeOpen, setChallengeOpen] = useState(false)
  const apiBase = useMemo(() => import.meta.env.VITE_API_URL || 'http://localhost:5050', [])

  const ask = async (question) => {
    const clean = question.trim()
    if (!clean || loading) return

    const historyForApi = messages.slice(-8).map(({ role, text }) => ({ role, text }))
    setMessages(prev => [...prev, { role: 'user', text: clean }])
    setInput('')

    const instantReply = localAnswer(clean)
    if (instantReply) {
      setMessages(prev => [...prev, { role: 'assistant', text: instantReply, extras: getExtras(clean) }])
      return
    }

    setLoading(true)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 7000)

    try {
      const response = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: clean, history: historyForApi }),
        signal: controller.signal
      })
      if (!response.ok) throw new Error('API unavailable')
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply || 'I could not generate a detailed answer right now.', extras: getExtras(clean) }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: `I could not reach the AI service quickly enough. I can still instantly answer evaluator questions about Siddharth’s projects, technical evidence, skills, current learning, profile gaps, resume and profiles.`, extras: getExtras(clean) }])
    } finally {
      clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  return (
    <section className="section ask-section" id="ask">
      <div className="ask-copy">
        <div className="section-kicker">08 / EVALUATOR ASSISTANT</div>
        <h2>Don’t just ask what I know. <span>Test the evidence.</span></h2>
        <p>This assistant is designed around the questions a selector would actually ask: what differentiates me, what I built, what I personally learned, what can be verified, and where I still need to improve.</p>

        <div className="evaluator-mode">
          <div className="evaluator-mode-head"><span>◆</span><div><strong>Evaluator Mode</strong><small>Four useful ways to inspect my profile</small></div></div>
          <div className="evaluator-action-grid">
            {evaluatorActions.map(item => <button key={item.label} onClick={() => ask(item.prompt)}>{item.label}<span>↗</span></button>)}
          </div>
        </div>

        <button className={`challenge-toggle ${challengeOpen ? 'active' : ''}`} onClick={() => setChallengeOpen(v => !v)}>
          <span>⚡</span><div><strong>Stress-test the assistant</strong><small>Ask things the portfolio cannot fake.</small></div><b>{challengeOpen ? '−' : '+'}</b>
        </button>
        {challengeOpen && <div className="challenge-list">{challengePrompts.map(prompt => <button key={prompt} onClick={() => ask(prompt)}>{prompt} ↗</button>)}</div>}
      </div>

      <div className="chat-card evaluator-chat-card">
        <div className="chat-header">
          <div><span className="ai-orb">✦</span><strong>Siddharth Evaluator AI</strong></div>
          <span className="online"><i /> evidence-aware</span>
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
          {starterPrompts.map(prompt => <button onClick={() => ask(prompt)} key={prompt}>{prompt}</button>)}
        </div>

        <form className="chat-input" onSubmit={(e) => { e.preventDefault(); ask(input) }}>
          <label className="sr-only" htmlFor="portfolio-question">Ask a question about Siddharth</label>
          <input id="portfolio-question" value={input} onChange={e => setInput(e.target.value)} placeholder="Try ‘hello’, ‘why is he different?’, or ask anything..." autoComplete="off" />
          <button type="submit" aria-label="Send question">↗</button>
        </form>
      </div>
    </section>
  )
}
