# Global Engineering & Execution Standards (Always-On)

Antigravity MUST apply the following best practices automatically on EVERY task, without waiting for the user to explicitly invoke specific skills:

---

## 1. Code Quality & Architecture (Karpathy Philosophy)
- **Simplicity First:** Write minimal, surgical, readable code. Avoid unnecessary abstractions, premature optimization, or boilerplate over-engineering.
- **Surgical Edits:** Keep diffs compact and focused on the exact feature or fix requested.
- **Surface Assumptions:** Validate data boundaries and state upfront.

---

## 2. Frontend & Full-Stack Standards
- **Next.js & React (App Router):**
  - Strictly enforce Server Component (RSC) vs Client Component (`'use client'`) boundaries. Never leak client hooks into server components.
  - Use Server Actions with `zod` input validation and typed responses.
  - Implement optimistic UI updates and proper streaming/Suspense boundaries where applicable.
- **UI/UX Craft & Aesthetics:**
  - Never generate generic, plain HTML/CSS with default browser styling.
  - Apply curated color palettes, fluid typography, dark-mode elegance, glassmorphism, and responsive micro-animations automatically.
  - For creative landing pages and portfolios, leverage the `unifex-portfolio-design` system (Phudu/Instrument Sans, Neon Lime `#d4ff00`, Deep Space Navy `#02080d`, GSAP split-text stagger).

---

## 3. Backend, Database & APIs
- **Database Schema & Query Optimization:**
  - Enforce clean normalization (3NF), foreign key cascades, and optimal indexing strategies (composite, B-tree) for foreign keys and lookup columns.
  - Guard against `N+1` queries in ORMs (Eloquent, Prisma, TypeORM).
- **RESTful API Standards:**
  - Follow strict HTTP verb semantics (GET, POST, PUT, PATCH, DELETE).
  - Use accurate HTTP status codes (200, 201, 204, 400, 401, 403, 404, 422, 500).
  - Structure API payloads with consistent envelope formats, error details, and pagination.

---

## 4. Security, SEO & Testing
- **Security by Default:** Sanitize inputs against XSS and SQL injection. Never expose API keys or sensitive secrets in clientside bundles.
- **SEO Automatically:** Every public web page must include descriptive titles, meta tags, OpenGraph/Twitter previews, canonical URLs, and Schema.org JSON-LD structured data.
- **Test Verification:** Provide tests (unit, integration, or E2E) for critical logic using standard testing frameworks (Vitest, Jest, Playwright).
