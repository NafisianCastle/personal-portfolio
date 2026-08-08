# Deployment Guide

## Prerequisites

- GitHub account
- [Vercel account](https://vercel.com) (free tier is sufficient)
- Notion account with an integration set up
- EmailJS account

---

## Step 1 — Push to GitHub

```bash
git add .
git commit -m "feat: complete portfolio website"
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```

---

## Step 2 — Set up Notion

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations) and create a new **Internal integration**
2. Copy the **Internal Integration Secret** — this is your `NOTION_API_KEY`
3. Create a new **database** in Notion with these properties:

   | Property   | Type         | Notes                              |
   |------------|--------------|------------------------------------|
   | Title      | Title        | Post title (required)              |
   | Slug       | Text         | URL-friendly slug e.g. `my-post`   |
   | Published  | Checkbox     | Only checked posts are shown       |
   | Date       | Date         | Publication date                   |
   | Excerpt    | Text         | Short description for post cards   |
   | Tags       | Multi-select | e.g. Azure, .NET, Automation       |

4. Open the database, click **...** → **Add connections** → select your integration
5. Copy the **database ID** from the URL:
   `https://notion.so/workspace/`**`<DATABASE_ID>`**`?v=...`

---

## Step 3 — Set up EmailJS

1. Sign up at [emailjs.com](https://emailjs.com)
2. Create an **Email Service** (connect your Gmail/Outlook) — copy the **Service ID**
3. Create an **Email Template** with these variables:
   - `{{from_name}}` — sender's name
   - `{{from_email}}` — sender's email
   - `{{message}}` — message body
4. Copy the **Template ID** and your **Public Key** (Account → General)

---

## Step 4 — Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel auto-detects Next.js — no build settings needed
4. Under **Environment Variables**, add all variables from `.env.local.example`:

   | Variable                          | Value                        |
   |-----------------------------------|------------------------------|
   | `NEXT_PUBLIC_SITE_URL`            | `https://your-domain.com`    |
   | `NOTION_API_KEY`                  | `secret_xxx...`              |
   | `NOTION_DATABASE_ID`              | `xxxxxxxx...`                |
   | `NEXT_PUBLIC_EMAILJS_SERVICE_ID`  | `service_xxxxxxx`            |
   | `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | `template_xxxxxxx`           |
   | `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`  | `xxxxxxxxxxxxxxxxxxxx`       |

5. Click **Deploy** — your site will be live in ~60 seconds

---

## Step 5 — Custom Domain (optional)

1. In Vercel → your project → **Settings** → **Domains**
2. Add your domain (e.g. `nafisurrahman.dev`)
3. Follow the DNS configuration instructions (add an A record or CNAME at your registrar)
4. Update `NEXT_PUBLIC_SITE_URL` in Vercel env vars to match

---

## Step 6 — Notion Rebuild Webhook (auto-publish blog posts)

This lets you publish a post in Notion and have the site rebuild automatically without a code push.

1. In Vercel → your project → **Settings** → **Git** → scroll to **Deploy Hooks**
2. Create a hook named `notion-publish`, branch `main`
3. Copy the generated webhook URL (looks like `https://api.vercel.com/v1/integrations/deploy/xxx`)
4. In Notion, open your blog database → click **...** → **Automations** → **+ New automation**
5. Set trigger: **Property edited** → `Published` → `checkbox is checked`
6. Set action: **Send HTTP request**
   - Method: `POST`
   - URL: paste your Vercel webhook URL
7. Save the automation

Now whenever you check **Published** on a post in Notion, Vercel triggers a rebuild and the post goes live within ~60 seconds.

### Testing the webhook manually

```bash
curl -X POST "https://api.vercel.com/v1/integrations/deploy/<your-hook-id>"
```

---

## Step 7 — Verify production

After deployment, check:

- [ ] Site loads at your domain
- [ ] All sections render correctly
- [ ] Blog at `/blog` shows posts (if any are published in Notion)
- [ ] Contact form sends email (submit a test message)
- [ ] `/sitemap.xml` returns XML with your routes
- [ ] `/robots.txt` is accessible
- [ ] OG image shows correctly — paste your URL into [opengraph.xyz](https://opengraph.xyz)
- [ ] Lighthouse score — run from Chrome DevTools → Lighthouse → Mobile

---

## Updating content

| Content         | Where to edit                          |
|-----------------|----------------------------------------|
| Blog posts      | Notion database                        |
| Skills          | `src/data/skills.ts`                   |
| Experience      | `src/data/experience.ts`               |
| Projects        | `src/data/projects.ts`                 |
| Personal bio    | `src/components/sections/About.tsx`    |
| Profile photo   | Replace placeholder in `About.tsx` with `<Image>` |
| GitHub username | `src/components/sections/GitHubActivity.tsx` |
| Social links    | `src/components/sections/Contact.tsx`  |
| CV file         | Replace `public/Nafisur_Rahman_CV.pdf` |
| OG image        | Replace `public/og-image.svg` with a 1200×630 PNG |
