# Infectech — Website Design & Build Brief (Expanded)

## 0. Purpose of this document

This is a production-ready creative + technical brief for designing and building the Infectech marketing website. It expands the original brief with real shipped work, a live flagship project, explicit content for every section (no filler placeholders), and enough technical detail that a design team or an AI build tool can go straight to implementation without guessing.

Reference bar: Stripe, Vercel, Linear, OpenAI, Notion, Framer, Anthropic. The visitor's first reaction should be **"these people build serious software,"** not "nice template."

---

## 1. Brand foundation

**Name:** Infectech
**Primary tagline:** Engineering Intelligent Digital Products.
**Secondary tagline (use in meta descriptions / secondary CTAs):** Building Software That Solves Real Problems.

**One-line positioning:** Infectech is a software engineering studio that designs, builds, and scales production systems — AI platforms, commerce infrastructure, and enterprise software — for companies that can't afford to ship something fragile.

**Mission statement (About section, ~40 words):**
Infectech partners with startups and enterprises to engineer complete digital ecosystems — not just websites or apps. We take products from first architecture diagram to production traffic, and we stay in the room for what happens after launch.

**Proof point to lead with:** Infectech isn't a portfolio of concepts — it's a working studio with live products currently processing real orders, real rent payments, and real HR workflows for paying users in production today. This is the single biggest differentiator versus a generic agency: every case study links to a real, running URL.

**Voice:** Confident, precise, technical-but-plain. Short declarative sentences. No exclamation points. No "cutting-edge," "synergy," "seamless," "revolutionize," or "game-changing." Say what the system does and who it's for.

---

## 2. Design system

Follow the brief's palette exactly — do not substitute a generic dark-mode default.

### 2.1 Color tokens

| Token | Hex / Value | Usage |
|---|---|---|
| `--color-bg-primary` | `#030712` | Page background |
| `--color-bg-surface` | `#0B1220` | Cards, panels, elevated surfaces |
| `--color-brand` | `#3B82F6` | Primary actions, links, accents |
| `--color-brand-hover` | `#60A5FA` | Hover/active state of brand color |
| `--gradient-brand` | `linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)` | CTA buttons, glow accents, chart highlights |
| `--color-text-primary` | `#FFFFFF` | Headings, primary body copy |
| `--color-text-secondary` | `#94A3B8` | Subheadings, captions, metadata |
| `--color-border` | `rgba(255,255,255,0.08)` | Card borders, dividers, table lines |
| `--color-border-hover` | `rgba(255,255,255,0.16)` | Hover state on bordered elements |

Add two utility tones derived from the brand blue for state feedback, since a real product site needs status color even if the brief didn't specify it: a muted green (`#22C55E` at low opacity for "live/success" badges — used on the Featured Projects section to mark shipped products) and a muted amber (`#F59E0B` at low opacity) for "in progress" badges (used once, on PrimeOMS).

### 2.2 Typography

- **Display / headings:** Space Grotesk — geometric, technical, slightly unusual without being trendy. Weights 500–700 only.
- **Body / UI:** Inter — weights 400–500.
- **Data / code / stats:** JetBrains Mono or Geist Mono for anything numeric (stat counters, tech-stack labels, code snippets) — this is the detail that signals "engineering," not "marketing."

Type scale (desktop): Hero H1 72–96px / 1.05 line-height / -0.02em tracking. Section H2 40–48px. H3 24–28px. Body 16–18px / 1.6 line-height. Caption/meta 13–14px, uppercase, 0.08em tracking, secondary text color.

### 2.3 Layout & components

Rounded corners: 12px for buttons/inputs, 16–20px for cards, 24px for large panels. Soft shadows only on hover/elevated states — never a flat drop shadow on static content. Glassmorphism used sparingly: floating navbar and modal/command-palette surfaces only (`backdrop-filter: blur(20px)` over `rgba(11,18,32,0.7)`), not on every card. Section vertical rhythm: 120–160px padding between major sections on desktop, 64–80px on mobile. Max content width 1280px, with the hero and featured-project visuals allowed to break to full-bleed.

**Signature element (the one thing this site is remembered for):** a recurring animated "systems diagram" motif — small nodes connected by flowing, pulsing lines representing data moving through a pipeline (stock → order → storefront → customer). This is not decoration; it's literally the shape of Infectech's own product, PrimeOMS. Use it as the hero background (subtle, slow, large-scale), and again as the connecting thread through the Development Process timeline (the "↓" arrows become live animated flow-lines instead of static glyphs). Nowhere else — this restraint is what makes it feel intentional rather than templated.

---

## 3. Site structure & content (section by section)

### 3.1 Hero

**Eyebrow label:** `SOFTWARE ENGINEERING STUDIO`

**Headline:**
Engineering Intelligent Software for Modern Businesses.

**Subheadline:**
We design and build AI platforms, commerce infrastructure, and enterprise software — from first architecture decision to production traffic, and everything after launch.

**Primary CTA:** Start Your Project
**Secondary CTA:** View Our Work (anchors to Featured Projects)

**Supporting proof line directly under the buttons (small, secondary-text color):** Live in production today: AI-powered HR platforms, e-commerce operating systems, and fintech-adjacent SaaS used by real businesses across Bangladesh and beyond.

**Background:** the systems-diagram node motif described in 2.3, animated slowly (nodes pulse on a 4–6s loop, connecting lines draw and fade), plus a large soft radial gradient glow in brand blue positioned upper-right, a faint moving grid at 3–4% opacity, and 1–2 blurred floating geometric shapes for depth. Motion must be ambient, not attention-grabbing — nothing should compete with the headline.

### 3.2 Trusted By

Since Infectech's real clients are its own products (AIHR is built for Daffodil Global AI; Grameen Pest Control's end clients include Square Group, Beximco, Bashundhara Group, Walton, Pran-RFL, and KFC Bangladesh), use an infinite marquee of **wordmarks, not fake logos**: Daffodil Global AI · Square Group · Beximco · Bashundhara Group · Walton · KFC Bangladesh · Pran-RFL. Label the row honestly: "Platforms we've built power businesses like:" — do not imply these companies are direct Infectech clients if they are end-customers of a product Infectech built; the copy should read "brands served through products we engineered," which is both accurate and impressive.

### 3.3 Services

Present as a 3-column card grid, each card: icon (Lucide), title, one-sentence description, "Learn more →" link.

1. **Custom Software Development** — Full-cycle product engineering, from spec to deployed system.
2. **AI Solutions** — Applied AI features, LLM integrations, and intelligent automation built into real products, not bolted on.
3. **SaaS Platforms** — Multi-tenant architecture, billing, and dashboards designed to scale past the first hundred users.
4. **Enterprise Systems** — Internal tools, ERPs, and workflow platforms built for organizations that can't tolerate downtime.
5. **Mobile Apps** — Native-feel mobile experiences for iOS and Android, sharing a backend with your web platform.
6. **Cloud Infrastructure & DevOps** — CI/CD, containerization, and infrastructure-as-code so deployments are boring, on purpose.
7. **Business Automation** — Replacing manual, spreadsheet-and-WhatsApp workflows with systems that run themselves.
8. **API Development** — Clean, documented, versioned APIs built to be integrated against for years.
9. **UI/UX Design & Product Strategy** — Interfaces designed around what a user actually does, not what the org chart looks like.

### 3.4 What We Build

Grid of product categories, each grounded in something Infectech has actually shipped where possible:

- **HR & Recruitment Platforms** — AI-driven candidate matching, engagement, and performance tools (see AIHR).
- **E-Commerce Operating Systems** — Order capture, courier logistics, and COD reconciliation for high-volume sellers (see the Daffodil F-Commerce OS and PrimeOMS).
- **PropTech / Rent Management** — Digital tools replacing paper ledgers for landlords and property managers (see Barighor).
- **Field-Service & Local Business Platforms** — Booking, service catalogs, and bilingual customer-facing sites for service businesses (see Grameen Pest Control).
- **AI Conversation & Analytics Tools** — Conversation intelligence and AI-assisted analysis products (see Sonic).
- **Business Dashboards & Admin Consoles** — Internal tools that make operational data usable, not just visible.
- **Fintech-adjacent Systems** — Payment and courier integrations (bKash, Nagad, Rocket, SSLCommerz, Pathao, RedX, Steadfast) wired into real transaction flows.
- **Custom Internal Tools** — Purpose-built software for teams whose workflow doesn't fit an off-the-shelf product.

### 3.5 Technology Stack

Interactive tabbed/filterable grid, grouped exactly as in the original brief:

- **Frontend:** React, Next.js, TypeScript, Tailwind CSS, Vue
- **Backend:** Node.js, FastAPI, Python, Go, Java, .NET
- **Database:** PostgreSQL, MongoDB, Redis, MySQL, Supabase
- **Cloud & DevOps:** AWS, Azure, Google Cloud, Docker, Kubernetes, Terraform
- **AI & ML:** OpenAI, Claude, Llama, Mistral, LangChain, vector databases, applied machine learning

Interaction: hovering a category dims the others and highlights logos with a subtle glow; clicking a logo can optionally reveal a one-line note on how Infectech has used it (e.g., "FastAPI — powers the AIHR matching engine").

### 3.6 Why Infectech

Feature-card grid (10 cards, 2–3 per row): Engineering First · Security Focused · Scalable Architecture · Enterprise Ready · Fast Delivery · Clean Code · Modern Tech Stack · Agile Process · Long-Term Partnership · Innovation Driven. Each card gets a one-sentence gloss written in plain language (e.g., "Enterprise Ready — built to pass a security review, not just a demo.").

### 3.7 Development Process

Vertical or horizontal timeline, connected by the animated flow-line signature element instead of static arrows:

**Discover → Research → Design → Architecture → Development → Testing → Deployment → Support**

Each step gets a 1–2 sentence description written from the client's point of view (what they experience at that stage, not internal jargon), plus a typical duration where relevant (e.g., "Discover — 3–5 days. We map the problem, the users, and the constraints before writing a line of spec.").

### 3.8 Featured Projects — real work, real links

This is the section that proves everything else on the page. Replace generic portfolio placeholders with the following, each rendered as a card with a live-status badge, short description, tech tags, industry tag, and an outbound "Visit live site ↗" link:

1. **AIHR** — *AI-powered HR & recruitment platform.*
   Status: **Live** · Industry: HR Tech / Enterprise SaaS
   AI-driven CV screening, candidate matching, video-interview analysis, attrition prediction, performance management, and workforce planning in one cloud platform.
   Tech: Next.js, AI/ML matching engine, cloud-native architecture
   Link: aihr.daffodilglobal.ai

2. **Daffodil — F-Commerce OS** — *Operating system for Facebook & Instagram sellers.*
   Status: **Live** · Industry: E-Commerce / SaaS
   Captures inbox orders automatically, routes each order to the best courier (Pathao, RedX, Steadfast, Paperfly, Carrybee), reconciles COD in seconds, and uses AI to flag risky orders before they cost the seller money. Integrates bKash, Nagad, Rocket, SSLCommerz, and Upay.
   Tech: AI order intelligence, multi-courier integration, payments infrastructure
   Link: fc.daffodilglobal.ai

3. **Barighor (বাড়িঘর)** — *Digital rent management for landlords.*
   Status: **Live** · Industry: PropTech / SaaS
   Replaces the paper rent notebook: automatic monthly invoicing, a self-serve tenant portal, multi-building dashboards, and full payment history — built bilingually for the Bangladesh market.
   Tech: Next.js, multi-tenant dashboard architecture
   Link: barighor.vercel.app

4. **Grameen Pest Control** — *Bilingual service platform for a 35-year-old pest control company.*
   Status: **Live** · Industry: Local Services / SMB
   A full bilingual (Bangla/English) service site with live WhatsApp booking, per-service landing pages, and package pricing — serving enterprise clients including Square Group, Beximco, Bashundhara Group, Walton, and KFC Bangladesh.
   Tech: Localized front-end, WhatsApp booking integration
   Link: grameenpestbd.com

5. **Sonic** — *AI conversation intelligence.*
   Status: **Live** · Industry: AI / Analytics
   An AI-powered platform for analyzing and surfacing insight from conversations at scale.
   Tech: Applied AI / NLP
   Link: sonic-cyan.vercel.app

6. **PrimeOMS — Unified E-Commerce Order Management & Front Store Platform** *(flagship / currently in development — badge it "In Progress" or "Building Now" in the amber tone from 2.1, and give it a visually larger card than the others since this is the current headline product)*
   Industry: E-Commerce Infrastructure
   A complete commerce operating system: one platform to manage stock, sales, orders, and public-facing storefronts, so a business runs its entire commerce operation — inventory, fulfillment, and the store customers actually see — from a single system of record instead of stitching together spreadsheets, a website builder, and a courier app.
   Suggested sub-features to spec out visually (as a small architecture diagram using the signature node motif): **Inventory & Stock** → **Order Management** → **Front Store** → **Fulfillment**, each shown as a connected node.
   CTA on this card specifically: "Follow along as we build" or "Get early access" — this card should read like a product teaser, not a closed case study, since it's live work-in-progress.

Filtering categories for the section: All · AI · E-Commerce · SaaS · HR Tech · Local Services.

### 3.9 Statistics

Animated counters, count up on scroll into view. Keep numbers honest and defensible rather than inflated boilerplate — suggested framing tied to real shipped work:

- **5** Live Products in Production
- **6+** Payment & Courier Integrations Shipped (bKash, Nagad, Rocket, SSLCommerz, Upay, Pathao, RedX, Steadfast, Paperfly, Carrybee)
- **25+** Technologies in Active Use
- **2** Markets Served (Bangladesh-based platforms, English + Bangla)
- **100%** In-House Engineering — no subcontracted delivery

(If Infectech later has verified totals for broader metrics like total users served or client satisfaction, swap these in — but don't publish placeholder numbers like "5M+ users" without a real source; on a "serious software" positioning, an unverifiable stat undermines trust more than a smaller, true one helps.)

### 3.10 Industries

Icon + label grid: Healthcare · Education · Finance · Retail & E-Commerce · Manufacturing · Government · Real Estate · HR & People Ops · Logistics · Agriculture · Energy · Telecommunications. Visually mark the industries with direct proof (E-Commerce, HR & People Ops, Real Estate, Local Services/Retail) as "active" — subtly brighter or with a small live-project count — versus the others shown as capability/expansion areas.

### 3.11 Testimonials

Use the real, sourced client quotes already collected from Infectech's shipped products rather than inventing agency-style testimonials — these are more credible because they're about the product, in the users' own words:

- *"Setup took 10 minutes. I wish I had this three years ago."* — Seller using the Daffodil F-Commerce OS, Chattogram
- *"AI analytics showed exactly which products were bleeding money."* — Seller using the Daffodil F-Commerce OS, Chattogram
- *"COD reconciliation went from three hours to thirty seconds."* — Seller using the Daffodil F-Commerce OS, Rajshahi
- *"Excel caused constant errors — now everything is automatic, with no room for mistakes."* (paraphrased from Bangla) — Landlord using Barighor, Chittagong
- *"Tenants can see their own balance now — they don't need to keep asking me."* (paraphrased from Bangla) — Landlord using Barighor, Sylhet

Present as a smooth carousel with the end-user's role and city, not headshots (avoid implying these are stock photos of named individuals). Caption the section honestly: "What people say about the products we've engineered" rather than "What our clients say about Infectech," since these are end-users of Infectech-built platforms.

### 3.12 Team

Minimal profile-card grid grouped by function (Leadership, Engineering, Design, AI, Product). Each card: photo, name, role, one-line specialty, LinkedIn/GitHub icon links. Keep this section honest to current team size — a 3–5 person studio presented as a lean, senior team reads as more credible ("small team, production systems") than a padded org chart.

### 3.13 Blog

Card grid pulling from categories: AI · Software Engineering · Cloud & Infrastructure · Security · Automation. Seed the first 3–4 posts with topics that flow naturally from real work, e.g. "What building an AI order-risk engine taught us about trust," "Reconciling COD payments at scale," "Designing a bilingual product for the Bangladesh market."

### 3.14 FAQ

Accordion, smooth height-animated expand/collapse. Suggested questions:

- What does a typical project timeline look like?
- Do you work with early-stage startups or only established companies?
- Can you take over or extend an existing codebase?
- How do you price projects — fixed scope or ongoing partnership?
- Do you offer support and maintenance after launch?
- Which industries and markets do you have the deepest experience in?

### 3.15 Contact

Large two-column section: left side is the pitch ("Let's Build Something Extraordinary."), right side is a form with fields — Name, Company, Email, Phone, Project type (dropdown from the Services list), Budget range, Timeline, Message. Submit CTA: "Send Project Inquiry." Confirm state after submit should read like a product, not a form: "Got it. We'll reply within one business day," in the interface's own voice.

### 3.16 Footer

Columns: **Company** (About, Careers, Contact) · **Services** (list from 3.3) · **Products** (link out to the five live products + PrimeOMS teaser) · **Resources** (Blog, FAQ) · **Legal** (Privacy, Terms). Social: LinkedIn, GitHub, Facebook, Instagram. Newsletter signup: single email field, "Subscribe." Copyright line with current year, auto-updating.

---

## 4. Motion & interaction spec

- Page load: brief, tasteful preloader (logo mark draws in, <1s), then hero content fades/slides in with a slight blur-to-sharp reveal.
- Scroll reveals: sections fade + translate-y 16–24px on enter, staggered for card grids (60–80ms stagger), using an IntersectionObserver-driven approach (Framer Motion `whileInView` in the React build).
- Buttons: magnetic hover on primary CTAs (cursor-follow within a small radius), glow-on-hover using the brand gradient, scale 1.02 on press.
- Cards: hover lift (translateY -4px, shadow deepens, border brightens to `--color-border-hover`) — consistent across Services, Projects, Team, Testimonials.
- Stats: count up once, on first scroll into view only.
- Process timeline: connecting line animates its stroke/opacity as the user scrolls through the steps, echoing the hero's flow-line motif.
- Respect `prefers-reduced-motion`: disable parallax, cursor effects, and auto-playing marquees/carousels for users who request it — replace with instant-state equivalents.
- Smooth scroll for in-page anchor navigation (services, projects, contact).

---

## 5. Technical requirements

- **Framework:** Next.js 15, React 19, TypeScript
- **Styling/UI:** Tailwind CSS, shadcn/ui component primitives
- **Animation:** Framer Motion for React-driven transitions/reveals, GSAP for the hero background node-diagram and timeline flow-lines specifically (canvas or SVG-driven, not DOM-heavy)
- **Icons:** Lucide
- **Rendering:** Server Components by default; client components only where interactivity requires it (forms, filters, carousels, command palette)
- **Images:** Next/Image with proper sizing and lazy loading
- **Performance target:** Lighthouse ≥ 95 across Performance, Accessibility, Best Practices, SEO
- **Accessibility:** semantic landmarks, visible keyboard focus states, alt text on all imagery, sufficient contrast against the dark palette (verify brand blue on `#030712` meets WCAG AA for body text; use white or `--color-text-secondary` for anything smaller than 18px on brand-blue backgrounds)
- **Modes:** dark mode as default/primary; light mode as a secondary toggle if scoped in
- **Premium components to include:** floating/blurred glass navbar, mega menu (Services + What We Build), animated buttons, glass cards, interactive timeline, animated stat counters, animated gradient backgrounds, syntax-highlighted code blocks (for any technical snippets in the blog or process section), sticky section behavior where it aids storytelling (not everywhere), infinite logo marquee, interactive FAQ accordion, portfolio gallery with filtering, command palette (`Cmd+K`) for quick navigation/search across services and projects

---

## 6. SEO

Optimize primary pages for: Software Development Company · AI Development Company · SaaS Development · Custom Software · Enterprise Software · Web Development · Mobile Development · Cloud Solutions · Digital Transformation · Technology Consulting. Each Featured Project card should carry structured data (schema.org `CreativeWork`/`SoftwareApplication` where applicable) and a real outbound link with `rel="noopener"` — genuine, verifiable case studies are themselves an SEO and trust asset that generic agency sites don't have.

---

## 7. Tone guardrails

Confident, professional, premium, technical, trustworthy, innovative, elegant, minimal. Never sound like a cheap outsourcing agency — the fastest way to avoid that is to keep pointing at real, live, linked products instead of adjectives. Avoid superlatives that aren't backed by a stat or a link on the same screen.
