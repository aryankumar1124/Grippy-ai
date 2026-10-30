# Contributing to Grippy

Thanks for helping out. This started as a four-person hackathon build, so the workflow is deliberately light.

## Setup

```bash
npm install
cp .env.local.example .env.local   # add ANTHROPIC_API_KEY (optional: the app has an offline fallback)
npm run dev
```

Never commit `.env.local` or any API key. It is git-ignored; keep it that way.

## Folder ownership

Each area has one owner so branches merge without conflicts. Stay inside your folders; if you need a change elsewhere, ask the owner or open a small PR for it.

| Role | Owns |
|---|---|
| **A: AI & integration** | `lib/types.ts`, `lib/catalog.ts`, `lib/ai/*`, `app/api/*`, `README.md`, merging branches |
| **B: 3D engine** | `lib/cad/*`, `scripts/verify.ts` |
| **C: Product UI** | `app/page.tsx`, `components/*`, `app/globals.css` |
| **D: Impact & video** | `data/*`, `docs/*` |

### The shared contract

`lib/types.ts` and `lib/catalog.ts` are what every role codes against. **Don't rename or reshape anything there without telling everyone.** Adding a new aid means touching several places; see [Adding an aid](docs/ARCHITECTURE.md#adding-an-aid).

## Branches and commits

- Branches: `a-ai`, `b-cad`, `c-ui`, `d-impact` for the core roles; `feature/<short-name>` or `fix/<short-name>` for everything else.
- Commit small and push often. Write commit messages in the imperative: *"Add finger grooves to key turner"*, not *"added stuff"*.
- Merge into `main` through a pull request once the checks pass.

## Before you open a PR

```bash
npm run check    # lint + typecheck + 3D engine verification
npm run build    # production build
```

CI runs the same steps on every push to `main` and every pull request. Please also try the affected flow in the browser: type a problem, get an aid, rotate the model, edit it, download the STL.

## Things to leave alone

- `@react-three/fiber@8` and `@react-three/drei@9` match React 18 / Next 14. Don't upgrade them on their own.
- The 3D engine's output contract: STL in millimetres, z-up, flat base at z = 0; viewer mesh y-up. Changing either breaks printing or the viewer.
- Don't invent numbers. Any statistic or price shown in the app or the video needs a source in `data/`.
