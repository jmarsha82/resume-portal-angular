# Resume Portal Angular

Angular front-end-only update of the resume portal. It preserves the programmer profile, artist profile imagery, developer resources, and adds a Games section with browser-native versions of BreakBricksGame, Snake, and Tetris.

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

Karma/Jasmine with ChromeHeadless is configured as the Angular test framework. Coverage is gated at 90% line coverage in `karma.conf.js`.

## Environment

This app does not use a backend or database and does not require secrets. `.env.example` is included only as a safe local template for future tooling. Keep real `.env` values out of source control.

## Notes

- Theme mode is saved in `localStorage` so dark/light mode persists during future visits.
- Mobile layouts use a single-column flow and disable horizontal overflow.
- The native C++ and Python game ideas were ported into TypeScript/canvas so the app remains static, secure, and browser playable.
