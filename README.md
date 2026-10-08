# DC Siddharth — Interactive AI Portfolio

> **Still exploring. Already building.**

A selection-focused personal portfolio built for a college technical-domain round. Instead of treating the mandatory chatbot as an add-on, the entire experience is built around one idea:

## Don't just read my portfolio. Ask it.

The site presents verified project work, technical decisions, skills, coding profiles and a resume, then lets an evaluator ask profile-specific questions through an AI assistant.

## What makes this version different

- **60-second technical tour** for evaluators who have limited time
- **Project technical breakdowns**: problem, approach, contribution, decisions and learning
- **Engineering mindset section** covering reliability, server-side secrets and tool choice
- **Rich AI responses** with project cards, profile actions and resume actions
- **GitHub proof cards** for selected technical claims such as Neo4j, MongoDB and CNN work
- **“Try to break my AI”** prompts that test whether the assistant admits when a skill is not listed
- **Local fallback answers** for core questions if the AI API is unavailable
- **Grounded prompting** that tells the model not to invent achievements, ownership or skills
- **Responsive + keyboard-friendly UI** with reduced-motion support

## Verified projects highlighted

### Vigil / investigation-ai
Team AI / graph-analysis project using React/Vite, FastAPI, PostgreSQL, Neo4j and NLP/entity-resolution concepts.

### CampusSpace AI
Collaborative MERN campus resource-booking application with JWT authentication, HTTP-only cookies, USER/ADMIN RBAC, Zod validation, booking conflicts and notifications.

### Malaria Detection System
Python/TensorFlow/Keras computer-vision project with OpenCV preprocessing and Streamlit UI. Documented contribution includes frontend, model integration and prediction/preprocessing flow.

### AI Portfolio Assistant
This project: React/Vite frontend + Node/Express AI boundary + structured profile context + Gemini + deterministic fallback responses.

### ParaDetect-AI
Additional TensorFlow/Keras CNN prototype for malaria blood-smear classification.

## Architecture

```text
Visitor question
      │
      ▼
React / Vite
      │ POST /api/chat
      ▼
Node / Express
      │
      ├── structured profile context
      │
      └── Gemini API
              │
              ▼
       grounded response
              │
              ├── project cards
              ├── GitHub proof
              ├── resume/profile actions
              └── local fallback when needed
```

## Tech stack

**Frontend:** React, Vite, CSS  
**Backend:** Node.js, Express  
**AI:** Gemini API via `@google/genai`  
**Data:** Structured JavaScript profile objects  
**Reliability:** Deterministic local fallback responses

## Run locally

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend normally runs at `http://localhost:5173`.

### Backend

In a second terminal:

```bash
cd server
npm install
cp .env.example .env
```

Add your Gemini API key to `.env`, then:

```bash
npm run dev
```

Backend runs at `http://localhost:5050`.

## Environment variables

`server/.env`

```env
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-3.8-flash
CLIENT_URL=http://localhost:5173
PORT=5050
```

Optional frontend environment variable when the API is hosted separately:

```env
VITE_API_URL=https://your-backend-url.example
```

Never commit `.env`.

## Best demo flow — about 60–90 seconds

1. Open the hero and say: **“I did not want the chatbot to feel like a mandatory add-on, so I built the portfolio around ‘Don’t just read my portfolio — ask it.’”**
2. Click **60-sec technical tour**.
3. Open **Vigil → Technical breakdown** and briefly show the problem, architecture decisions and GitHub proof.
4. Scroll to **Ask my portfolio** and ask: **“Which project used Neo4j?”**
5. Show the answer + project card + **GitHub proof** link.
6. Ask: **“Does Siddharth know Java?”** to demonstrate non-hallucination.
7. Ask: **“Show me his resume.”**
8. Scroll to **Behind the portfolio** and explain the React → Express → profile context + Gemini flow.

## Suggested evaluator questions

- What projects has Siddharth worked on?
- Which project used Neo4j?
- Which project involved MongoDB?
- Show proof for his CNN work.
- Does Siddharth know Java?
- Why should we select Siddharth?
- What technologies does he know?
- Show me his resume.

## Project structure

```text
siddharth-portfolio/
├── client/
│   ├── public/
│   │   ├── DC_Siddharth_Resume.pdf
│   │   └── DC_Siddharth_Resume.docx
│   └── src/
│       ├── components/
│       │   ├── Architecture.jsx
│       │   ├── ChatAssistant.jsx
│       │   ├── EngineeringMindset.jsx
│       │   ├── Projects.jsx
│       │   ├── TourModal.jsx
│       │   └── ...
│       ├── data/profileData.js
│       ├── App.jsx
│       └── styles.css
├── server/
│   ├── profileData.js
│   ├── server.js
│   └── .env.example
├── DEPLOYMENT.md
├── START_HERE.md
└── README.md
```

## Profiles

- GitHub: https://github.com/SiddharthDC786
- LinkedIn: https://www.linkedin.com/in/siddharth-dc-10319a3b3
- LeetCode: https://leetcode.com/u/DCSiddharth/

## Author

**DC Siddharth**  
B.Tech — Artificial Intelligence & Machine Learning  
VNRVJIET · 2nd Year, 1st Semester
