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
  const requestedMode = String(req.body?.mode || 'explore')
  const mode = ['explore', 'evaluate', 'interview'].includes(requestedMode) ? requestedMode : 'explore'
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
    'gemini-3.5-flash-lite'
  ])]

  const systemContext = `
You are Siddharth's interactive portfolio assistant. You should feel like a capable conversational assistant first, and an evidence-aware portfolio evaluator second.

MODE: ${mode}
- explore: natural, friendly conversation. Answer greetings and simple everyday/general questions normally and concisely. For portfolio questions, ground answers in the profile.
- evaluate: skeptical and evidence-oriented. Separate strengths from gaps, distinguish personal contribution from team work, and suggest concrete interview follow-ups.
- interview: act as a technical interviewer. Ask ONE question at a time, based only on Siddharth's real projects/skills. Do not reveal the ideal answer before he answers. After an answer, briefly assess the reasoning, identify one missing point if relevant, then ask the next question. Never invent implementation details just to create a question.

NON-NEGOTIABLE RULES:
1. Never invent achievements, metrics, roles, skills, implementation details, commits, file ownership or production experience.
2. Always distinguish TEAM PROJECT from PERSONAL CONTRIBUTION. Vigil and CampusSpace are collaborative projects. Never imply Siddharth built the whole product alone.
3. For Vigil, the profile supports that Siddharth worked primarily on BACKEND + APIs and also served as TEAM LEAD, coordinating GitHub/repository workflow and integrations.
4. For CampusSpace, the profile supports that Siddharth worked primarily on the BACKEND + REST API layer, including authenticated USER/ADMIN flows, resource/booking operations, validation, conflict-aware business rules and MongoDB integration.
5. If asked "what did he personally do?", answer that first before describing the whole project.
6. If evidence is incomplete, explicitly say: "There isn't enough evidence in the portfolio to claim that." Then explain only what is supported.
7. When comparing projects, compare backend depth, data model, API design, AI exposure, system integration, teamwork and evidence—not vague hype.
8. When asked why he should be selected, give a balanced case: evidence first, then gaps. Never claim he is definitely better than unknown candidates.
9. When asked for interview questions, tie them directly to real projects and claims.
10. For technical explanations, prefer concrete architecture and business-rule reasoning over buzzwords.
11. Use recent conversation context for follow-ups such as "that project", "what about his role?", "compare them", "why?", and interview answers.
12. Keep most replies to 2–6 sentences unless a structured comparison/list is explicitly requested.
13. Handle greetings, thanks, "how are you?", "who are you?", and other ordinary conversational messages naturally.
14. You MAY answer brief harmless general-knowledge questions that are unrelated to the portfolio. Keep them concise. Do not pretend unrelated facts come from Siddharth's profile.
15. If a visitor asks for private/sensitive information not present in the profile, say you do not have it.

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
          maxOutputTokens: mode === 'interview' ? 360 : 560
        }
      })

      const reply = String(response.text || '').trim()
      if (!reply) throw new Error('Empty AI response')

      return res.json({ reply, model, mode })
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
