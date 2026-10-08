import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { GoogleGenAI } from '@google/genai'
import { profile } from './profileData.js'

const app = express()
const PORT = process.env.PORT || 5050

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json({ limit: '64kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'Siddharth Portfolio AI' })
})

app.post('/api/chat', async (req, res) => {
  const message = String(req.body?.message || '').trim()
  const history = Array.isArray(req.body?.history)
    ? req.body.history.slice(-6).map(item => `${item?.role || 'user'}: ${String(item?.text || '').slice(0, 700)}`).join('\n')
    : ''

  if (!message) return res.status(400).json({ error: 'Message is required.' })
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'AI API is not configured.' })

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    const systemContext = `
You are the portfolio assistant for DC Siddharth.
Answer only from the profile data below and recent conversation context.
Do not invent achievements, skills, project ownership or experience.
If information is absent, say it is not listed in the portfolio.
Keep answers concise, natural and varied in wording.
Use recent context for follow-up questions like "why?", "which one?" or "tell me more".
Preserve project ownership labels and do not exaggerate contributions.
Use evidence entries for technical proof when relevant.

PROFILE DATA:
${JSON.stringify(profile, null, 2)}
`

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
      contents: `${systemContext}${history ? `\n\nRECENT CONVERSATION:\n${history}` : ''}\n\nVisitor question: ${message}`,
      config: { maxOutputTokens: 420 }
    })

    res.json({ reply: response.text || 'I could not generate a response right now.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'AI request failed.' })
  }
})

app.listen(PORT, () => {
  console.log(`Portfolio API running on port ${PORT}`)
})
