# Card Game Challenge

A browser-based memory card game where the player flips cards to find matching pairs before the timer runs out.

## Installation

```bash
npm install
```

## Running

```bash
npm run dev      # Development server at http://localhost:5173
npm run build    # Production build
npm run preview  # Preview the production build locally
```

## Technical Decisions

### Framework: React + Vite

React was chosen for its component model, which maps naturally to the card-based UI, each card is an isolated, stateful unit.

### Styling: Tailwind CSS v4

Tailwind v4 integrates directly via `@tailwindcss/vite`, removing the need for a `tailwind.config.js`. The card flip animation is built entirely with Tailwind utility classes using CSS 3D transforms (`perspective`, `transform-3d`, `rotateY`, `backface-hidden`).

### Custom Hooks

Game logic is split into three focused hooks consumed by `GameScreen`:

- **`useMemoryGame`** , owns all card state: the shuffled deck, which cards are flipped, which are matched, and the click handler. When two cards are flipped, a 500 ms delay runs before resolving the match so the player can see both faces. Fires `onMatch` / `onNoMatch` callbacks, keeping sound and UI concerns out of the logic layer.

- **`useGameTimer`** , runs a 30-second countdown and navigates to `/results` on timeout (loss) or when all pairs are matched (win), passing the remaining time through router state.

- **`useGameSounds`** , manages four `Audio` objects (background music, correct, incorrect, ticking). Audio starts muted by default to comply with browser autoplay policies. The ticking sound triggers reactively when `timer === 10`.

### Project Structure

```
src/
├── assets/         # SVG card images and MP3 sound files
├── components/     # Reusable UI: Card, Button, Modal
├── constants/      # Card definitions (CARDS array with type/image pairs)
├── hooks/          # useMemoryGame, useGameTimer, useGameSounds
└── screens/        # StartScreen, GameScreen, ResultsScreen
```

Routing is handled by `react-router-dom`. `ResultsScreen` receives outcome data (`win`, `time`) via `location.state` from the router, avoiding global state management for a payload this small.
0
