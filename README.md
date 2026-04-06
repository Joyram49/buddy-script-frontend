# BuddyScript Frontend

Next.js frontend for the BuddyScript social app. It includes authentication screens, protected feed UI, post creation, comments, reactions, and integrations with the backend API.

## Tech Stack

- Next.js 16 + React 19 + TypeScript
- App Router
- TanStack Query
- Axios
- React Hook Form + Zod
- Tailwind CSS

## Features

- Login and registration flows
- Protected feed page
- Post composer and post listing
- Comments and reactions UI
- Responsive feed layout
- API integration with BuddyScript backend

## Project Structure

```txt
src/
  app/                     # App Router pages and route groups
    (auth)/                # Login/register pages
    (protected)/           # Auth-protected pages (feed)
  services/                # API domain services (auth, post)
  hooks/                   # React Query hooks
  context/                 # Auth context/state
  lib/                     # API and helper utilities
  config/                  # Environment URL config helpers
```

## Prerequisites

- Node.js 20+ (recommended)
- npm 10+ (or compatible)
- Running backend server (default: `http://localhost:4000`)

## Environment Variables

Create a `.env` file in `buddyscript-frontend`:

```env
NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:4000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

`NEXT_PUBLIC_BACKEND_BASE_URL` is used for API requests from the frontend.

## Local Setup (Full Procedure)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env` (see above).
3. Ensure backend is running on `http://localhost:4000` (or update env value).
4. Start development server:
   ```bash
   npm run dev
   ```
5. Open:
   - `http://localhost:3000`

## Available Scripts

- `npm run dev` - start Next.js development server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - run ESLint
- `npm run format` - format code with Prettier
- `npm run format:check` - check formatting

## Application Flow

- Public routes:
  - `/login`
  - `/register`
- Protected route:
  - `/feed`
- The app authenticates against backend `/auth` APIs and uses the issued token for protected feed actions.

## Running In Production

1. Build:
   ```bash
   npm run build
   ```
2. Start:
   ```bash
   npm run start
   ```

Set production values for `NEXT_PUBLIC_BACKEND_BASE_URL` and `NEXT_PUBLIC_APP_URL`.

## Troubleshooting

- Backend connection errors: verify `NEXT_PUBLIC_BACKEND_BASE_URL`.
- CORS/session issues: make sure backend `CORS_ORIGIN` points to frontend URL.
- Route protection not working: check token handling and backend auth availability.
