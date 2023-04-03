#!/bin/bash

echo "Installing and building all folders"

yarn run update-parcels

git diff --exit-code .

if [[ $? -eq 1 ]]; then
  echo "GIT IS ON DIRTY STATE 🔴 Please run 'yarn run update-parcels' locally and commit"
  exit 1
fi

if [ ! -z $SDK_VERSION ]; then
  for d in ./*/ ; do
    if [ -f "$d/scene.json" ]; then
      echo "in $d; yarn add $SDK_VERSION"
      (cd "$d" && yarn add --silent $SDK_VERSION);
    fi
  done
fi

# ensure all packages are on sync
yarn run sync && yarn run test

# install all dependencies
yarn install

# and build scenes
yarn workspaces run build


