git checkout release
git merge dev

#!/bin/bash
set -e

if [[ -z $1 ]]; then
  echo "Enter new version: "
  read -r VERSION
else
  VERSION=$1
fi

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # lint and test
  if [[ -z $SKIP_TESTS ]]; then
    npm run lint
    npm run test
  fi

  # build
  VERSION=$VERSION npm run build

  # commit
  git add -A
  git commit -m "build: build $VERSION"
  npm version $VERSION --message "build: release $VERSION"

  # publish
  git push release
  git push refs/tags/v$VERSION
  git checkout dev
  git rebase release
  git push dev

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