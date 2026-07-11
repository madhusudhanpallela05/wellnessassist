# AI

Shared, framework-free "AI" logic used by the backend:

- `wellnessAI.js`
  - `computeBMI(heightCm, weightKg)` — BMI calculation
  - `bmiCategory(bmi)` — classify a BMI into underweight/healthy/overweight/obese
  - `getChatReply(message, context)` — **async**. Calls a real LLM via
    [OpenRouter](https://openrouter.ai) using a strict health & wellness
    system prompt, and falls back to a rule-based reply if no API key is
    configured or the request fails.
  - `getGreeting(name)` — opening chat greeting

This module has no dependency on Express, so it can be imported directly by
`backend/src/controllers/chatController.js` / `backend/src/models/profileModel.js`,
unit tested on its own, or reused elsewhere.

## Setting up the real AI replies (OpenRouter)

1. Create a key at https://openrouter.ai/keys
2. In `backend/.env`, set:
   ```
   OPENROUTER_API_KEY=sk-or-v1-xxxxxxxx
   OPENROUTER_MODEL=openai/gpt-4o-mini   # or any other OpenRouter model id
   ```
3. Restart the backend. That's it — `/api/chat` now answers using the real
   model, constrained to health & wellness topics by the system prompt baked
   into `wellnessAI.js` (`SYSTEM_PROMPT`).

If `OPENROUTER_API_KEY` is left blank, or a request to OpenRouter fails for
any reason (network issue, rate limit, invalid key), `getChatReply` silently
falls back to the original rule-based replies — the chat endpoint never
throws or breaks because of this.

## The system prompt

The assistant is instructed to:
- Only answer health/wellness/nutrition/fitness/sleep/BMI/hydration/mental-wellness questions
- Politely decline anything else (coding, politics, sports, finance, etc.) with a fixed message
- Never diagnose with certainty; suggest seeing a professional for symptoms/serious concerns

Edit the `SYSTEM_PROMPT` constant at the top of `wellnessAI.js` to change this
behavior.

## Swapping providers later

`callOpenRouter()` is a small, isolated function. To use a different
provider (OpenAI directly, Anthropic, etc.) instead, just change what's
inside that function — the rest of the codebase (routes, controllers,
frontend) doesn't need to change.
