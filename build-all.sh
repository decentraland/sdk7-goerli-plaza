#!/bin/bash

echo "Installing and building all folders"

# first install the parametrized package
if [ ! -z $SDK_VERSION ]; then
  npm i $SDK_VERSION
fi

# then the rest of the dependencies
npm install

# run a check to ensure all parcels are updated and also dcl-workspace.json
npm run update-parcels

# and fail if git state is dirty
git diff --exit-code .
if [[ $? -eq 1 ]]; then
  echo "GIT IS ON DIRTY STATE 🔴 Please run 'npm run update-parcels' locally and commit"
  exit 1
fi

# ensure all packages are on sync
npm run sync && npm run test

# and lastly build scenes
npm run build

# and export the final static builds
npm run export-static