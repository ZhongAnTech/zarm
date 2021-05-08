#!/bin/bash
set -e

if [[ -z $1 ]]; then
  echo "Enter new version: "
  read -r VERSION
else
  VERSION=$1
fi

read -p "Releasing $VERSION - are you sure? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Releasing $VERSION ..."

  # if [[ -z $SKIP_TESTS ]]; then
  #   npm run lint
  #   npm run test
  # fi

  # build
  VERSION=$VERSION npm run build

  # commit
  git add -A
  git commit -m "build: build $VERSION"

  # tag version
  # npm version "$VERSION" --message "build: release $VERSION"

  # publish
  # git push origin refs/tags/v"$VERSION"
  git tag v"$VERSION"
  git push origin v"$VERSION"
  git push origin master

  if [[ $VERSION =~ "alpha" ]]
  then
    npm publish --tag alpha
  elif [[ $VERSION =~ "beta" ]]
  then
    npm publish --tag beta
  elif [[ $VERSION =~ "rc" ]]
  then
    npm publish --tag rc
  else
    npm publish
  fi
fi