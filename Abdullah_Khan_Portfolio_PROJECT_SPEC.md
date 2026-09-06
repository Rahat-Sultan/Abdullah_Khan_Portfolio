# Abdullah Khan Portfolio — Cursor/Kiro Build Brief

> **Agent usage rule:** This is the master specification. Cursor should read it during foundation setup, then create focused phase files under `docs/phases/`. Kiro should normally read `docs/STRUCTURE.md` + the current phase file + only relevant supporting docs, rather than rereading this entire file for every task.
>
> **Free-tier rule:** All tools/services must remain within their free versions/free tiers.

## Agent Workflow

```text
PROJECT_SPEC.md
      ↓
Cursor: foundation + documentation + initial frontend
      ↓
docs/STRUCTURE.md + phase files
      ↓
Kiro: implement one phase at a time
      ↓
Test → Fix → Update STRUCTURE.md → Next phase
```

### Mandatory rules
- The provided resume file is the source of truth for Abdullah's professional data.
- Never fabricate experience, skills, clients, metrics, education, certifications, testimonials, or links.
- Cursor must inspect the resume and create `docs/RESUME_DATA.md`.
- Kiro must build the frontend, not only backend/database functionality.
- `docs/STRUCTURE.md` must be updated whenever files/folders/routes/components/data structures change.
- Prefer simple, fast, accessible solutions and avoid unnecessary dependencies.
- Do not introduce paid services.
- Never expose Supabase service-role secrets to client-side code.
- Test affected work with lint/type-check/build as appropriate.

---

# Abdullah Khan — Personal Portfolio Website
## Master Project Specification & Cursor Build Brief

> **Purpose:** This document is the master brief for building a production-quality personal portfolio website for **Abdullah Khan**, a Digital Marketer, plus a secure admin portal.
>
> **Important:** All tools/services used for this project must remain within their **free tiers/free versions**. Do not introduce paid dependencies or services unless explicitly approved later.

---

# 1. Project Overview

Build a modern, highly polished personal portfolio website for:

**Name:** Abdullah Khan  
**Profession:** Digital Marketer

The website should feel premium, memorable, fast, responsive, and visually distinctive rather than like a generic portfolio template.

The visual identity should combine:

- Galactic/night atmosphere
- Deep dark backgrounds
- Stars/particles
- Subtle neon/glow effects
- Glassmorphism used sparingly
- Smooth transitions and micro-interactions
- A bright, colorful, glittery light theme
- Strong typography and visual hierarchy

**Default theme:** Dark / Galactic Night

The website must include a public portfolio and a protected admin portal.

---

# 2. Core Technology Stack

Use the following stack unless there is a strong technical reason to change something:

- **Next.js** — primary web framework
- **React** — UI
- **Node.js** — server-side functionality
- **Supabase** — database, authentication, and storage
- **Vercel** — deployment
- **Cursor** — foundation/planning/documentation/codebase preparation
- **Kiro** — primary implementation/development agent after the foundation is prepared
- **Particles.js / tsParticles** — optional background effects if performance remains good
- **Tailwind CSS** — styling
- **shadcn/ui** — reusable UI components where appropriate

### Free-tier rule

Before introducing any dependency, API, storage provider, analytics service, animation library, email service, CMS, or external API:

1. Verify that it has a usable free tier/free version.
2. Prefer built-in Next.js/React/browser functionality when practical.
3. Avoid unnecessary third-party services.
4. Never design a feature that silently requires a paid subscription.

---

# 3. Development Strategy

The project will use **Cursor for foundation + Kiro for implementation**.

## Cursor's responsibility

Cursor should establish the project foundation and create the documentation Kiro will follow.

Cursor should:

1. Initialize/prepare the project.
2. Establish the recommended folder structure.
3. Create the project documentation.
4. Create phase/task `.md` files.
5. Create the architecture and development rules.
6. Create/update `STRUCTURE.md`.
7. Define database requirements.
8. Define Supabase requirements.
9. Define UI/UX requirements.
10. Define security requirements.
11. Define performance requirements.
12. Create implementation instructions that Kiro can execute phase-by-phase.

Cursor should **not simply dump all implementation into one huge task**.

The project should be broken into manageable phases.

## Kiro's responsibility

After the foundation is prepared, Kiro should:

1. Read the master specification.
2. Read `STRUCTURE.md`.
3. Read the relevant phase `.md` file before starting that phase.
4. Implement the phase.
5. Test the implementation.
6. Fix issues.
7. Update `STRUCTURE.md`.
8. Update relevant phase documentation.
9. Document newly created files/folders.
10. Record important architectural decisions.
11. Never make major architectural changes without documenting them.

---

# 4. Documentation System

Create a documentation directory:

```text
docs/
├── README.md
├── STRUCTURE.md
├── ARCHITECTURE.md
├── DESIGN_SYSTEM.md
├── DATABASE.md
├── SECURITY.md
├── PERFORMANCE.md
├── DEPLOYMENT.md
├── phases/
│   ├── 01-foundation.md
│   ├── 02-design-system.md
│   ├── 03-public-pages.md
│   ├── 04-portfolio-projects.md
│   ├── 05-supabase.md
│   ├── 06-admin-portal.md
│   ├── 07-contact-system.md
│   ├── 08-polish-accessibility.md
│   └── 09-testing-deployment.md
└── decisions/
    └── ADR-001-initial-architecture.md
```

The exact structure may evolve, but `STRUCTURE.md` must always represent the current state of the repository.

---

# 5. STRUCTURE.md — Mandatory Living Document

`docs/STRUCTURE.md` is a **living project map**.

It must be updated whenever:

- A new file is created.
- A folder is created.
- A file is removed.
- A major file is moved.
- A feature is added.
- A database-related file is added.
- A route/API endpoint is added.
- An important architectural decision changes.

It should contain:

## Current project tree

```text
project-root/
├── app/
├── components/
├── lib/
├── public/
├── supabase/
├── docs/
└── ...
```

## File responsibilities

For important files, explain what they do.

Example:

```text
app/page.tsx
→ Main public home page.

components/portfolio/project-card.tsx
→ Reusable project card with hover effects and image carousel.

lib/supabase/server.ts
→ Server-side Supabase client configuration.
```

## Current implementation status

Use statuses such as:

- `[ ] Not started`
- `[~] In progress`
- `[x] Completed`
- `[!] Needs attention`

## Recent changes

Keep a short changelog of structural changes.

---

# 6. Phase-Based Development

## Phase 01 — Foundation

Goals:

- Initialize Next.js project.
- Configure TypeScript.
- Configure Tailwind.
- Configure shadcn/ui if useful.
- Establish folder structure.
- Establish linting/formatting.
- Establish environment variable strategy.
- Create documentation.
- Create `STRUCTURE.md`.
- Establish reusable component architecture.
- Establish theme architecture.

Do not build the entire application in this phase.

---

# 7. Phase 02 — Design System

Create a coherent visual system.

## Dark theme

Default appearance:

- Deep black/navy/indigo background
- Galactic gradients
- Stars
- Subtle purple/blue/cyan/pink glow
- Bright text with clear hierarchy
- Soft glass panels
- Elegant borders
- Controlled neon accents

Avoid making every element glow.

The design should feel:

**Premium + futuristic + professional + digital marketing oriented**

not:

**Gaming website + overloaded neon effects**

## Light theme

The light theme should feel:

- Bright
- Colorful
- Glittery
- Clean
- Energetic
- Professional

It should not simply be the dark theme with white backgrounds.

Create a genuinely designed light mode.

---

# 8. Theme Toggle

At the top navigation area, create a theme toggle.

Default:

**Dark**

Interaction:

- Toggle is compact initially.
- On hover, it expands/spreads.
- It reveals two options:
  - Dark
  - Light
- Selecting an option changes the theme.
- Theme preference should persist across visits when practical.
- Respect the user's system preference only if it does not conflict with the requirement that dark is the initial default.

The animation should be smooth and accessible.

On mobile, the interaction must remain usable without relying on hover.

---

# 9. Galactic Background

A particle/star background is recommended.

Possible implementation:

- tsParticles / particles.js
- CSS-based stars
- Canvas-based lightweight star field

Prioritize performance.

The background should:

- Be subtle.
- Not interfere with text.
- Not cause excessive CPU usage.
- Reduce or simplify animation on low-power devices.
- Respect `prefers-reduced-motion`.

Do not use particles everywhere. The main landing area can have the strongest effect.

---

# 10. Global Navigation

Public navigation:

```text
Home
Work
Services
About
Notes
Contact
```

Include:

- Abdullah Khan branding/name
- Navigation
- Theme toggle
- Responsive mobile menu
- Clear active-page state

Navigation should remain accessible and keyboard-friendly.

---

# 11. Public Pages

Required pages:

```text
/
 /work
 /services
 /about
 /notes
 /contact
```

You may add supporting routes when useful, for example:

```text
/work/[slug]
/notes/[slug]
```

---

# 12. Loading Animation

Create a small initial loading experience.

It should display:

**Loading**

**Abdullah Khan**

**Digital Marketer**

The animation should be:

- Short
- Elegant
- Smooth
- Non-blocking
- Skippable/disabled when appropriate for accessibility/performance

Do not create a long loading screen.

The site should feel fast.

---

# 13. Home Page

The Home page should contain the following sections.

## 13.1 Hero / Landing Section

Include:

- Abdullah Khan's profile picture
- Name
- Digital Marketer title
- Strong personal tagline
- Short introduction
- Primary CTA
- Secondary CTA

Suggested CTA directions:

```text
View My Work
Let's Work Together
```

The exact copy can be refined later.

Visual ideas:

- Galactic background
- Profile image glow
- Floating decorative elements
- Subtle animated stars
- Gradient typography
- Soft entrance animation

Do not over-animate.

---

# 14. About Me Section

Include:

- Professional introduction
- Abdullah's marketing philosophy
- Skills/expertise
- Experience highlights
- Key achievements/statistics where real data is available
- Profile image or secondary visual
- Resume download CTA

Do not invent achievements.

If content is missing, create clearly marked placeholders/content configuration.

---

# 15. Resume Download

Provide a visible:

**Download Resume**

button.

The resume should be served from the application/public storage or another approved free Supabase storage setup.

The implementation should make it easy for the admin to replace the resume later.

Do not hardcode a fragile external URL.

---

# 16. Services Section

Display the services Abdullah provides.

Potential service categories:

- Digital Marketing
- Social Media Marketing
- SEO
- Content Strategy
- Paid Advertising
- Brand Strategy
- Lead Generation
- Marketing Analytics

These are examples only.

Use the client's actual services once supplied.

Each service should have:

- Icon/visual
- Name
- Short description
- Optional CTA
- Hover interaction

The design should be consistent with the overall visual identity.

---

# 17. Recent Projects

Create a premium project portfolio section.

Projects should use reusable **Project Cards**.

Each card should display:

- Project image
- Project title
- Category
- Short description
- Optional tags
- Optional metrics
- CTA

## Hover interaction

When hovering over a project card:

- Card should lift slightly.
- A background glow should appear.
- Image should subtly zoom.
- Overlay information can appear.
- Transitions should remain smooth.

Avoid excessive blur/glow.

---

# 18. Project Image Carousel

A project can have one or multiple images.

If a project contains multiple images:

- Images automatically rotate in order.
- Transition should be smooth.
- Slideshow should start when the user is viewing/hovering the card.
- When the user stops viewing/interacting with the card, reset the slideshow to image #1.
- Do not continue expensive animation for cards outside the viewport.
- Pause when the tab is inactive where practical.
- Respect `prefers-reduced-motion`.

On mobile, replace hover-only behavior with a touch-friendly interaction.

---

# 19. Project URLs

Admin should be able to add a URL to a project.

Important requirement:

**The raw URL must NOT be visibly displayed to the public user.**

Instead show a CTA such as:

```text
View Project
Visit Campaign
See Case Study
```

Clicking the CTA should redirect the visitor to the configured destination.

Implement URL handling safely.

Consider:

- Valid URL validation.
- HTTPS preference.
- Protection against malformed URLs.
- Safe external navigation behavior.
- Avoid rendering raw URLs in visible UI.

Do not allow arbitrary unsafe schemes such as:

```text
javascript:
data:
```

---

# 20. Testimonials

Create a Client Testimonials section.

Each testimonial may contain:

- Client name
- Client role/company
- Testimonial
- Profile image/avatar
- Rating if provided
- Project/category

Use an elegant carousel/grid.

Do not fabricate testimonials.

If no real testimonials are provided, use placeholders that are clearly marked as content to be replaced.

---

# 21. Get In Touch

Create a strong contact CTA/section.

Include a form with fields such as:

```text
Name
Email
Subject
Message
```

Optional:

```text
Company
Budget
Service Interested In
```

The form should be connected to the admin portal.

When a visitor submits:

1. Validate the input.
2. Sanitize/normalize where appropriate.
3. Store the message in Supabase.
4. Associate it with a timestamp/status.
5. Make it visible inside the admin portal.
6. Show a clear success/error state to the visitor.

Do not expose Supabase secret keys to the client.

---

# 22. Work Page

The `/work` page should be a complete portfolio experience.

Include:

- Featured projects
- Project categories
- Search/filter if useful
- Project cards
- Project detail pages if needed
- Responsive layouts

Project data should eventually come from Supabase rather than hardcoded arrays.

---

# 23. Services Page

The `/services` page should expand on the Home page services.

Include:

- Service overview
- Individual service sections/cards
- Process/workflow
- Benefits
- Relevant project examples
- CTA

Keep the content marketing-focused and professional.

---

# 24. About Page

The `/about` page should provide a deeper profile.

Possible sections:

- Introduction
- Story
- Expertise
- Skills
- Experience
- Achievements
- Marketing approach
- Resume
- CTA

Only use verified client information.

---

# 25. Notes Page

Create a notes/blog-style section.

Potential content:

- Marketing insights
- Case-study notes
- SEO tips
- Social media strategies
- Campaign lessons
- Personal professional observations

Notes should support:

- Title
- Slug
- Excerpt
- Content
- Cover image
- Published date
- Tags
- Published/draft state

A note detail route may use:

```text
/notes/[slug]
```

---

# 26. Contact Page

Create a dedicated `/contact` page.

Include:

- Contact form
- Professional contact information if provided
- Social links if provided
- CTA
- Availability statement if provided

The same Supabase-backed contact system should be used.

---

# 27. Admin Portal

Create a protected admin portal.

Suggested route:

```text
/admin
```

Possible structure:

```text
/admin
/admin/login
/admin/dashboard
/admin/projects
/admin/projects/new
/admin/projects/[id]
/admin/messages
/admin/notes
/admin/testimonials
/admin/settings
```

The exact route structure can be adjusted.

---

# 28. Admin Authentication

Use **Supabase Auth** unless a later architectural decision requires otherwise.

Admin portal must not be publicly accessible.

Requirements:

- Login
- Session management
- Logout
- Protected routes
- Server-side authorization checks
- No admin secrets in client-side code
- Secure database access through Supabase RLS

Do not rely solely on hiding admin routes.

---

# 29. Admin Dashboard

Dashboard should provide an overview such as:

- Total projects
- Published projects
- Draft projects
- Unread messages
- Notes
- Testimonials

Keep the dashboard simple and useful.

Do not create unnecessary charts if there is not enough real data.

---

# 30. Admin Project Management

Admin must be able to:

### Create projects

Fields:

```text
Title
Slug
Category
Description
Project URL
Images
Tags
Metrics
Featured
Published
Display Order
```

### Edit projects

Admin can update existing projects.

### Delete projects

Deletion should require confirmation.

### Publish/unpublish

Admin can control visibility.

### Reorder

Admin can control project display order.

---

# 31. Image Uploads

Use **Supabase Storage**.

Admin should be able to:

- Upload project images.
- Upload multiple images.
- Preview images.
- Remove images.
- Reorder images if practical.
- Replace images.

Use optimized image handling.

Do not load original huge images unnecessarily.

---

# 32. Resume Management

Admin should be able to replace Abdullah's resume.

Recommended:

- Store resume in Supabase Storage.
- Store/reference the current resume location in a settings/config table.
- Public site provides a download CTA.

---

# 33. Admin Notes Management

Admin should be able to:

- Create notes.
- Edit notes.
- Delete notes.
- Publish/unpublish.
- Upload cover images.
- Add tags.
- Set title/slug/excerpt.
- Manage publication date.

A lightweight editor is acceptable.

Avoid introducing a paid CMS.

---

# 34. Admin Testimonials Management

Admin should be able to:

- Add testimonials.
- Edit testimonials.
- Delete testimonials.
- Publish/unpublish.
- Add client information.
- Upload client image if provided.
- Reorder testimonials.

---

# 35. Admin Messages

The admin portal must receive messages submitted from the public contact forms.

Each message should include:

```text
Name
Email
Subject
Message
Created At
Status
```

Suggested statuses:

```text
Unread
Read
Replied
Archived
```

Admin should be able to:

- View messages.
- Mark as read.
- Mark as replied.
- Archive.
- Delete if necessary.

The dashboard should show unread message count.

---

# 36. Supabase Database

Design a normalized database.

Potential tables:

```text
profiles
projects
project_images
services
notes
testimonials
contact_messages
site_settings
```

Do not blindly create every table if a simpler schema is better.

The final schema should be documented in:

```text
docs/DATABASE.md
```

For each table document:

- Purpose
- Columns
- Types
- Relationships
- Indexes
- RLS policies
- Public/admin access

---

# 37. Supabase Row Level Security

RLS is mandatory.

Public users should only be able to access data intended for public display.

Examples:

Public:

- Published projects
- Published notes
- Published testimonials
- Public services

Admin:

- Full CRUD where authorized

Contact messages:

- Public users can submit through a controlled mechanism.
- Public users must NOT be able to read other messages.

Never expose unrestricted database access to the browser.

---

# 38. Environment Variables

Use environment variables for secrets.

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Only variables that genuinely need to be public should use `NEXT_PUBLIC_`.

The service role key must never be exposed to browser/client code.

Create/update:

```text
.env.example
```

Never commit real secrets.

---

# 39. Security Requirements

Security is a first-class requirement.

Must include:

- Supabase RLS
- Protected admin routes
- Server-side authorization
- Input validation
- Form validation
- URL validation
- Safe image upload handling
- No exposed service role key
- No secrets in Git
- Secure external links
- Reasonable rate limiting/abuse protection for public forms where practical
- Error messages that do not expose sensitive internals

Use server-side operations for privileged actions.

---

# 40. Performance Requirements

The site should load and run as fast as reasonably possible.

Prioritize:

- Server Components where appropriate
- Client Components only when interaction requires them
- Next.js Image optimization
- Lazy loading
- Code splitting
- Dynamic imports for heavy effects
- Minimal JavaScript
- Optimized images
- Proper caching/revalidation
- Avoid unnecessary database calls
- Avoid rendering hidden content repeatedly
- Pause off-screen animations
- Respect reduced-motion settings

Particle effects must not become a performance problem.

---

# 41. SEO

Implement basic professional SEO.

Include:

- Page titles
- Meta descriptions
- Open Graph metadata
- Twitter/X metadata where appropriate
- Canonical URLs where appropriate
- Semantic HTML
- Sitemap
- Robots configuration
- Structured data where useful

The site should represent Abdullah Khan professionally in search engines.

---

# 42. Accessibility

Follow accessibility best practices.

Requirements:

- Keyboard navigation
- Visible focus states
- Proper heading hierarchy
- Semantic HTML
- Alt text
- Accessible form labels
- Good contrast
- Reduced motion support
- Mobile usability
- Theme toggle accessible without hover
- No information conveyed only through color

---

# 43. Responsive Design

Must work well on:

- Desktop
- Laptop
- Tablet
- Mobile

Do not simply shrink the desktop UI.

Design mobile-specific behavior where needed.

Especially test:

- Navigation
- Theme toggle
- Project cards
- Image carousel
- Contact form
- Admin dashboard
- Tables/lists
- Modals/dialogs

---

# 44. Component Architecture

Use reusable components.

Suggested structure:

```text
components/
├── layout/
├── navigation/
├── theme/
├── hero/
├── portfolio/
├── services/
├── testimonials/
├── contact/
├── notes/
├── admin/
├── forms/
└── ui/
```

Use feature-based organization when it improves maintainability.

Avoid giant components.

Avoid duplicating the same UI logic across pages.

---

# 45. Data Architecture

Do not hardcode portfolio content throughout React components.

Separate:

- UI
- Data fetching
- Database access
- Validation
- Business logic

A project card should receive project data rather than querying Supabase itself.

Prefer a clean flow:

```text
Page
 ↓
Server data function
 ↓
Supabase
 ↓
Typed data
 ↓
Reusable component
```

---

# 46. Type Safety

Use TypeScript throughout the application.

Create reusable types for entities such as:

```text
Project
ProjectImage
Service
Testimonial
Note
ContactMessage
SiteSettings
```

Keep database types synchronized with Supabase where practical.

Avoid:

```ts
any
```

unless there is a justified reason.

---

# 47. Content Strategy

Do not invent personal facts about Abdullah.

Use placeholders for information that has not yet been provided:

```text
[ABDULLAH BIO]
[ABDULLAH PROFILE IMAGE]
[RESUME]
[PROJECT DATA]
[CLIENT TESTIMONIAL]
[CONTACT EMAIL]
```

Make content easy to replace.

Prefer storing editable content in Supabase where appropriate.

---

# 48. Visual Interaction Rules

Use animation intentionally.

Good examples:

- Fade-in
- Slide-up
- Soft scale
- Glow
- Image zoom
- Navigation transitions
- Card hover
- Button hover
- Theme transition

Avoid:

- Constant bouncing
- Excessive parallax
- Huge glowing text everywhere
- Long loading animations
- Animations that delay usability

Every animation should support the design.

---

# 49. Error & Empty States

Every dynamic section should handle:

- Loading
- Empty
- Error
- Success

Examples:

No projects:

```text
Projects coming soon.
```

No testimonials:

Do not render an awkward empty carousel.

Contact failure:

```text
We couldn't send your message. Please try again.
```

Admin upload failure:

Display a clear actionable message.

Do not expose stack traces to users.

---

# 50. Testing Checklist

Before considering the project complete, test:

## Public site

- [ ] Home
- [ ] Work
- [ ] Services
- [ ] About
- [ ] Notes
- [ ] Contact
- [ ] Theme toggle
- [ ] Mobile navigation
- [ ] Loading animation
- [ ] Project cards
- [ ] Multi-image carousel
- [ ] External project URLs
- [ ] Resume download
- [ ] Contact form

## Admin

- [ ] Login
- [ ] Logout
- [ ] Protected routes
- [ ] Dashboard
- [ ] Project CRUD
- [ ] Image uploads
- [ ] Project URLs
- [ ] Notes CRUD
- [ ] Testimonials CRUD
- [ ] Messages
- [ ] Resume management

## Technical

- [ ] RLS
- [ ] Environment variables
- [ ] No exposed secrets
- [ ] Responsive layout
- [ ] Accessibility
- [ ] SEO
- [ ] Performance
- [ ] Production build
- [ ] Vercel deployment

---

# 51. Git Workflow

Use feature branches.

Example:

```text
main
develop
feature/foundation
feature/design-system
feature/public-pages
feature/projects
feature/supabase
feature/admin
feature/contact
feature/polish
```

Keep commits focused.

Examples:

```text
feat: add responsive navigation
feat: add project card carousel
feat: add Supabase project repository
fix: reset project carousel on pointer leave
fix: protect admin routes
docs: update project structure
```

---

# 52. Kiro Operating Rules

Kiro must follow these rules throughout the project.

## Rule 1 — Read before editing

Before beginning work:

1. Read the relevant phase file.
2. Read `docs/STRUCTURE.md`.
3. Read relevant architecture/database/security documentation.

## Rule 2 — Work in phases

Do not implement unrelated features while working on a phase.

## Rule 3 — Keep STRUCTURE.md current

Any structural change must be reflected in `docs/STRUCTURE.md`.

## Rule 4 — Document decisions

If Kiro changes the planned architecture, document why.

## Rule 5 — Verify work

After implementation:

- Run lint.
- Run type checks.
- Run build where applicable.
- Test the affected feature.
- Fix errors before moving on.

## Rule 6 — Do not invent client data

Use placeholders until actual content is supplied.

## Rule 7 — Preserve performance

Do not add a library simply because it makes an animation easier.

## Rule 8 — Preserve free-tier compatibility

Do not introduce paid services.

## Rule 9 — Security first

Never expose secrets or bypass authorization for convenience.

## Rule 10 — Update documentation after completing work

Update:

```text
docs/STRUCTURE.md
```

and relevant phase documentation.

---

# 53. Recommended Build Order

Follow this sequence:

```text
Phase 01
Foundation
    ↓
Phase 02
Design System + Theme
    ↓
Phase 03
Public Pages
    ↓
Phase 04
Portfolio + Project System
    ↓
Phase 05
Supabase + Database + Storage
    ↓
Phase 06
Admin Portal
    ↓
Phase 07
Contact System
    ↓
Phase 08
Polish + Accessibility + SEO + Performance
    ↓
Phase 09
Testing + Production Deployment
```

If a later phase requires foundational work from an earlier phase, stop and complete the dependency properly rather than creating a temporary hack.

---

# 54. Definition of Done

The project is complete when:

1. The public portfolio is fully responsive.
2. Dark Galactic theme is the default.
3. Light theme is polished and colorful.
4. Theme toggle works on desktop and mobile.
5. Loading animation is implemented without unnecessarily slowing the site.
6. All required public pages exist.
7. Projects are dynamically managed.
8. Multi-image project cards work correctly.
9. Project URLs redirect without displaying raw URLs.
10. Testimonials work.
11. Contact forms save messages to Supabase.
12. Admin authentication is secure.
13. Admin can manage projects.
14. Admin can upload/manage project images.
15. Admin can manage notes.
16. Admin can manage testimonials.
17. Admin can receive/manage messages.
18. Admin can manage the resume.
19. Supabase RLS is configured.
20. No secrets are exposed.
21. Performance is optimized.
22. Accessibility is addressed.
23. SEO is implemented.
24. Production build succeeds.
25. Vercel deployment succeeds.
26. Documentation reflects the final codebase.
27. `STRUCTURE.md` accurately represents the final repository.

---

# 55. Immediate Cursor Task

Cursor should begin by doing **only the foundation/documentation phase**.

### Cursor's first job:

1. Inspect this specification.
2. Create the Next.js project structure if the repository is empty.
3. Create `docs/`.
4. Create all required documentation files.
5. Create the phase files.
6. Create `docs/STRUCTURE.md`.
7. Create `docs/ARCHITECTURE.md`.
8. Create `docs/DESIGN_SYSTEM.md`.
9. Create `docs/DATABASE.md`.
10. Create `docs/SECURITY.md`.
11. Create `docs/PERFORMANCE.md`.
12. Create `docs/DEPLOYMENT.md`.
13. Create `docs/README.md`.
14. Create `docs/decisions/ADR-001-initial-architecture.md`.
15. Establish the initial folder structure.
16. Document what is implemented and what is not.
17. Do **not** attempt to complete the whole website in one pass.

After that foundation is ready, Kiro should take over phase-by-phase.

---

# 56. Final Instruction to Coding Agents

Treat this file as the **source-of-truth product specification**.

Do not blindly follow a proposed implementation if it conflicts with:

1. Security
2. Performance
3. Accessibility
4. Maintainability
5. Free-tier constraints

When something is ambiguous:

- Prefer the simplest maintainable solution.
- Document the decision.
- Keep the architecture easy for another developer to understand.
- Avoid unnecessary dependencies.
- Never fabricate client information.

The final product should feel like a **premium personal brand website for a digital marketer**, not a generic developer portfolio.

The experience should communicate:

**Professional → Creative → Modern → Trustworthy → Results-oriented → Memorable**


# 57. Resume-Driven Content

The website should use Abdullah Khan's **actual resume as the initial source of truth for his professional/profile information**.

The resume should not only be available as a downloadable file. The project should also extract relevant information from the resume and use that data to populate the appropriate sections of the website.

## Resume Data

Where available, extract information such as:

- Full name
- Professional title
- Professional summary
- About/bio
- Work experience
- Job titles
- Companies/organizations
- Employment dates
- Responsibilities
- Achievements
- Skills
- Digital marketing specialties
- Education
- Certifications
- Awards
- Professional links
- Contact information
- Relevant professional metrics

**Do not invent information that is not present in the resume.**

If information is unavailable, leave the relevant field empty or use a clearly marked placeholder.

## Resume Data Flow

The preferred architecture is:

```text
Resume File
    ↓
Resume Text/Data Extraction
    ↓
Structured Profile Data
    ↓
Validation / Normalization
    ↓
Supabase
    ↓
Website
```

The frontend must **not parse the resume on every page load**.

The extracted information should be converted into structured data that can be reused throughout the application.

For example:

```text
profile
├── name
├── title
├── summary
├── about
├── skills[]
├── experience[]
├── education[]
├── certifications[]
└── links[]
```

## Admin Resume Workflow

The admin portal should allow the administrator to upload or replace Abdullah's resume.

When a new resume is uploaded:

1. Store the resume using Supabase Storage.
2. Extract its text/content.
3. Parse relevant professional information.
4. Convert the information into structured data.
5. Present the extracted information to the administrator for review.
6. Allow the administrator to edit/correct the extracted information.
7. Save the approved information.
8. Update the public website using the approved data.

The new resume data should **not automatically overwrite published profile information without review**.

Preferred flow:

```text
Upload Resume
      ↓
Extract Data
      ↓
Review / Edit
      ↓
Admin Approves
      ↓
Publish Updated Profile
```

## Resume Download

The original approved resume should remain available to public visitors through:

```text
Download Resume
```

The download should always point to the currently approved resume.

## Supported Formats

Use free/open-source or free-tier-compatible solutions for resume processing.

Do not introduce a paid resume-parsing API.

Support common formats where practical, especially:

```text
PDF
DOCX
```

If a file cannot be reliably parsed, provide a clear error and allow the administrator to manually enter or update the profile information.

## Source-of-Truth Rules

Use the following approach:

### Professional profile information

```text
Resume
  ↓
Extracted Data
  ↓
Admin Review/Edit
  ↓
Approved Profile Data
```

### Portfolio-specific information

The following should remain independently manageable from the admin portal:

```text
Projects
Project Images
Project URLs
Testimonials
Notes
Services
Contact Messages
```

A project does not need to appear in the resume in order to be added to the portfolio.

## Data Accuracy

Never fabricate:

- Work experience
- Client names
- Companies
- Certifications
- Education
- Marketing results
- Revenue figures
- Performance metrics
- Testimonials
- Skills
- Professional claims

If information is missing, use a placeholder or omit the section.

## Future Resume Updates

The architecture must support replacing the resume later without requiring major code changes.

```text
Existing Resume
      ↓
New Resume Upload
      ↓
Extract
      ↓
Review/Edit
      ↓
Approve
      ↓
Update Profile Data
```

This should be implemented as a reusable admin workflow rather than a one-time setup.
