# Contributing to zarm

## Set up
Install to fetch its dependencies after git clone the repo.

```bash
# npm is not allowed.
$ yarn
```

Then, you can runs Zarm Design website locally.
```bash
# develop for h5
$ yarn dev

If you want runs Zarm Design demo for react-native, Then
# develop for react-native
$ cd rnkit && yarn install && cd ios && pod install && cd ../.. 

# develop for iOS
$ yarn dev:ios

# develop for Android
$ yarn dev:android
```


## Lint
checks the code style.

```bash
$ yarn lint

# Check code style for Typescript
$ yarn lint:ts

# Check code style for Javascript
$ yarn lint:js

# Check code style for Stylesheet
$ yarn lint:style
```

## Test
runs the complete test suite.

```bash
$ yarn test

# Test specified h5
$ yarn test:h5

# Test specified react-native
$ yarn test:rn

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

# Build react-native of iOS
$ yarn build:ios

# Build react-native of Android
$ yarn build:android
```