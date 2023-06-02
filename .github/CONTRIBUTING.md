# Contributing to Zarm

## Set up

Install to fetch its dependencies after git clone the repo.

```bash
# npm is not allowed.
$ pnpm i
```

Then, you can runs Zarm Design website locally.

```bash
# develop for h5
$ pnpm dev
```

## Lint

checks the code style.

```bash
$ pnpm lint

# Check code style for Typescript
$ pnpm lint:ts

# Check code style for Javascript
$ pnpm lint:js

# Check code style for Stylesheet
$ pnpm lint:style
```

## Test

runs the complete test suite.

```bash
$ yarn test

# Test specified h5
$ yarn test:h5

# Generate coverage
$ yarn test:h5 --coverage
```

## Build

compiles TypeScript code to the lib and es directory, and creates UMD build of zarm in dist directory.

```bash
$ yarn build

# Build for es
$ yarn build:es

# Build for lib
$ yarn build:lib

# Build for umd
$ yarn build:umd
```
