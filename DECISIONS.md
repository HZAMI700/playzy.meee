# DECISIONS.md — Autonomous Engineering & Design Choices Log

This document records key decisions made during the scaffold, design, implementation, and content architecture phases for **playzy.me**.

---

## 1. Domain & Brand Tone Positioning
- **Domain**: `playzy.me`
- **Tone Choice**: Smart, playful, trustworthy — "a friend who's actually done the research."
- **Rationale**: Avoided generic corporate SaaS stiffness and superficial meme-blog tropes. The tone uses first-person testing experiences ("we tested," "our benchmark shows") combined with clear data visualization.

---

## 2. Tech Stack Selection
- **Framework**: Next.js 15 (App Router), TypeScript, React 19.
- **Styling**: Tailwind CSS v4 with custom design tokens in `@theme` inline CSS variables (`globals.css`).
- **Typography**: Google Fonts via `next/font/google`:
  - Display / Headings: `Outfit` (bold, modern, distinctive).
  - Body Text: `Plus Jakarta Sans` (high legibility for long-form reading on mobile screens).
- **Content Engine**: File-based MDX loader using `gray-matter` + `reading-time` with custom React component mapping (`MDXRenderer.tsx`).
- **Rationale**: Choosing a pure file-based MDX loader eliminates complex build dependencies (e.g., Contentlayer version incompatibilities with modern Node 24/React 19) while guaranteeing sub-100ms static generation and instant LCP.

---

## 3. Dark & Light Mode Design System
- **Provider**: `next-themes` with `class` strategy.
- **Palette**:
  - Light Mode: Crisp Slate Canvas (`#f8fafc` background, `#0f172a` text, `#6366f1` electric indigo accent).
  - Dark Mode: Deep Midnight Navy (`#090d16` background, `#111827` card surface, `#f8fafc` text, `#a5b4fc` indigo glow).
- **Rationale**: Dark mode is completely custom-styled rather than a naive color inversion, reducing eye strain for developer audiences reading long technical code benchmarks.

---

## 4. Monetization & Ad Placement Architecture
- **Component**: `<AdSlot position="header" | "in-article-1" | "in-article-2" | "sidebar" | "bottom" />`
- **Behavior**:
  - When `NEXT_PUBLIC_ADSENSE_PUB_ID` environment variable is absent: Displays a subtle, non-intrusive dashed placeholder block indicating ad slot readiness.
  - When `NEXT_PUBLIC_ADSENSE_PUB_ID` environment variable is provided: Dynamically injects the official Google AdSense `<ins class="adsbygoogle">` tag.
- **Compliance Policy**: Placed in accordance with Google AdSense quality guidelines (no CLS layout shift, no accidental-click popups, maximum of 3-4 ad units per long-form page).

---

## 5. SEO & AI Crawler (LLM Citation) Optimization
- **`llms.txt`**: Created at `/public/llms.txt` following the emerging LLM indexing standard. Summarizes site purpose, content pillars, key article URLs, and author credentials.
- **`robots.txt`**: Explicitly permits AI user-agents (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot`) to crawl all routes.
- **JSON-LD Schemas**: Dynamic `TechArticle`, `FAQPage`, `BreadcrumbList`, `Organization`, and `Person` (author bios) embedded into every article page.
- **Direct-Answer TL;DR Box**: Placed at the top of every article inside a highlighted summary component, enabling AI assistants (ChatGPT, Claude, Gemini, Perplexity) to immediately extract direct answers.

---

## 6. Launch Content Selection (13 Comprehensive Articles)
We created 13 long-form launch articles across the 5 content pillars:
1. **AI Tools**: Claude 3.5 Sonnet vs GPT-4o, Best AI Coding Assistants (Cursor, Copilot, Supermaven), Midjourney v6 vs Flux.1.
2. **Software/SaaS**: Notion vs Obsidian, Linear vs Jira, Raycast Masterclass.
3. **Digital Money-Making**: Micro-SaaS AI Blueprint ($0 to $1k MRR), Freelance AI Consulting, Gumroad vs Lemon Squeezy vs Shopify.
4. **Productivity**: 80/20 Automation Stack (Zapier, Make, Python), Deep Work Zero-Notification Setup.
5. **Industry News**: Agentic AI Workflows, Open-Source AI vs Proprietary APIs.
6. **E-E-A-T & Institutional**: `/about` (Review Methodology & Testing Standards), `/author/[slug]`, `/privacy`, `/terms`, `/disclaimer`.
