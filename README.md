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

All unit tests are centralized under `src/tests`:

- `src/tests/app`: app shell and routing contract tests
- `src/tests/games`: game engine and component behavior tests
- `src/tests/pages`: portfolio page rendering/content tests
- `src/tests/services`: shared service tests
- `src/tests/support`: reusable test helpers

Run the headless unit test suite:

```bash
npm test
```

Run unit tests with the enforced coverage gate:

```bash
npm run test:coverage
```

Karma/Jasmine with ChromeHeadless is configured as the Angular test framework. Coverage is gated at 90% line coverage in `src/tests/karma.conf.js`, and reports are written to `coverage/resume-portal-angular`.

`tsconfig.spec.json` only includes `src/tests/**/*.spec.ts`, so new specs should be added there. See `src/tests/README.md` for the full suite layout and contribution rules.

## GitHub Actions Pipeline

The CI workflow lives at `.github/workflows/ci.yml` and runs on pushes to `main`, `master`, and `codex/**`, plus pull requests targeting `main` or `master`.

- `Unit Tests and Coverage`: installs dependencies with `npm ci`, runs `npm run test:coverage`, enforces the 90% line coverage gate, and uploads the coverage report.
- `Production Build`: runs after unit tests pass, builds the Angular app with `npm run build`, and uploads the production artifact.
- `Dependency Review`: runs on pull requests with GitHub's dependency review action and blocks high-severity dependency changes.
- `npm Audit Advisory Report`: runs `npm audit --audit-level=high` as a non-blocking advisory report. It is non-blocking because the current Angular build toolchain reports high-severity transitive advisories that npm only offers to resolve with a breaking forced change.
- `Code Scanning / Quality`: runs CodeQL's JavaScript/TypeScript analysis with the `code-quality` analysis kind enabled and publishes findings to GitHub code scanning.
- `Code Scanning / Security`: runs CodeQL's `security-extended` JavaScript/TypeScript query suite and publishes security-focused findings to GitHub code scanning.
- `CI Summary`: checks that the required quality gates completed successfully.

Dependabot is configured in `.github/dependabot.yml` for weekly npm and GitHub Actions update pull requests.

## Environment

This app does not use a backend or database and does not require secrets. `.env.example` is included only as a safe local template for future tooling. Keep real `.env` values out of source control.

## Notes

- Theme mode is saved in `localStorage` so dark/light mode persists during future visits.
- Mobile layouts use a single-column flow and disable horizontal overflow.
- The native C++ and Python game ideas were ported into TypeScript/canvas so the app remains static, secure, and browser playable.
- ML Pack preserves its original React/Vite interface in a dedicated `/games/mlpack` page. It runs in demo mode without a backend; an optional local C++17/mlpack service can provide native computations when available.
