# 🏗 Architecture Overview

## Tech Stack

```
Frontend:     Next.js 15 (App Router) + TypeScript + Tailwind CSS
Blockchain:   Solana Web3.js + Anchor + Token-2022 + Metaplex Core
Auth:         Supabase (Google OAuth, GitHub OAuth)
CMS:          Sanity
Analytics:    PostHog + Google Analytics 4 + Sentry
Editor:       Monaco Editor
Deployment:   Vercel
```

---

## Folder Structure

```
app/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout + all providers
│   ├── globals.css               # Global styles + animations
│   ├── courses/
│   │   ├── page.tsx              # Course listing
│   │   └── [slug]/
│   │       ├── page.tsx          # Course detail
│   │       └── lessons/[id]/     # Lesson + Monaco editor
│   ├── dashboard/page.tsx        # User dashboard
│   ├── practice/page.tsx         # Practice arena
│   ├── daily/page.tsx            # Daily challenge
│   ├── leaderboard/page.tsx      # Global leaderboard
│   ├── community/page.tsx        # Community forum
│   ├── profile/[username]/       # Public profiles
│   ├── settings/page.tsx         # User settings
│   ├── admin/page.tsx            # Admin dashboard
│   ├── onboarding/page.tsx       # Skill assessment quiz
│   └── studio/[[...tool]]/       # Sanity CMS studio
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Top navigation + language switcher
│   │   └── Footer.tsx            # Site footer
│   └── providers/
│       └── PostHogProvider.tsx   # PostHog analytics wrapper
│
├── context/
│   ├── AuthContext.tsx           # Supabase auth state
│   ├── XPContext.tsx             # XP + level state
│   ├── LanguageContext.tsx       # i18n language state
│   ├── ThemeContext.tsx          # Dark/light theme
│   ├── WalletProvider.tsx        # Solana wallet adapter
│   └── GamificationProvider.tsx  # Toast animations + confetti
│
├── lib/
│   ├── i18n.ts                   # EN/PT/ES translations
│   ├── mockData.ts               # Course + challenge data
│   ├── constants.ts              # App-wide constants
│   ├── utils.ts                  # Utility functions
│   └── onChain/
│       └── LearningProgressService.ts  # Solana program interface
│
├── sanity/
│   ├── schemas/                  # Course, lesson, author schemas
│   └── queries.ts                # GROQ queries
│
└── public/
    ├── manifest.json             # PWA manifest
    ├── solana-wordmark.svg       # Partner logos
    ├── superteam-br.jpg
    ├── superteam-banner.jpg
    ├── metaplex.jpg
    ├── helius.jpg
    ├── anchor.png
    └── phantom.jpg
```

---

## Provider Tree

```
RootLayout
└── ThemeProvider
    └── LanguageProvider
        └── AuthProvider
            └── WalletProviderWrapper
                └── XPProvider
                    └── PostHogProvider
                        └── GamificationProvider
                            └── Navbar + Main + Footer
```

---

## On-Chain Architecture

```
User completes lesson
  ↓
LearningProgressService.recordProgress(wallet, courseId, lessonIndex)
  ↓
PDA: seeds = [b"progress", wallet.pubkey, courseId]
  ↓
Token-2022 XP minted → wallet (soulbound, non-transferable)
  ↓
On track completion:
Metaplex Core NFT credential issued → wallet
```

### Program Accounts

| Account | Seeds | Description |
|---------|-------|-------------|
| `LearningProgress` | `["progress", wallet, courseId]` | Per-user per-course progress |
| `CourseCompletion` | `["completion", wallet, trackId]` | Completed track record |
| XP Token Mint | — | Token-2022 soulbound mint |
| Credential NFT | — | Metaplex Core per track |

---

## Auth Flow

```
User clicks Sign In
  ↓
Supabase Google/GitHub OAuth
  ↓
Callback: /auth/callback
  ↓
Session stored in AuthContext
  ↓
Profile created/fetched from Supabase DB
  ↓
XP loaded from localStorage (keyed by wallet or user ID)
```

---

## i18n System

Translations live in `lib/i18n.ts` as a flat object tree:

```ts
translations[lang][section][key]

// Example:
translations["pt"]["nav"]["courses"] // → "CURSOS"
translations["es"]["dashboard"]["title"] // → "HOLA"
```

Language is stored in `localStorage` and provided via `LanguageContext`.

---

## Gamification System

The `GamificationProvider` exposes 5 methods:

| Method | Trigger | Animation |
|--------|---------|-----------|
| `showXP(amount, label)` | Lesson complete | Purple XP toast |
| `showLevelUp(level)` | Level threshold crossed | Green celebration + confetti |
| `showAchievement(title)` | Achievement unlocked | Gold trophy toast + confetti |
| `showStreak(days)` | 7/30/100 day milestone | Red flame toast |
| `showCourseComplete(title, xp)` | Course finished | Purple star toast + confetti |

---

## Analytics Events

| Event | Trigger | Tool |
|-------|---------|------|
| `$pageview` | Every page navigation | PostHog |
| `course_enrolled` | User enrolls in course | GA4 |
| `lesson_complete` | Lesson marked done | GA4 + PostHog |
| `xp_earned` | XP added to wallet | PostHog |
| `challenge_solved` | Practice challenge solved | PostHog |

---

## Deployment

```
GitHub (main branch)
  ↓ push
Vercel (auto-deploy)
  ↓ next build
Production: https://superteam-academy-psi.vercel.app
```
