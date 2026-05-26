# Tecsior CRM

A project + time-management workspace for a software studio — built from the `Design/` prototype with 2026 tooling and a real MongoDB backend.

- **`frontend/`** — Next.js 16 (App Router, React 19, TypeScript). The full Nebula design system, dark/light theming, role views, and every screen (Dashboard, Projects, Project detail, Tasks board/list/calendar, Task drawer, Time tracking, Team, Clients, Invoices, Settings).
- **`backend/`** — Express 5 + TypeScript API on MongoDB (Atlas). JWT auth (httpOnly cookie), bcrypt, Zod validation, full CRUD.

The two run as separate processes and talk over CORS with credentialed cookies.

## Prerequisites

- Node.js 20.9+ (tested on 22)
- The MongoDB connection string is already wired into `backend/.env`.

## 1. Backend (port 7011)

```bash
cd backend
npm install
npm run seed     # one-time: loads the studio's sample data into MongoDB
npm run dev      # starts the API on http://localhost:7011
```

## 2. Frontend (port 7010)

```bash
cd frontend
npm install
npm run dev      # starts the app on http://localhost:7010
```

Open **http://localhost:7010** and sign in.

## Demo login

```
maya@tecsior.studio  /  tecsior
```

Every seeded team member can sign in with the password `tecsior`
(e.g. `jin@tecsior.studio`, `aman@tecsior.studio`). Maya is the founder/admin.

## What works end-to-end

- Email/password auth with a secure httpOnly session cookie.
- Create projects, tasks, clients, team members, invoices.
- Drag tasks across the Kanban board (status persists to MongoDB).
- Log time; spent hours roll up into tasks and project budgets.
- Task drawer edits status / priority / subtasks live.
- Dashboard KPIs, capacity, and activity are aggregated server-side.
- Theme / accent / density / module toggles (persisted locally), role switcher.

## Configuration

- `backend/.env` — `MONGODB_URI`, `MONGODB_DB`, `JWT_SECRET`, `PORT`, `CORS_ORIGIN`.
- `frontend/.env.local` — `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:7011`).

## Build

```bash
cd backend  && npm run build   # tsc -> dist/
cd frontend && npm run build    # next build
```
