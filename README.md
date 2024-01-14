# Node Test Runner Examples

Examples are ported to `node:test` and `node:assert` from [jest-handbook-examples](https://github.com/HugoDF/jest-handbook-examples) (which is using Jest).

## Requirements

- Node LTS
- npm

## Setup

1. Clone the repository
2. Run `npm install` to install required dependencies.

## npm scripts

- `npm run test` will run the core test suite
- `npm run test:all` will run all the test commands
- `npm run test:seq` will run the core test suite with 1 concurrency
- `npm run test:par` will run the core test suite with 5 concurrency
- `npm run test:only` will run the `.only.js` test suite (demonstrating how to use `.only`)
- `npm run test:failing` will run test suites with failing tests
- `npm run lint` will run `biome lint` on example tests
- `npm run format` will run `biome format` on examples tests.

## LICENSE

Code is licensed under the [MIT License](./LICENSE).
