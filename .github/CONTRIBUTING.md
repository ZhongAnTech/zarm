# Contributing to Zarm

## Set up

Install to fetch its dependencies after git clone the repo.

```bash
# Use pnpm to install workspace dependencies.
$ pnpm install
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
$ pnpm test

# Test specified h5
$ pnpm test:h5

# Generate coverage
$ pnpm test:h5 --coverage
```

## Build

compiles TypeScript code to the lib and es directory, and creates UMD build of zarm in dist directory.

```bash
$ pnpm build

# Build for es
$ pnpm build:es

# Build for lib
$ pnpm build:lib

# Build for umd
$ pnpm build:umd
```
