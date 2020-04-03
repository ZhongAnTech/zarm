# Contributing to zarm

## Set up
Install to fetch its dependencies after git clone the repo.

```
# npm is not allowed.
$ yarn
```

Then, you can runs Zarm Design website locally.
```
$ yarn dev
```


## Lint
checks the code style.

```
$ yarn lint
```

## Test
runs the complete test suite.

```
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

```
$ yarn build
```