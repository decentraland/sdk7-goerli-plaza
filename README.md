# SDK7 Goerli Plaza

# Adding a new scene
Check the parcel usage running `node scripts/checkParcelsCollision.js`. The plaza is a rect from 72,-9 to 81,10.

Visit the collection of all the scenes in this repo deployed at [sdk-test-scenes.decentraland.zone/?position=72%2C-10](https://sdk-test-scenes.decentraland.zone/?realm=LocalPreview&position=72%2C-10)

## Before commit

You will need to make sure the workspace is in good shape for the CI. TO do so, run:
1. `npm run update-parcels && npm run sync && npm run test`
1. Then commit

This project uses NPM workspaces, that means all scenes must have their own package.json with an unique name