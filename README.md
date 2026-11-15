# Veritas Audit Engine

# IdeaX

An evidence-led MVP for fact verification and media-audit workflows. The UI does not fabricate a verdict: without a configured provider it reports that analysis is unavailable and explains why.

## Local setup

1. Copy `.env.example` to `.env` and fill in `DATABASE_URL` and a secure `JWT_SECRET`.
2. Install dependencies: `npm install`.
3. Create the PostgreSQL schema: `npm run db:migrate -- --name init`.
4. Start the app: `npm run dev`.

Open `http://localhost:3000`.

## Verification providers

- Text and URL verification uses Gemini only when `GEMINI_API_KEY` is set. The model is instructed to return a bounded assessment and never invent sources.
- Image/video/audio uploads validate the submission and deliberately return `ANALYSIS_UNAVAILABLE` until a detector provider is connected. A clean result must never be represented as proof of authenticity.
- A production deployment should add source retrieval/grounding, a media detection provider, object storage (Supabase Storage), and background jobs for video/audio processing.

## API

- `POST /api/auth/register` — `{ name, email, password }`; creates an account and session cookie.
- `POST /api/auth/login` — `{ email, password }`; creates a session cookie.
- `POST /api/verifications` — multipart body with `contentType`, `content`, and optionally `file`.
- `GET /api/verifications` — current user's stored reports.

## Deployment

Deploy the Next.js service to Vercel and point `DATABASE_URL` at managed PostgreSQL. Set all variables from `.env.example` in the deployment configuration. Media processing should run in a separate worker/FastAPI service rather than a short-lived serverless request.
