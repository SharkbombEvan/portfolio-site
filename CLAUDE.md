# Evan Demsey — Engineering Portfolio (with Sharkbomb Audio)

This is Evan Demsey's engineering portfolio. Sharkbomb Audio — his electrical engineering business
for building, modifying, and repairing audio equipment — lives inside it as a featured section at
`/audio`. The site is built with Next.js and hosted on Vercel.

---

## Site Structure: "Person first, studio second"

Two modes share one design system:
- **General** (`/`, `/projects`, `/about`, `/resume`, `/contact`): for employers. Shows ALL projects, audio included.
- **Audio** (`/audio`, `/audio/projects`, `/audio/products`): for customers. A filtered view (`areas has "audio"`), never a separate silo.

- The nav has a segmented switch `All Work | Sharkbomb Audio` (real routes, not client state). `components/MobileNav.tsx` takes `mode`.
- Shared pages (`/about`, `/contact`, `/projects/[slug]`) pick their mode from `?from=audio` (`lib/site.ts`: `modeFromParam`, `withMode`).
- `/products` permanently redirects to `/audio/products` (`next.config.ts`).
- Shared components: `MobileNav`, `SiteFooter`, `ProjectCard`, `ProjectList`, `AreaFilter`. Use them instead of copying nav/footer markup.
- Project domain tags live in `lib/areas.ts` (single source of truth for admin checkboxes and filter chips).
- Home featured = `featured` projects ordered by `featuredOrder` (falls back to newest 3). `/audio` uses `audioFeatured`.
- Drop a PDF at `public/resume.pdf` and `/resume` shows a download button automatically.
- The nav/footer snippets further down are the OLD audio-only versions; `MobileNav`/`SiteFooter` supersede them.

---

## Always Do First

- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

---

## Reference Images

- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see Anti-Generic Guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

---

## Local Server

- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `npm run dev` (serves at `http://localhost:3000`)
- If the server is already running, do not start a second instance.

---

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router, Turbopack)
- **Language:** TypeScript
- **Database:** PostgreSQL via Neon (serverless)
- **ORM:** Prisma 7.3.0 with `@prisma/adapter-neon`
- **Image hosting:** Cloudinary
- **Auth:** NextAuth v4 with Prisma adapter
- **Markdown editor:** `@uiw/react-md-editor`
- **Markdown renderer:** `react-markdown`
- **Carousel (unused/legacy):** `embla-carousel-react`
- **Styling:** Inline styles only — do NOT use Tailwind classes or CSS modules
- **Deployment:** Vercel, auto-deploys from GitHub (main branch)

---

## Project Structure

```
portfolio-site/
├── app/
│   ├── admin/
│   │   ├── [id]/edit/         # Edit existing project
│   │   │   └── page.tsx       # Server component with server action
│   │   ├── new/
│   │   │   └── page.tsx       # Create new project (client component)
│   │   ├── DeleteButton.tsx   # Client component for delete
│   │   └── page.tsx           # Admin dashboard listing all projects
│   ├── api/
│   │   ├── admin/
│   │   │   └── route.ts       # POST: create new project
│   │   ├── upload/
│   │   │   └── route.ts       # POST: upload image to Cloudinary
│   │   └── auth/
│   │       └── [...nextauth]/ # NextAuth route handler
│   ├── about/
│   │   └── page.tsx           # About page (server component)
│   ├── contact/
│   │   └── page.tsx           # Contact page (server component)
│   ├── audio/                 # Sharkbomb Audio side: page.tsx, projects/, products/
│   ├── resume/
│   │   └── page.tsx           # Résumé (PDF button if public/resume.pdf exists)
│   ├── projects/
│   │   ├── [slug]/
│   │   │   └── page.tsx       # Individual project detail page
│   │   └── page.tsx           # All projects listing page
│   ├── generated/
│   │   └── prisma/            # Auto-generated Prisma client — DO NOT EDIT
│   └── page.tsx               # Home page (server component)
├── components/
│   ├── admin/
│   │   ├── ProjectForm.tsx        # Client component — shared create/edit form (audio fields appear when Audio area is ticked)
│   │   └── ProjectImagesField.tsx # Client component — multi-image uploader
│   └── ImageGallery.tsx           # Client component — grid gallery with lightbox
├── lib/
│   ├── prisma.ts              # Prisma client singleton
│   └── cloudinary.ts          # Cloudinary client config
├── prisma/
│   ├── schema.prisma          # Prisma schema
│   └── prisma.config.ts       # Prisma 7 config (datasource URL lives here)
├── public/
└── package.json
```

---

## Prisma Configuration (Important)

This project uses **Prisma 7**, which has a different configuration model than older versions:

- The datasource `url` is NOT in `schema.prisma` — it is in `prisma/prisma.config.ts`
- The Prisma client is generated to a **custom output path**: `app/generated/prisma`
- `lib/prisma.ts` imports from `@/app/generated/prisma`, NOT from `@prisma/client`
- After any schema change, always run:
  ```bash
  npx prisma db push
  npx prisma generate
  rm -rf .next
  npm run dev
  ```
- The project uses `db push` (not migrations) — there is no `prisma/migrations` folder

### `prisma/schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../app/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model Project {
  id         String         @id @default(cuid())
  title      String
  slug       String         @unique
  summary    String
  content    String?
  tech       String[]       @default([])
  coverImage String?
  demoUrl    String?
  repoUrl    String?
  isProduct  Boolean        @default(false)
  shopUrl    String?
  price      String?

  areas         String[] @default([])   // domain tags, see lib/areas.ts
  featured      Boolean  @default(false)
  featuredOrder Int?
  audioFeatured Boolean  @default(false)

  role       String?                   // case-study fields
  year       String?
  context    String?
  highlights String[]       @default([])

  images     ProjectImage[]
  createdAt  DateTime       @default(now())
  updatedAt  DateTime       @updatedAt
}

model ProjectImage {
  id        String   @id @default(cuid())
  url       String
  alt       String?
  order     Int      @default(0)
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId String
  createdAt DateTime @default(now())

  @@index([projectId])
  @@unique([projectId, order])
}
```

---

## Database

- Provider: **Neon** (serverless PostgreSQL)
- Connection is handled via `PrismaNeon` adapter in `lib/prisma.ts`
- `DATABASE_URL` is the pooled Neon connection string
- `DIRECT_URL` is the direct (non-pooled) Neon connection string used by `prisma.config.ts`

---

## Environment Variables

All stored in `.env.local` (local) and Vercel environment variables (production).
Never commit `.env.local` to git.

```
DATABASE_URL=           # Neon pooled connection string
DIRECT_URL=             # Neon direct connection string
CLOUDINARY_CLOUD_NAME=  # Cloudinary cloud name
CLOUDINARY_API_KEY=     # Cloudinary API key
CLOUDINARY_API_SECRET=  # Cloudinary API secret
```

---

## Path Aliases

`tsconfig.json` maps `@/` to the **project root** (not `app/`):

```json
"paths": {
  "@/*": ["./*"]
}
```

So:
- `@/lib/prisma` → `lib/prisma.ts` ✓
- `@/components/ImageGallery` → `components/ImageGallery.tsx` ✓
- `@/app/generated/prisma` → `app/generated/prisma/` ✓
- `@/components/admin/EditProjectForm` → `components/admin/EditProjectForm.tsx` ✓

Do NOT use `@/app/components/...` — components live at the root level, not inside `app/`.

---

## Styling Conventions

- **All styling uses inline styles** — no Tailwind, no CSS modules, no styled-components
- Global styles only in `app/globals.css` (minimal)
- Design system (neutral graphite and paper with one gold accent; tokens live in `app/globals.css`, use `var(--token)` in inline styles):
  - Palette: `--paper #f3f3f1` (page), `--ink #1b1c1d`, `--muted #66686a`, `--rule #d1d1cd`, `--panel #2c2e31` (graphite panels), `--accent #e0b040` (gold, on panels)
  - Audio mode (`<main data-mode="audio">`) swaps `--panel` to enclosure teal `#12424c` and `--accent` to pedal yellow `#f2c230`. Every page sets `data-mode`.
  - Type: Geist for headings (`.display`) and body, Geist Mono (`.mono`, ONLY for real data such as dates and tags). Loaded via `next/font` in `app/layout.tsx`.
  - Sentence-case labels. No all-caps tracked eyebrows, no `·` meta strings, no `→` suffixes, no numbered markers unless the content is a sequence.
  - Layout helpers: `.wrap`, `.section`, `.split`, `.work-grid`, `.index-grid`, `.prose` (markdown). Hover/focus classes: `.link`, `.nav-link`, `.btn`, `.card`, `.tab`.
  - Emails: portfolio side uses evan@demsey.org, Sharkbomb Audio side uses evan@sharkbomb.net (`emailFor(mode)` in `lib/site.ts`).
  - The portfolio side never shows prices or "for-sale" tags (`ProjectCard`, `visibleTech`).
  - Keep motion minimal (hover and focus states only) and respect `prefers-reduced-motion`.
  - Copy must come from real facts in the résumé (`public/resume.pdf`). No generic marketing lines.
  - The old Georgia/cream (#f8f6f1) system and the nav/footer snippets below are superseded.

### Anti-Generic Guardrails

These apply whenever designing new UI from scratch (no reference image provided):

- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Derive all colors from the Sharkbomb brand palette defined above.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. The site uses Georgia serif for headings and display text — pair with a clean sans for body where needed. Apply tight tracking (`-0.02em` to `-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients where used. Add grain/texture via SVG noise filter for depth if appropriate.
- **Animations:** Only animate `transform` and `opacity`. Never use `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`background: linear-gradient(to top, rgba(0,0,0,0.6), transparent)`) and a color treatment layer with `mix-blend-mode: multiply` where appropriate.
- **Spacing:** Use intentional, consistent spacing tokens — not arbitrary values.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

### Hard Rules

- Do not add sections, features, or content not in the reference or explicitly requested
- Do not "improve" a reference design — match it exactly
- Do not stop after one screenshot pass when comparing against a reference
- Do not use `transition: all` — always specify the property explicitly
- Do not use default Tailwind blue/indigo as primary color
- Do not use Tailwind classes at all — this project uses inline styles exclusively

---

## Brand Assets

- Always check the `public/` folder before designing. It may contain logos, color guides, or brand images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. The color palette is defined above — do not invent brand colors.

---

## Navigation

Every public page has its own nav bar (there is no global layout nav).
The active page link gets `borderBottom: "1px solid #1a1a1a", paddingBottom: 2` added to its style.
Nav links — general: WORK, ABOUT, RÉSUMÉ, CONTACT (logo = home). Audio: PROJECTS, PRODUCTS, ABOUT, CONTACT. See `components/MobileNav.tsx`.

Standard nav block:
```tsx
<nav style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "24px 48px",
  borderBottom: "1px solid #ddd",
  background: "#f8f6f1",
  position: "sticky",
  top: 0,
  zIndex: 100,
}}>
  <Link href="/" style={{ fontFamily: "'Georgia', serif", fontWeight: "bold", fontSize: 18, letterSpacing: "0.05em", textDecoration: "none", color: "#1a1a1a" }}>
    SHARKBOMB AUDIO
  </Link>
  <div style={{ display: "flex", gap: 32, fontSize: 14, letterSpacing: "0.08em" }}>
    <Link href="/" style={{ textDecoration: "none", color: "#1a1a1a" }}>HOME</Link>
    <Link href="/projects" style={{ textDecoration: "none", color: "#1a1a1a" }}>PROJECTS</Link>
    <Link href="/products" style={{ textDecoration: "none", color: "#1a1a1a" }}>PRODUCTS</Link>
    <Link href="/about" style={{ textDecoration: "none", color: "#1a1a1a" }}>ABOUT</Link>
    <Link href="/contact" style={{ textDecoration: "none", color: "#1a1a1a" }}>CONTACT</Link>
  </div>
</nav>
```

Standard footer block:
```tsx
<footer style={{ borderTop: "1px solid #ddd", padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "#aaa", letterSpacing: "0.08em" }}>
  <span>© {new Date().getFullYear()} SHARKBOMB AUDIO</span>
  <span>ELECTRICAL ENGINEERING · AUDIO EQUIPMENT</span>
</footer>
```

---

## Image Handling

### Upload flow
1. Client calls `POST /api/upload` with a `FormData` containing a `file` field
2. Route uploads to Cloudinary under the `portfolio` folder with `w_1200,q_auto,f_auto` optimization
3. Route returns `{ url: string }` (the optimized `secure_url`)
4. Client stores the URL

### Gallery component
- `components/ImageGallery.tsx` — client component
- Accepts `images: ProjectImage[]`
- Renders a responsive auto-fit grid (`minmax(220px, 1fr)`)
- Click any thumbnail → fullscreen lightbox with left/right arrow navigation and Escape to close
- Used on `app/projects/[slug]/page.tsx`

### Admin image field
- `components/admin/ProjectImagesField.tsx` — client component
- Accepts `value: Img[]` and `onChange`
- Uploads files to `/api/upload`, reads response `data.url`
- Supports reordering (↑↓) and removal
- Used in `ProjectForm` (shared by `admin/new` and `admin/[id]/edit`)

---

## Admin Panel

- Located at `/admin` — no authentication is currently enforced on routes
- `/admin` — lists all projects with edit/delete links
- `/admin/new` — create new project (client component, posts to `/api/admin`)
- `/admin/[id]/edit` — edit existing project (server component with server action)

### Creating a project (`/api/admin` POST)
Accepts JSON body:
```typescript
{
  title: string,
  slug: string,
  summary: string,
  contentMd: string,      // markdown content
  tech: string[],
  coverImage: string | null,
  demoUrl: string | null,
  repoUrl: string | null,
  isProduct: boolean,
  images: { url: string, alt?: string }[]
}
```

### Updating a project (server action in `app/admin/[id]/edit/page.tsx`)
Uses `FormData`. Images are passed as a JSON string in a hidden input named `images`.
The `isProduct` checkbox submits `"true"` or nothing (falsy).

---

## Key Patterns

### Server components fetch data directly
```typescript
const project = await prisma.project.findUnique({
  where: { slug },
  include: { images: { orderBy: { order: "asc" } } },
});
```

### All pages use `export const revalidate = 0`
This disables Next.js caching so data is always fresh from the database.

### Markdown
- Written using `@uiw/react-md-editor` in admin forms
- Stored as raw markdown string in `project.content`
- Rendered using `react-markdown` on the public project detail page

### Separate audio copy
- `audioSummary` and `audioContent` (nullable) override `summary`/`content` when a project is viewed in audio mode (`?from=audio`, `/audio/*`). Empty falls back to the portfolio copy (`summaryFor` in `components/ProjectCard.tsx`).
- The admin form shows the audio fields only while the Audio area is ticked. Form parsing is shared in `lib/admin-form.ts`.

### `isProduct` flag
- Boolean field on `Project` model
- When `true`, the project appears on both `/projects` (with a "Product" badge) and `/products`
- Toggled via checkbox in the admin edit and new project forms

### Event handlers in Server Components
- Server components (no `"use client"` directive) cannot use `onMouseEnter`, `onMouseLeave`, `onClick`, or any other event handlers
- If hover effects or interactivity are needed on a server-rendered page, extract the interactive part into a separate client component file with `"use client"` at the top

---

## Deployment

- **Platform:** Vercel
- **Trigger:** Push to `main` branch on GitHub auto-deploys
- **Build command:** `prisma generate && next build`
- **postinstall:** `prisma generate` (runs on Vercel during `npm install`)
- To trigger a redeploy without code changes:
  ```bash
  git commit --allow-empty -m "Trigger redeploy"
  git push origin main
  ```
- After changing Vercel environment variables, always redeploy for changes to take effect
- To push code changes:
  ```bash
  git add .
  git commit -m "your message here"
  git push origin main
  ```

---

## Common Issues & Solutions

| Problem | Solution |
|---|---|
| `Unknown field 'images' for include` | Run `npx prisma generate`, restart dev server |
| `Table does not exist` | Run `npx prisma db push` |
| `Module not found: @/components/...` | Components are at root `/components/`, not `/app/components/` |
| `Module not found: @/lib/prisma` | `@/` maps to project root, check `tsconfig.json` paths |
| Red squiggle on new Prisma field | Run `npx prisma generate` then restart TS server |
| Changes not showing on live site | Add `export const revalidate = 0` to the page |
| `npm run dev` fails with ENOENT | You're in the wrong directory — run `cd portfolio-site` first |
| Duplicate property TypeScript error | Search for duplicate key names in the same object literal |
| Vercel build fails after schema change | `prisma db push` updates the shared Neon DB directly — no migration needed |
| Upload returns undefined URL | `ProjectImagesField` reads `data.url`, upload route returns `{ url }` |
| Event handler error in server component | Extract interactive element into a `"use client"` component |
| Vercel build: duplicate object property | TypeScript catches duplicate keys — search the file for the property name and remove the duplicate |
| New env variable not working on Vercel | Must redeploy after adding/changing env vars in Vercel dashboard |
