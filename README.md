# ELARA · Nature & Stillness

A complete local cabana retreat website with separate Next.js frontend and NestJS backend. Created in `D:\projects\cabana`.

## Run

Requires Node.js 24 or newer. From the project root:

```powershell
npm install
npm run setup
npm run build --workspace=@elara/backend
npm run dev
```

- Guest website: http://127.0.0.1:3000
- Admin dashboard: http://127.0.0.1:3000/admin
- API health: http://127.0.0.1:4000/api/v1/health
- Initial admin credentials: `.admin-credentials` in the project root. This file and all `.env` files are ignored by Git. Do not share them.
- Stop the servers with Ctrl+C. To regenerate the admin password: `npm run admin:password`, then restart the API.

The initial build and installation have already been performed. Normal restart: `npm run dev`.

## Separate frontend and backend

`frontend` is the Next.js application. `backend` is the independent NestJS service. `packages/contracts` contains shared validation schemas and API types. The frontend proxies `/api/v1/*` and `/uploads/*` to the API so the browser uses one origin and HTTP-only cookies.

You can run each separately:

```powershell
npm run dev:frontend
npm run dev:backend
```

Backend development compiles TypeScript automatically and restarts the API only after a successful compilation. Next.js updates the frontend automatically. See `docs/MODULE-GUIDE.md` for the exact files to edit when changing a button caption, click action, layout or style.

## Module editing

Read `docs/MODULE-GUIDE.md`. Each frontend module separates `config` (button labels), `components` (display), `hooks` (actions/state), `services` (HTTP calls) and `styles` (desktop/mobile CSS), as needed. The header reservation button reuses the same booking button component and default label.

## Included

- Responsive editorial homepage, cabana collection and detail routes, experiences, gallery filters and keyboard-accessible lightbox, contact, privacy, terms and photo credits.
- Date and capacity validation, consent, spam trap, server-side throttling and persistent booking enquiries with unique references.
- Secure admin login, enquiry inbox and status changes, cabana creation/editing/publishing, prices and amenities, site copy and contact settings, image uploads and gallery management.
- Four original photorealistic AI cabana images, two actual Sri Lankan reference photos, optimized WebP files and locally hosted typography.

## Content and photography

ELARA is a sample brand, and room details and rates are illustrative. Contact details are deliberately blank until you enter your own in Admin → Settings. WhatsApp links appear after a real number is configured. Enquiries are stored in the admin inbox; no email/SMS service or payment gateway is connected. This version does not claim live inventory or confirm reservations automatically.

Real reference photography is credited on `/credits` and in the lightbox. The source resorts retain their rights. Replace those references with owned/licensed property photographs before a public launch. See `docs/ASSETS.md` and `docs/IMAGE-PROMPTS.json`.

## Database

For immediate local use, the API uses SQLite through Node's built-in driver. Records persist at `backend/data/elara.sqlite`; uploads are at `backend/uploads`. No extra database installation is needed.

The database service also supports PostgreSQL: set `DATABASE_URL` in `backend/.env` and restart. It creates the additive initial schema and seeds only missing rows. Changing the connection does **not** migrate existing SQLite records. Plan a reviewed data transfer if you already have real enquiries. PostgreSQL integration was implemented but requires an available PostgreSQL server for separate verification. Prisma is not required by this implementation.

## Checks

```powershell
npm run typecheck
npm test
npm run build
```

Tests use an isolated temporary SQLite database and do not change your guest enquiries or settings. API tests cover authentication, permission enforcement, dates, capacity, enquiry persistence, content editing, image validation and restart persistence.

## Production

Build both applications with `npm run build`, then `npm start`. Keep an independent `npm run build` workflow for release verification; do not run the Next production build against a running Next development server using the same `.next` directory.

Before hosting, set `API_URL` for the frontend, `NEXT_PUBLIC_SITE_URL` to the actual domain, and `COOKIE_SECURE=true` behind HTTPS. Configure the frontend/API process hosts and reverse proxy for the deployment environment; local defaults intentionally bind only to `127.0.0.1`. Keep the API private behind the frontend proxy. Use persistent database/upload volumes or a managed PostgreSQL service plus a media storage adapter. Configure secrets outside source control. Replace sample content and photography, set the operator's privacy contact/retention policy, verify backups/restores, and remove the preview `robots: noindex` setting when the public site is ready.

See `docs/ARCHITECTURE.md` for module boundaries and change workflows.
