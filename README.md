# CareerPath

Career-discovery MVP for young people in Ghana and Nigeria. Students complete an assessment, see explainable career matches, view country-specific pathways (when verified), build a roadmap, and request a mentor.

This repository currently contains **Stage 1–2**: Next.js + Tailwind UI shell, landing page, Ghana/Nigeria country selection, and placeholder routes. Database, auth, scoring, and verified career data are not connected yet.




## Run locally

```bash
npm install
npm run dev
```



Other scripts:

```bash
npm run lint
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env.local` when you have a Supabase project. Do not commit `.env.local`.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

These values are not used in Stage 1–2.

## Routes in this shell

| Path | Status |
| --- | --- |
| `/` | Landing + country selection |
| `/assessment` | Placeholder |
| `/results` | Placeholder |
| `/careers` | Placeholder |
| `/careers/[slug]` | Placeholder |
| `/roadmap` | Placeholder |
| `/mentors` | Placeholder |
| `/login` | Placeholder |
| `/signup` | Placeholder |
| `/dashboard` | Placeholder |

Country choice is stored in the browser (`localStorage`) until Supabase profiles exist.

## Spec

See `docs/CareerPath_Cursor_Master_Build_Spec.md`.
