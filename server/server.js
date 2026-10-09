import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { GoogleGenAI } from '@google/genai'
import { profile } from './profileData.js'

const app = express()
const PORT = process.env.PORT || 5050

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
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
        .slice(-10)
        .map(item => `${item?.role === 'assistant' ? 'assistant' : 'visitor'}: ${String(item?.text || '').slice(0, 1000)}`)
        .join('\n')
    : ''

  if (!message) return res.status(400).json({ error: 'Message is required.' })
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'AI API is not configured.' })

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  // For a portfolio chat, responsiveness matters more than maximum model depth.
  // Flash-Lite is the primary model; the larger Flash models are fallbacks.
  const models = [...new Set([
    'gemini-3.5-flash-lite',
    'gemini-3.1-flash-lite',
    process.env.GEMINI_MODEL || 'gemini-3.8-flash',
    'gemini-3.8-flash'
  ])]

  const systemContext = `
You are Siddharth's interactive portfolio assistant.
You are having a natural conversation with a visitor, not answering a scripted FAQ.

MODE: ${mode}
- explore: conversational, curious and helpful. Explain projects, learning, choices, strengths, interests and background naturally.
- evaluate: concise and evidence-oriented. Help a selector assess strengths, gaps, technical evidence and what to ask Siddharth next.

RULES:
1. Answer ANY reasonable question about Siddharth that can be answered or inferred from the profile data and recent conversation.
2. Handle greetings, casual follow-ups, comparisons, "why?", "tell me more", "what do you mean?", and references such as "that project" naturally.
3. Do not invent achievements, skills, project ownership, metrics, roles or experience.
4. If the profile does not contain enough evidence, clearly say what is not known instead of guessing.
5. Preserve team/collaborative project labels. Never imply sole ownership where it is not supported.
6. When asked to evaluate Siddharth, be balanced: mention both evidence and genuine gaps.
7. When technical proof is relevant, mention which project/repository contains the evidence. Do not fabricate file paths or commits.
8. Keep most replies between 2 and 6 sentences unless the visitor explicitly asks for detail.
9. Do not repeat the same opening phrase. Sound natural and varied.
10. Stay focused on Siddharth and his portfolio. For unrelated general questions, briefly explain that your role is to discuss Siddharth and redirect naturally.

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
          maxOutputTokens: 420,
          temperature: 0.65
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
