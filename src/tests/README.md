# Test Suite

All automated test source and Karma configuration live in this directory.

## Layout

- `app/`: app shell and route-contract tests
- `games/`: game-engine rules and canvas input/render tests
- `pages/`: portfolio page content and link tests
- `services/`: persisted theme-state tests
- `support/`: shared test doubles such as the canvas mock
- `karma.conf.js`: runner, reporters, and the 90% line-coverage gate

## Commands

Run the complete headless suite:

```bash
npm test
```

Run the complete suite and write HTML/LCOV coverage reports:

```bash
npm run test:coverage
```

Coverage output is written to `coverage/resume-portal-angular`.

New tests must be added under `src/tests`; `tsconfig.spec.json` intentionally excludes specs elsewhere.
