#!/bin/bash

echo "Installing SDK in all folders: ${SDK_VERSION:=@dcl/sdk@latest}"

for d in ./*/ ; do
  if [ -f "$d/scene.json" ]; then
    echo "in $d; npm install $SDK_VERSION"
    (cd "$d" && npm install --silent $SDK_VERSION);
  fi
done
