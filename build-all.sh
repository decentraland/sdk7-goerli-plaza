#!/bin/bash

echo "Installing and building all folders"

rm -rf node_modules

# first install the parametrized package
if [ ! -z $SDK_VERSION ]; then
  npm i $SDK_VERSION @dcl-sdk/utils@next --no-save --legacy-peer-deps
else
  npm i @dcl/sdk@next @dcl-sdk/utils@next --legacy-peer-deps
fi

# then the rest of the dependencies
npm install --legacy-peer-deps

npm run sync

npm ls @dcl/sdk
npm ls @dcl-sdk/utils

# clean the git state of package.json(s)
git add */package.json package.json

# run a check to ensure all parcels are updated and also dcl-workspace.json
npm run update-parcels

# and fail if git state is dirty
git diff --ignore-cr-at-eol --exit-code .

if [[ $? -eq 1 ]]; then
  echo "GIT IS ON DIRTY STATE 🔴 Please run 'npm run update-parcels' locally and commit"
  exit 1
fi

# ensure all packages are on sync
npm run sync && npm run test

# and lastly build scenes
npm run build