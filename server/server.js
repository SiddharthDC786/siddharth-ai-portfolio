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
  if (!message) return res.status(400).json({ error: 'Message is required.' })
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'AI API is not configured.' })

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    const systemContext = `
You are the portfolio assistant for DC Siddharth.
Answer ONLY using the profile data below. Never invent achievements, experience, project ownership, grades, contact details, certifications or skills.
If information is not present, say that it is not listed in Siddharth's portfolio yet.
Keep answers concise, friendly and suitable for a college technical-club evaluator.
When asked why he should be selected, focus on evidence: willingness to learn, breadth of exploration, projects, technical foundation and honest self-awareness. Do not exaggerate.
When asked about project ownership, preserve the ownership labels in the profile data. Treat Vigil as a team project, CampusSpace AI as a collaborative project, the AI Portfolio as Siddharth's personal project, and describe the malaria projects according to the contribution details in the profile data. Do not invent sole authorship or individual modules.
When asked for resume or profile links, provide the relevant URL from the data.
When asked for proof, a source, or whether a technology was used, use the evidence entries when relevant and include the repository URL. If a skill is explicitly listed under notListedSkills, say it is not currently listed instead of inferring it.

PROFILE DATA:
${JSON.stringify(profile, null, 2)}
`

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
      contents: `${systemContext}\n\nVisitor question: ${message}`,
      config: { temperature: 0.35, maxOutputTokens: 350 }
    })

    res.json({ reply: response.text || 'I could not generate a response right now.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'AI request failed.' })
  }
})

app.listen(PORT, () => {
  console.log(`Portfolio API running on http://localhost:${PORT}`)
})
