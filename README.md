# AI Wellness Assistant

Full project, split into three folders:

```
frontend/   React + Vite + TypeScript app (unchanged UI, now talks to the backend)
backend/    Express.js API — auth, profile storage, chat endpoint
ai/         Shared "AI" logic (BMI + chat reply) used by the backend
```

## Quick start

**1. Start the backend**

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Runs on `http://localhost:5000`.

**2. Start the frontend**

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:5000 (default is already correct)
npm run dev
```

Runs on `http://localhost:5173` (Vite default).

Open the app, sign up for an account, complete the assessment form, and chat
with the assistant — all three now go through the real backend:

- **Sign up / Log in** → `POST /api/auth/signup` / `/api/auth/login` (JWT-based, bcrypt-hashed passwords)
- **Assessment submit** → `POST /api/profile` (saved server-side, reloaded automatically next time you log in)
- **Floating chat** → `POST /api/chat` (falls back to the original in-browser replies if the backend isn't running, so the UI never breaks)

## What changed vs. the original frontend-only zip

- `frontend/src/utils/api.ts` — new: small fetch wrapper (base URL, JWT header, error handling)
- `frontend/src/context/AuthContext.tsx` — now calls the backend instead of storing accounts in `localStorage`
- `frontend/src/context/ProfileContext.tsx` — now saves/loads the assessment via the backend when signed in
- `frontend/src/components/AuthModal.tsx` — submit handler now `await`s the (now async) signup/login calls
- `frontend/src/components/FloatingChat.tsx` — now calls `/api/chat`, with the original local reply logic kept as an offline fallback
- Everything else in `frontend/` (styling, layout, animations, the wellness plan/recipes/workouts generation, etc.) is **untouched**.

## Notes

- No external database is required — the backend persists to JSON files under
  `backend/src/data/` so you can run it immediately. Swap
  `backend/src/utils/jsonStore.js` for a real DB client later without
  touching any controller.
- The chat assistant is rule-based by default (see `ai/wellnessAI.js`) so
  everything works with zero API keys. See `ai/README.md` for how to wire in
  a real LLM.
