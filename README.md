# Avionics Boot Camp

Training app for Blue Horizon Rocketry's Avionics team: an interactive,
clickable skills tree that links each node to lesson content and tracks
per-user progress.

## Status

Following the recommended build order from the project brief:

1. **Schema** — done (`src/types.ts`)
2. **Static prototype** — done: clickable tree with placeholder lessons,
   no auth/DB yet. Progress is stored in `localStorage` under a fake
   "current user" so the color-coded states and prerequisite locking can
   be previewed.
3. Backend + database — not started
4. Authentication — not started
5. Progress tracking UI — in place for the static prototype; needs a
   real per-user backend and a lead/admin overview
6. Content + polish — lesson content is placeholder text; mobile layout
   is usable but not tuned

## Data model

- `SkillNode` — id, title, category, description, prerequisite IDs,
  lesson reference, tree layout position
- `Lesson` — content, linked skill node
- `User` — identity, role
- `Progress` — (user, skill node) → status, timestamp, optional sign-off

See `src/types.ts` and `src/data/`.

## Stack

- React + TypeScript + Vite
- React Router for navigation
- [@xyflow/react](https://reactflow.dev/) for the clickable node graph
- react-markdown for lesson content

## Development

```bash
npm install
npm run dev
```

Click any unlocked skill node to open its lesson placeholder and change
your progress status. Locked nodes (grayed out) require their
prerequisites to be marked complete first — try completing all four
Foundations nodes to unlock Track 1/2/3.
