# Optional Deployment

Deployment is optional for the round. Only do this after the local version works perfectly.

## Frontend

Deploy the `client` folder to any static React/Vite host.

Build command:

```bash
npm install && npm run build
```

Output folder:

```text
dist
```

Set this environment variable to the deployed backend URL:

```env
VITE_API_URL=https://your-backend.example
```

## Backend

Deploy the `server` folder to a Node hosting service.

Install/start:

```bash
npm install
npm start
```

Set:

```env
GEMINI_API_KEY=your_real_key
GEMINI_MODEL=gemini-3.8-flash
CLIENT_URL=https://your-frontend.example
PORT=5050
```

Do not put the Gemini key in Vite or any `VITE_*` variable because Vite exposes those values to browser code.

## Final deployment test

- AI questions work from the deployed frontend.
- GitHub proof links open.
- Resume opens.
- No CORS error appears in the browser console.
- Mobile layout works.
