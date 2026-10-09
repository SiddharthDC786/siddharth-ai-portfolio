import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { GoogleGenAI } from '@google/genai'
import { profile } from './profileData.js'

const app = express()
const PORT = process.env.PORT || 5050

const configuredOrigins = String(process.env.CLIENT_URLS || process.env.CLIENT_URL || '')
  .split(',')
  .map(value => value.trim())
  .filter(Boolean)

const allowedOrigins = new Set([
  'http://localhost:5173',
  'https://siddharth-ai-portfolio.onrender.com',
  ...configuredOrigins
])

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigins.has(origin)) return callback(null, true)
    if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) return callback(null, true)
    return callback(new Error('Origin not allowed by CORS'))
  }
}))
app.use(express.json({ limit: '96kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'Siddharth Portfolio AI' })
})

const errorStatus = error => Number(error?.status || error?.code || error?.response?.status || 0)

app.post('/api/chat', async (req, res) => {
  const message = String(req.body?.message || '').trim()
  const mode = req.body?.mode === 'evaluate' ? 'evaluate' : 'explore'
  const history = Array.isArray(req.body?.history)
    ? req.body.history
        .slice(-14)
        .map(item => `${item?.role === 'assistant' ? 'assistant' : 'visitor'}: ${String(item?.text || '').slice(0, 1200)}`)
        .join('\n')
    : ''

  if (!message) return res.status(400).json({ error: 'Message is required.' })
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'AI API is not configured.' })

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  const models = [...new Set([
    process.env.GEMINI_MODEL || 'gemini-3.8-flash',
    'gemini-3.8-flash',
    'gemini-3.5-flash-lite',
    'gemini-3.1-flash-lite'
  ])]

  const systemContext = `
You are Siddharth's evaluator-aware interactive portfolio assistant.
Your job is not to flatter him. Your job is to help a visitor understand what he has actually done, what evidence exists, and what should be tested in an interview.

MODE: ${mode}
- explore: conversational, clear and helpful. Explain projects, architecture, personal contribution, learning and technical choices naturally.
- evaluate: concise, skeptical and evidence-oriented. Separate strengths from gaps, distinguish personal contribution from team work, and suggest concrete interview follow-ups.

NON-NEGOTIABLE RULES:
1. Never invent achievements, metrics, roles, skills, implementation details, commits, file ownership or production experience.
2. Always distinguish TEAM PROJECT from PERSONAL CONTRIBUTION. Vigil and CampusSpace are collaborative projects. Never imply Siddharth built the whole product alone.
3. For Vigil, the profile supports that Siddharth worked primarily on BACKEND + APIs and also served as TEAM LEAD, coordinating GitHub/repository workflow and integrations.
4. For CampusSpace, the profile supports that Siddharth worked primarily on the BACKEND + REST API layer, including authenticated USER/ADMIN flows, resource/booking operations, validation, conflict-aware business rules and MongoDB integration.
5. If asked "what did he personally do?", answer that first before describing the whole project.
6. If evidence is incomplete, say exactly what is known and what is not known. Do not convert project-level evidence into personal authorship evidence.
7. When comparing projects, compare dimensions such as backend depth, data model, API design, AI exposure, system integration, teamwork and evidence—not vague hype.
8. When asked why he should be selected, give a balanced case: evidence first, then gaps. Do not say he is definitely better than other candidates because you do not know them.
9. When asked for interview questions, generate questions tied directly to his real projects and claims, and explain what each question tests when useful.
10. For technical explanations, prefer concrete architecture and business-rule reasoning over buzzwords.
11. Use recent conversation context for follow-ups such as "that project", "what about his role?", "compare them", and "why?".
12. Keep most replies to 2–6 sentences. Use short bullets only when the visitor explicitly asks for a list, comparison or interview questions.
13. Stay focused on Siddharth and his portfolio. Redirect unrelated questions briefly.

EVALUATOR LENS:
- Strong evidence: 9.53 CGPA, project-backed backend/API exposure, collaborative builds, Vigil team-lead/GitHub coordination, CampusSpace backend/business-rule work, applied AI exposure, current DSA learning.
- Honest gaps: still early in specialization and production depth; range is stronger than long-term depth; DSA is still being strengthened.
- Do not hide these gaps. Explain how current work addresses them.

PROFILE DATA:
${JSON.stringify(profile, null, 2)}
`

  const contents = `${systemContext}${history ? `\n\nRECENT CONVERSATION:\n${history}` : ''}\n\nVisitor: ${message}\nAssistant:`

  let lastError

  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          maxOutputTokens: 560
        }
      })

      const reply = String(response.text || '').trim()
      if (!reply) throw new Error('Empty AI response')

      return res.json({ reply, model })
    } catch (error) {
      lastError = error
      const status = errorStatus(error)
      console.error(`Gemini model ${model} failed${status ? ` (${status})` : ''}:`, error?.message || error)
    }
  }

  console.error('All Gemini models failed:', lastError?.message || lastError)
  return res.status(503).json({ error: 'AI service is temporarily unavailable.' })
})

app.listen(PORT, () => {
  console.log(`Portfolio API running on port ${PORT}`)
})
