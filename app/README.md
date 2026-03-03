# 🚀 Superteam Academy

> The most advanced on-chain learning platform for Solana builders — built by Superteam Brazil.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-superteam--academy--psi.vercel.app-9945ff?style=for-the-badge)](https://superteam-academy-psi.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-14f195?style=for-the-badge)](LICENSE)
[![Built on Solana](https://img.shields.io/badge/Built%20on-Solana-9945ff?style=for-the-badge)](https://solana.com)

---

## 📖 Overview

Superteam Academy is a full-stack, on-chain learning management system for the Solana ecosystem. Learners complete interactive coding courses, earn **soulbound XP tokens** (Token-2022) directly to their wallet, and collect **verifiable NFT credentials** (Metaplex Core) — all permanently on-chain.

Built with a Bloomberg Terminal-inspired design aesthetic, it supports **English, Portuguese, and Spanish** — purpose-built for the Latin American Solana community.

---

## ✨ Features

### 🎓 Learning
- **Interactive Course System** — structured lessons with progress tracking
- **Monaco Code Editor** — write, run, and test Solana programs in-browser
- **Practice Arena** — 20+ coding challenges (Easy / Medium / Hard)
- **Daily Challenge** — fresh challenge every day with bonus XP
- **Onboarding Quiz** — skill assessment with personalized track recommendations
- **Hints & Solutions** — progressive hint system with auto-save

### 🔗 On-Chain
- **Soulbound XP Tokens** — Token-2022 minted per lesson completion
- **NFT Credentials** — Metaplex Core credentials per learning track
- **On-Chain Progress** — LearningProgressService with PDAs
- **Wallet Integration** — Phantom, Solflare, and all major Solana wallets

### 🏆 Gamification
- **XP & Level System** — earn XP, level up, unlock achievements
- **Streak Calendar** — daily learning streak tracking
- **Leaderboard** — global rankings by XP
- **Achievements System** — 10+ unlockable achievements
- **Skill Radar Chart** — visual competency map across Solana topics

### 👥 Community
- **Community Forum** — post questions, share builds, upvote answers
- **Builder Profiles** — public profiles with on-chain credentials
- **Admin Dashboard** — content and user management

### 🌍 Internationalization
- **3 Languages** — English, Português, Español
- **Language Switcher** — navbar toggle, persisted in localStorage
- Full translation coverage across all pages

### 🛠 Platform
- **Google OAuth + GitHub OAuth** — via Supabase Auth
- **Dark / Light Mode** — theme toggle with persistence
- **PWA Ready** — installable, offline-capable
- **Mobile Responsive** — fully optimized for all screen sizes
- **Sanity CMS** — headless CMS for course content management
- **PostHog Analytics** — pageview and event tracking
- **Sentry** — error monitoring
- **Google Analytics 4** — user behavior tracking

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React, TypeScript |
| Styling | Tailwind CSS, Framer Motion |
| Blockchain | Solana Web3.js, Anchor, Token-2022, Metaplex Core |
| Auth | Supabase (Google OAuth, GitHub OAuth) |
| CMS | Sanity |
| Database | Supabase PostgreSQL |
| Analytics | PostHog, Google Analytics 4, Sentry |
| Editor | Monaco Editor |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- A Solana wallet (Phantom recommended)

### Installation

```bash
# Clone the repo
git clone https://github.com/peace-dapps/superteam-academy.git
cd superteam-academy/app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your keys (see Environment Variables section below)

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

Create a `.env.local` file in the `app/` directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Solana
NEXT_PUBLIC_SOLANA_NETWORK=devnet

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga4_id
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

---

## 📁 Project Structure

```
app/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page
│   ├── courses/            # Course listing & detail
│   ├── dashboard/          # User dashboard
│   ├── practice/           # Practice arena
│   ├── daily/              # Daily challenge
│   ├── leaderboard/        # Global leaderboard
│   ├── community/          # Community forum
│   ├── profile/            # User profiles
│   ├── settings/           # User settings
│   └── admin/              # Admin dashboard
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── providers/          # Context providers
│   └── ui/                 # Reusable UI components
├── context/                # React contexts (Auth, XP, Language, Theme)
├── lib/
│   ├── i18n.ts             # Translations (EN, PT, ES)
│   ├── mockData.ts         # Course & challenge data
│   ├── constants.ts        # App-wide constants
│   └── utils.ts            # Utility functions
├── public/                 # Static assets & partner logos
└── sanity/                 # Sanity CMS schemas
```

---

## 🌐 Live Demo

🔗 **[superteam-academy-psi.vercel.app](https://superteam-academy-psi.vercel.app)**

### Demo Walkthrough
1. Visit the landing page — partner logos, learning paths, features
2. Browse **Courses** — filter by difficulty and track
3. Open a **Lesson** — interactive Monaco editor with test cases
4. Check the **Practice Arena** — coding challenges with XP rewards
5. View the **Leaderboard** — global XP rankings
6. Try the **Daily Challenge** — bonus XP for daily completion
7. Switch languages — 🇺🇸 EN / 🇧🇷 PT / 🇪🇸 ES via navbar
8. Toggle **Dark / Light** mode

---

## 🔗 On-Chain Architecture

```
Learning Flow:
User completes lesson
  → LearningProgressService.recordProgress(wallet, courseId, lessonIndex)
  → PDA: [b"progress", wallet, courseId]
  → Token-2022 XP minted to wallet
  → Metaplex Core credential NFT issued on track completion
```

### Program Accounts
- `LearningProgress` PDA — tracks per-user, per-course progress
- `CourseCompletion` PDA — records completed tracks
- XP Token Mint — Token-2022 soulbound mint
- Credential NFT — Metaplex Core per learning track

---

## 🏗 Roadmap

- [ ] Live Solana program deployment to mainnet
- [ ] Full Sanity CMS content migration
- [ ] i18n on all pages (courses, dashboard, practice)
- [ ] Lighthouse score 90+
- [ ] E2E tests with Playwright
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

This project is MIT licensed and open for contributions.

```bash
# Fork the repo
# Create your feature branch
git checkout -b feat/your-feature

# Commit your changes
git commit -m "feat: your feature description"

# Push and open a PR
git push origin feat/your-feature
```

---

## 👥 Built By

**[Superteam Brazil](https://superteam.fun/br)** — Empowering the Latin American Solana ecosystem.

| Role | Contributor |
|------|------------|
| Developer | [@peace-dapps](https://github.com/peace-dapps) |

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  <strong>Built with ❤️ by Superteam Brazil</strong><br/>
  <a href="https://superteam-academy-psi.vercel.app">Live Demo</a> · 
  <a href="https://github.com/peace-dapps/superteam-academy">GitHub</a> · 
  <a href="https://superteam.fun/br">Superteam Brazil</a>
</div>