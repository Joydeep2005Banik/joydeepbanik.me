# 🛠️ How to Adapt This Portfolio for Yourself

This guide walks you step-by-step through customizing, branding, and deploying this portfolio template with your own details, projects, experiences, and domain.

---

## 📋 Table of Contents
1. [Fork & Setup](#1-fork--setup)
2. [Personal Information & Bio](#2-personal-information--bio)
3. [Avatar, Resume & Assets](#3-avatar-resume--assets)
4. [Projects Showcase](#4-projects-showcase)
5. [Experience Badges](#5-experience-badges)
6. [Live GitHub Activity Heatmap](#6-live-github-activity-heatmap)
7. [Contact Form Setup](#7-contact-form-setup)
8. [SEO, Favicon & Metadata](#8-seo-favicon--metadata)
9. [Deploying to Vercel with a Custom Domain](#9-deploying-to-vercel-with-a-custom-domain)

---

## 1. Fork & Setup

1. **Fork or clone this repository**:
   ```bash
   git clone https://github.com/Joydeep2005Banik/joydeepbanik.me.git my-portfolio
   cd my-portfolio
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) to view your site live as you edit.

---

## 2. Personal Information & Bio

All hero and bio information is located in **[`app/components/Intro.tsx`](app/components/Intro.tsx)**:

* **Name & Tagline** (lines ~32–65): Update your name, handle (`@username`), and title (e.g., `"Full Stack Engineer"`).
* **Bio Paragraphs** (lines ~70–100): Edit the text describing your background, interests, and current focus.
* **Date of Birth / Floating Age counter**: Open **[`app/components/Age.tsx`](app/components/Age.tsx)** and update line 9:
  ```ts
  const dob = new Date("YYYY-MM-DD");
  ```
* **Skill Badges**: Open **[`app/components/Skills.tsx`](app/components/Skills.tsx)** and modify the `skills` array with your primary tech stack.
* **Social Links**: Open **[`app/components/Socials.tsx`](app/components/Socials.tsx)** and update the `Links` array with your GitHub, LinkedIn, Instagram/X, and email addresses.

---

## 3. Avatar, Resume & Assets

Replace the files in the **[`public/`](public/)** directory with your own:

| File | Description | Recommended Dimensions |
| :--- | :--- | :--- |
| `public/avatar.png` | Your profile picture (square) | 512 × 512 px |
| `public/resume.pdf` | Your PDF resume displayed on `/resume` | Standard A4 / Letter PDF |
| `public/project-1.png` | Screenshot thumbnail for Project 1 | 16:9 ratio (e.g. 1280 × 720 px) |
| `public/project-2.png` | Screenshot thumbnail for Project 2 | 16:9 ratio |

---

## 4. Projects Showcase

All project cards are driven by **[`DB/projects.json`](DB/projects.json)**. 

To add or update a project, edit or append an object to the JSON array:

```json
{
  "title": "Your Project Name",
  "description": "Short 1-sentence overview. Supports **bold** highlights.",
  "details": "Extended paragraph shown when the user clicks 'read more'.",
  "tech": ["Next.js", "TypeScript", "Tailwind CSS"],
  "url": {
    "git": "https://github.com/your-username/repo-name",
    "live": "https://your-live-demo.com"
  },
  "image": "/project-1.png",
  "platform": "Web App",
  "date": "2026",
  "status": true
}
```

---

## 5. Experience Badges

Experiences are managed using markdown files in **[`posts/`](posts/)**. 

Create or edit files in `posts/` (e.g. `posts/My Role @ Company.mdx`). Only the 6-line YAML frontmatter at the top is needed:

```yaml
---
title: "Software Engineer Intern @ Company Name"
desc: "Brief summary of what you built, optimized, or researched."
date: "May 2026 – Present"
tags: ["Next.js", "TypeScript", "Docker"]
---
```

Experiences are automatically sorted chronologically (with `"Present"` and recent dates first).

---

## 6. Live GitHub Activity Heatmap

Open **[`app/components/GitHubActivity.tsx`](app/components/GitHubActivity.tsx)** and update line 7 with your GitHub handle:

```ts
const API_URL =
  "https://github-contributions-api.jogruber.de/v4/YOUR_GITHUB_USERNAME?y=last";
```

> **Tip:** In your GitHub account settings, make sure **"Private contributions"** is enabled under your profile contribution graph settings if you want commits to private repositories included.

---

## 7. Contact Form Setup

This portfolio is a static export, so contact messages are forwarded via [Formspree](https://formspree.io) without requiring any backend code:

1. Sign up for free at **[formspree.io](https://formspree.io)**.
2. Create a form and copy the endpoint URL (e.g. `https://formspree.io/f/mqkrwzpq`).
3. Add it to a `.env.local` file:
   ```env
   NEXT_PUBLIC_CONTACT_API="https://formspree.io/f/YOUR_FORM_ID"
   ```
4. *(Optional)* You can also set it as a default fallback on line 7 in [`app/contact/page.tsx`](app/contact/page.tsx):
   ```ts
   const CONTACT_API = process.env.NEXT_PUBLIC_CONTACT_API || "https://formspree.io/f/YOUR_FORM_ID";
   ```

---

## 8. SEO, Favicon & Metadata

1. **Favicon:** Use [favicon.io](https://favicon.io) to generate standard icon files and place them into `public/favicon/` and `public/favicon.ico`.
2. **Metadata & OpenGraph:** Open **[`app/layout.tsx`](app/layout.tsx)** and replace:
   - `metadataBase` with your domain (e.g. `https://yourdomain.com`).
   - Title, description, and Twitter handles (`creator`, `site`).
3. **Web Manifest:** Update your site name, short name, and theme colors in **[`app/manifest.ts`](app/manifest.ts)**.
4. **Sitemap:** Update `baseUrl` in **[`app/sitemap.ts`](app/sitemap.ts)**.

---

## 9. Deploying to Vercel with a Custom Domain

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: customize personal portfolio"
   git push origin main
   ```
2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) &rarr; **Add New... &rarr; Project**.
   - Select your repository and click **Import**.
   - In **Environment Variables**, add `NEXT_PUBLIC_CONTACT_API` with your Formspree endpoint.
   - Click **Deploy**.
3. **Add Your Custom Domain**:
   - In your Vercel Project &rarr; **Settings &rarr; Domains** &rarr; Add your domain (e.g. `yourname.com`).
   - Add the DNS records shown by Vercel in your domain registrar (e.g. Namecheap, Cloudflare, GoDaddy):
     - **A Record:** `@` &rarr; `76.76.21.21`
     - **CNAME Record:** `www` &rarr; `cname.vercel-dns.com`
   - Your site will be secured with automated free SSL within minutes!

