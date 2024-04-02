# SDK7 Goerli Plaza

# Adding a new scene

Check the parcel usage running `node scripts/checkParcelsCollision.js`. The plaza is a rect from 72,-9 to 81,10.

Visit the collection of all the scenes in this repo deployed at [decentraland.org/play/?position=72%2C-10](https://decentraland.org/play/?realm=sdk-team-cdn.decentraland.org%252Fipfs%252Fgoerli-plaza-main-latest&position=72%252C-10)

## Before commit

You will need to make sure the workspace is in good shape for the CI. TO do so, run:

1. `npm run update-parcels && npm run sync && npm run test && npm run format`
2. Then commit

This project uses NPM workspaces, that means all scenes must have their own package.json with an unique name

## Testing pull requests

Each pull request generates a permanent new realm in `offline:offline` mode. The instructions to enter the realm are posted as a PR comment after passes. The realm is stored in a static CDN, and its name takes the commit hash of the repository. Making realms easy to access even if the PR was merged.

To keep consistent code styles, there is an automated CI step. If the build fails, please make sure to run `npm run format` and commit the changes.

## Testing main branch

In a Decentraland explorer execute:

```
/changerealm https://sdk-team-cdn.decentraland.org/ipfs/goerli-plaza-main-latest
```
