# Resume Portal Angular

Angular front-end-only update of the resume portal. It preserves the programmer profile, artist profile imagery, developer resources, and adds a Games section with browser-native versions of BreakBricksGame, Snake, and Tetris plus the ML Pack workbench.

## Requirements

- Node.js 20.19 or newer
- npm

## Setup

```bash
npm install
```

## Run Locally

```bash
npm start
```

Open `http://localhost:4200/`.

## Build

```bash
npm run build
```

The production build outputs to `dist/resume-portal-angular`.

## Tests And Coverage

```bash
npm run test:coverage
```

Karma/Jasmine with ChromeHeadless is configured as the Angular test framework. Coverage is gated at 90% line coverage in `src/tests/karma.conf.js`.

All specs, shared test helpers, and Karma configuration are centralized under `src/tests`. See `src/tests/README.md` for the suite layout and contribution rules.

## Environment

This app does not use a backend or database and does not require secrets. `.env.example` is included only as a safe local template for future tooling. Keep real `.env` values out of source control.

## Notes

- Theme mode is saved in `localStorage` so dark/light mode persists during future visits.
- Mobile layouts use a single-column flow and disable horizontal overflow.
- The native C++ and Python game ideas were ported into TypeScript/canvas so the app remains static, secure, and browser playable.
- ML Pack preserves its original React/Vite interface in a dedicated `/games/mlpack` page. It runs in demo mode without a backend; an optional local C++17/mlpack service can provide native computations when available.
