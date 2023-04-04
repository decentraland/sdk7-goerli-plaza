#!/bin/bash

echo "Installing and building all folders"

if [ ! -z $SDK_VERSION ]; then
  npm i $SDK_VERSION
  # for d in ./*/ ; do
  #   if [ -f "$d/scene.json" ]; then
  #     echo "in $d; no add $SDK_VERSION"
  #     (cd "$d" && yarn add --silent $SDK_VERSION);
  #   fi
  # done
fi

npm install

npm run update-parcels

git diff --exit-code .

if [[ $? -eq 1 ]]; then
  echo "GIT IS ON DIRTY STATE 🔴 Please run 'npm run update-parcels' locally and commit"
  exit 1
fi


# ensure all packages are on sync
npm run sync && npm run test

# and build scenes
npm run build
