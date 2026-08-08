# NEXT-STEPS.md — Manual Owner Setup Guide for playzy.me

Your production-grade web application for **playzy.me** is fully built, structured, and ready to ship. Because certain integrations require private third-party account credentials, follow this step-by-step checklist to connect your accounts:

---

## 1. Deploy to Vercel (or Preferred Hosting)
1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial launch commit for playzy.me"
   git remote add origin git@github.com:YOUR_USERNAME/playzy.me.git
   git push -u origin main
   ```
2. Import the repository in [Vercel](https://vercel.com).
3. Vercel will automatically detect **Next.js** and configure the build command (`npm run build`).

---

## 2. Domain DNS Setup (`playzy.me`)
In your domain registrar (Namecheap, Cloudflare, GoDaddy, etc.), set up the following DNS records pointing to Vercel:

| Type | Name | Value | Purpose |
| shadow | @ | `76.76.21.21` | A Record for root domain (`playzy.me`) |
| CNAME | `www` | `cname.vercel-dns.com` | Redirect `www.playzy.me` to root |

---

## 3. Google AdSense Setup
1. Apply for Google AdSense approval at [google.com/adsense](https://www.google.com/adsense) using `https://playzy.me`.
2. Once your publisher account is approved, copy your **Publisher ID** (format: `ca-pub-XXXXXXXXXXXXXXXX`).
3. Add your Publisher ID to your production environment variables (or `.env.local`):
   ```env
   NEXT_PUBLIC_ADSENSE_PUB_ID="ca-pub-XXXXXXXXXXXXXXXX"
   ```
4. The `<AdSlot />` components will automatically switch from placeholder state to rendering active AdSense ads across all articles.

---

## 4. Google Search Console & Sitemap Submission
1. Add `https://playzy.me` as a Domain Property in [Google Search Console](https://search.google.com/search-console).
2. Verify ownership via DNS TXT record provided by Google.
3. Submit your auto-generated sitemap URL:
   `https://playzy.me/sitemap.xml`

---

## 5. Google Analytics 4 (GA4) Activation
1. Create a GA4 Data Stream for `playzy.me` at [analytics.google.com](https://analytics.google.com).
2. Copy your Measurement ID (format: `G-XXXXXXXXXX`).
3. Set the environment variable:
   ```env
   NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
   ```
4. The `AnalyticsPlaceholder.tsx` component will immediately activate telemetry tracking.

---

## 6. Verify AI Crawlers & `llms.txt`
Once live, verify that AI search engines can index your site:
- Test access to `https://playzy.me/llms.txt` in your web browser.
- Test access to `https://playzy.me/robots.txt` to confirm `GPTBot`, `ClaudeBot`, and `PerplexityBot` are allowed.
