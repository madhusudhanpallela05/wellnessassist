# AI Wellness Assistant — Backend

A small Express.js API that powers auth, profile storage, and the chat
assistant for the frontend app. No external database is required to run it —
data is persisted to JSON files under `src/data/` (swap out
`src/utils/jsonStore.js` for a real database client later without touching
any controller).

The chat/AI logic itself lives in the sibling **`../ai`** folder, and is
imported directly by this backend (see `src/controllers/chatController.js`
and `src/models/profileModel.js`).

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev      # nodemon, auto-restarts on change
# or
npm start        # plain node
```

The server starts on `http://localhost:5000` by default (see `PORT` in `.env`).

## Endpoints

| Method | Path                | Auth       | Description                                  |
|--------|---------------------|------------|-----------------------------------------------|
| GET    | `/api/health`        | none       | Health check                                  |
| POST   | `/api/auth/signup`   | none       | `{ name, email, password }` → `{ token, user }` |
| POST   | `/api/auth/login`    | none       | `{ email, password }` → `{ token, user }`     |
| GET    | `/api/auth/me`       | Bearer JWT | Returns the current user                      |
| GET    | `/api/profile`       | Bearer JWT | Returns the signed-in user's saved assessment |
| POST   | `/api/profile`       | Bearer JWT | Save/update assessment `{ name, age, height, weight, gender, history }` |
| POST   | `/api/chat`          | optional   | `{ message }` → `{ reply }`                   |
| GET    | `/api/chat/greeting` | optional   | Returns the chat's opening greeting           |

All authenticated routes expect `Authorization: Bearer <token>`.

## Project layout

```
backend/
  src/
    app.js               # express app (middleware + routes)
    index.js             # entry point (starts the http server)
    routes/               # route definitions
    controllers/          # request handlers
    models/                # persistence (JSON-file backed)
    middleware/            # JWT auth middleware
    utils/                 # token signing/verifying, JSON store, etc.
    data/                  # JSON "database" files (auto-created)
```

## Notes

- Passwords are hashed with bcrypt before being stored — never in plain text.
- JWTs are signed with `JWT_SECRET` from `.env` — change this to a long random
  value before deploying anywhere real.
- The chat reply logic is intentionally simple/rule-based (see `../ai/wellnessAI.js`)
  so the app works out of the box with zero external API keys. To use a real
  LLM instead, replace the body of `getChatReply()` in that file with a call
  to your provider of choice (OpenAI, Anthropic, etc.) — no route or
  controller changes are needed.
