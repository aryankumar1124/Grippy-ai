# Grippy

**Tell us what's hard. We'll design the tool.**
Describe a daily task that's hard for you in plain English → AI picks and sizes an adaptive aid → see it in 3D, tweak it by talking, download a 3D-printable STL.

Built at the Nittany AI Vibeathon. Inspired by the open-source text-to-cad idea; our pipeline, AI occupational-therapist reasoning, and talk-to-edit are our own.

## Setup
```bash
git clone https://github.com/aryankumar1124/grippy-ai
cd grippy-ai
npm install
cp .env.local.example .env.local   # add your ANTHROPIC_API_KEY
npm run dev                         # http://localhost:3000
```
No API key? `/api/assess` still works with an offline fallback, so you can build the UI.

## Stack
Next.js 14 (App Router, TS, Tailwind) · Anthropic API · `@jscad/modeling` + `@jscad/stl-serializer` · `three` + `@react-three/fiber@8` + `@react-three/drei@9`
(R3F v8 / drei v9 are the versions that match React 18 / Next 14. Don't upgrade them.)

## API
| Route | Body | Returns |
|---|---|---|
| `POST /api/assess` | `IntakeInput` | `{ spec: AidSpec, fallback?: true }` |
| `POST /api/edit` | `{ spec, instruction }` | `{ spec, changeSummary }` |

Types: `lib/types.ts` · Aid catalog + param ranges: `lib/catalog.ts`

## Folder ownership (no overlap)
| Role | Owns |
|---|---|
| A: AI & Integration | `lib/types.ts`, `lib/catalog.ts`, `lib/ai/*`, `app/api/*`, `README.md` |
| B: 3D Engine | `lib/cad/*` |
| C: Product UI | `app/page.tsx`, `components/*`, `app/globals.css` |
| D: Impact & Video | `data/*`, `docs/*` |

Branches: `a-ai`, `b-cad`, `c-ui`, `d-impact`. Merge into `main` at the checkpoint.
