
# Space Traitor SDK 7
## Try it out

**Previewing the scene**

1. Download this repository.

2. Install the [Decentraland Editor](https://docs.decentraland.org/creator/development-guide/sdk7/editor/)

3. Open a Visual Studio Code window on this scene's root folder. Not on the root folder of the whole repo, but instead on this sub-folder that belongs to the scene.

4. Open the Decentraland Editor tab, and press **Run Scene**

## Brief

This is a multiplayer game about deceiving and guessing other player's identities. It takes plenty of inspiration from Among Us, but brings similar mechanics into a 3d medium.

At least 3 (or better 4) players must ring the bell of the space station, then the game starts.

A traitor is picked randomly, that player will secretly play against the others.

![](https://raw.githubusercontent.com/nearnshaw/Space-Traitor/master/screenshot.jpeg)

This scene is built using Colyseus as an authoritative server, syncing all changes to players via Websockets.

# Instructions

### Play online

- In decentraland, deployed at:

https://play.decentraland.org/?position=-73,-49

### Run locally


- open a console on the `server` folder
- run `npm run build`, then `npm run start` in server's folder
- open another console in the root folder
- run `npm run start`
- open 3 tabs at "http://127.94.0.1:8000/?SCENE_DEBUG_PANEL&position=-64,-34&realm=localhost-stub", click on the button by the door to register as a player
- the traitor will be notified

### Test the scene as 1 player

To be able to test the scene as 1 person you can choose the "F" option twice during the button dialogue.

### Game mechanics

Once at least 3 players have accepted the game, a countdown will start. During this countdown, other players can join, otherwise the game begins.

Once the game begins, one of the players is selected at random to be the traitor, this player is given instructions to act secretively.

A 5 minute countdown starts, non-traitor players hav to fix 8 machines before this countdown ends, otherwise the traitor wins. The machines are fixed by playing a randomly selected UI mini-game. Some equipment might randomly break over time too.

The traitor can also sabotage fuse boxes by cutting cables. By cutting all cables in a fusebox, the time for solving the game gets reduced significantly, favoring the traitor.

At any moment during the game, anyone can hit the vote button on the main hall and start a voting round. All players left alive must vote for someone to be kicked out. If the traitor is kicked out, other players win.

That's why the traitor must act discretely, as cutting wires out in the open will alert them of who he is and vote him out. The game is designed to make everyone doubt each other and suspicions to fly all over the place.

## Using Colyseus SDK with Decentraland

Install `colyseus.js`:

```
npm install --save colyseus.js
```

Add `colyseus.js` to your `"bundleDependencies"` in your `package.json`:

```json
  "bundleDependencies": [
    "colyseus.js"
  ]
```


```typescript
import { Client } from 'colyseus.js'
```



---

## Creating a Colyseus server:

```
npm init colyseus-app ./server
```

## Deploying to [Colyseus Arena](https://www.colyseus.io/arena)

```
npm run build
```

Upload the `lib` folder from the Arena control panel.

## More

Learn more about how to build your own scenes in our [documentation](https://docs.decentraland.org/) site.

If something doesn’t work, please [file an issue](https://github.com/decentraland-scenes/Awesome-Repository/issues/new).

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.
