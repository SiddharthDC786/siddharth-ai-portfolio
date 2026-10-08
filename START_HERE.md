# START HERE — Tonight's Submission Checklist

## 1. Run the frontend

```bash
cd client
npm install
npm run dev
```

Open the URL Vite shows, normally `http://localhost:5173`.

## 2. Run the AI backend

Open a second terminal:

```bash
cd server
npm install
```

Copy `.env.example` to `.env` and add your Gemini API key.

```bash
npm run dev
```

## 3. Test these exact features

- Click **60-sec technical tour** and complete all 4 slides.
- Open at least one **Technical breakdown** project modal.
- Ask **What projects has Siddharth worked on?**
- Ask **Which project used Neo4j?** and click the GitHub proof.
- Expand **Try to break my AI** and ask **Does Siddharth know Java?**
- Ask **Show me his resume** and open the PDF.
- Resize the browser to mobile width and ensure the site is still usable.

## 4. Before pushing to GitHub

Make sure you do NOT upload:

```text
server/.env
node_modules/
dist/
```

Your `.gitignore` already protects the important files, but check before committing.

## 5. Best 60–90 second explanation

Say this in your own words:

> I did not want to build a normal portfolio and attach a chatbot just because it was mandatory. I built the site around the idea “Don’t just read my portfolio — ask it.” The assistant receives structured information about me through a Node/Express backend, so the API key stays server-side. For important questions I also added local fallback responses, and for technical claims I can show GitHub proof instead of asking the model to invent an answer.

Then demo:

**Tour → Vigil breakdown → Neo4j question → proof → Java challenge → resume → architecture.**
