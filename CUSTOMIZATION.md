# 🎨 Customization Guide

This guide explains how to customize Superteam Academy for your own community or deployment.

---

## Branding

### Colors
All brand colors are defined in `app/globals.css` and used as Tailwind custom colors:

| Color | Hex | Usage |
|-------|-----|-------|
| Purple | `#9945ff` | Primary brand, buttons, accents |
| Green | `#14f195` | Success, XP, live indicators |
| Red | `#ff3366` | Danger, streak, alerts |
| Background | `#020202` | Page background |
| Surface | `#0a0a0a` | Card backgrounds |
| Border | `#1a1a1a` | All borders |

To change the primary color, find and replace `#9945ff` across the codebase.

### Logo
Replace the `<Zap />` icon in `components/layout/Navbar.tsx` and `components/layout/Footer.tsx` with your own logo component or image.

### Fonts
Fonts are configured in `app/globals.css`:
- **Display font:** Used for headings (`font-display`)
- **Mono font:** Used for labels and code (`font-mono`)

---

## Adding a New Language

1. Open `lib/i18n.ts`
2. Add your language code to the `Language` type:
```ts
export type Language = "en" | "pt" | "es" | "fr"; // add "fr" for French
```
3. Copy the `en` translation block and add your translations:
```ts
fr: {
  nav: {
    courses: "COURS",
    leaderboard: "CLASSEMENT",
    // ...
  },
  // ...
}
```
4. Add the language to the switcher in `components/layout/Navbar.tsx`:
```ts
const languages = [
  { code: "en", flag: "🇺🇸", label: "English" },
  { code: "pt", flag: "🇧🇷", label: "Português" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "fr", flag: "🇫🇷", label: "Français" }, // add this
];
```

---

## Adding a New Course Track

1. Open `lib/constants.ts` and add your track:
```ts
export const TRACKS = {
  1: "Solana Fundamentals",
  2: "Anchor Developer",
  3: "DeFi Architect",
  6: "Your New Track", // add this
};
```
2. Add courses to `lib/mockData.ts` with `trackId: 6`
3. Or add the course via Sanity CMS studio

---

## XP & Level System

The XP formula is in `context/XPContext.tsx`:

```ts
// Current formula: level = floor(sqrt(xp / 100))
function getLevelFromXP(xp: number) {
  return Math.floor(Math.sqrt(xp / 100));
}
```

To change XP requirements, modify this formula. For example, for a linear progression:
```ts
function getLevelFromXP(xp: number) {
  return Math.floor(xp / 500); // level up every 500 XP
}
```

---

## Gamification Animations

Trigger animations anywhere in the app using the `useGamification` hook:

```tsx
import { useGamification } from "@/context/GamificationProvider";

function MyComponent() {
  const { showXP, showLevelUp, showAchievement, showStreak, showCourseComplete } = useGamification();

  return (
    <button onClick={() => showXP(100, "Lesson Complete")}>
      Complete Lesson
    </button>
  );
}
```

Available methods:

| Method | Parameters | Description |
|--------|-----------|-------------|
| `showXP` | `(amount, label?)` | Show XP earned toast |
| `showLevelUp` | `(level)` | Level up celebration + confetti |
| `showAchievement` | `(title, subtitle?)` | Achievement unlock + confetti |
| `showStreak` | `(days)` | Streak milestone toast |
| `showCourseComplete` | `(title, xp)` | Course completion + confetti |

---

## Changing the Solana Network

In `.env.local`:
```env
# For devnet (default)
NEXT_PUBLIC_SOLANA_NETWORK=devnet

# For mainnet
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
```

In `context/WalletProvider.tsx`, the network is read from this env variable.

---

## Deploying Your Own Instance

1. Fork the repository
2. Create a Vercel project from your fork
3. Set all environment variables in Vercel dashboard
4. Deploy!

Required environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
NEXT_PUBLIC_SENTRY_DSN=
```
