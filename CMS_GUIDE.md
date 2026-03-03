# 📝 CMS Guide

Superteam Academy uses [Sanity](https://sanity.io) as its headless CMS for managing course content.

---

## Accessing the Studio

**Local:** http://localhost:3000/studio
**Production:** https://superteam-academy-psi.vercel.app/studio

You must be logged in with a Sanity account that has editor access to the project.

---

## Content Schemas

### Course
The main content type. Each course contains:

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Course title |
| `slug` | slug | URL-friendly identifier |
| `description` | text | Short course description |
| `track` | string | Learning track (Fundamentals, Anchor, DeFi, etc.) |
| `difficulty` | string | beginner / intermediate / advanced |
| `xp` | number | XP reward on completion |
| `duration` | string | Estimated time (e.g. "4 hours") |
| `lessons` | array | List of lesson references |
| `thumbnail` | image | Course cover image |

### Lesson
Individual lesson within a course:

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Lesson title |
| `slug` | slug | URL identifier |
| `content` | block | Rich text lesson content |
| `codeChallenge` | object | Starter code + solution + tests |
| `xp` | number | XP reward for completion |
| `hints` | array | Progressive hints list |

### Author
Content creator profile:

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Author display name |
| `bio` | text | Short biography |
| `avatar` | image | Profile picture |
| `wallet` | string | Solana wallet address |

---

## Adding a New Course

1. Go to `/studio`
2. Click **"Course"** in the left sidebar
3. Click **"Create new"**
4. Fill in all required fields
5. Add lessons by clicking **"Add item"** under Lessons
6. Click **"Publish"**

The course will immediately appear on the `/courses` page.

---

## Adding a New Lesson

1. Go to `/studio`
2. Click **"Lesson"** in the left sidebar
3. Click **"Create new"**
4. Fill in the title, content, and code challenge
5. Set the XP reward
6. Add hints (optional)
7. Click **"Publish"**
8. Go to the parent Course and add this lesson to its lessons array

---

## Code Challenge Format

Each lesson can have an interactive code challenge:

```json
{
  "starterCode": "// Write your Solana program here\nuse anchor_lang::prelude::*;\n\n#[program]\npub mod my_program {\n    // ...\n}",
  "solution": "// Complete solution code here",
  "tests": [
    {
      "name": "Test 1: Program initializes correctly",
      "input": "...",
      "expectedOutput": "..."
    }
  ]
}
```

---

## Environment Variables

Make sure these are set in your `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=zdkpw1y1
NEXT_PUBLIC_SANITY_DATASET=production
```

---

## Querying Content

Content is fetched using GROQ queries in `sanity/queries.ts`:

```ts
// Fetch all courses
export const coursesQuery = `*[_type == "course"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  description,
  track,
  difficulty,
  xp,
  duration,
  "lessonCount": count(lessons)
}`

// Fetch single course with lessons
export const courseBySlugQuery = `*[_type == "course" && slug.current == $slug][0] {
  ...,
  lessons[]-> {
    _id,
    title,
    slug,
    xp
  }
}`
```
