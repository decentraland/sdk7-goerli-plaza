# Avatar Swap (SDK7 Version)

A scene that uses `AvatarModifier` component to swap out the default avatar for another character model. This way the player's character style can match that of the enviroment's.

> Please visit the [SDK7 scene template](https://github.com/decentraland/sdk7-scene-template) for a SDK7 summary.

![](screenshots/avatar-swap.gif)

This scene shows:

- How to add a 3D model
- How to play animations from a 3D model
- How to hide an avatar using `AvatarModifier` component
- How to attach an entity to the Player
- How to get the Player's entity `Transform` and its position

## Instructions

Run over to the area covered in grass to automatically switch avatars. Use your mouse to look around and <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> keys on your keyboard to move forward, left, backward and right respectively.

## Try it out

**Previewing the scene**

1. Download this full repository from [sdk7-goerli-plaza](https://github.com/decentraland/sdk7-goerli-plaza/tree/main), including this and several other example scenes on SDK7.

2. Install the [Decentraland Editor](https://docs.decentraland.org/creator/development-guide/sdk7/editor/)

3. Open a Visual Studio Code window on this scene's root folder. Not on the root folder of the whole repo, but instead on this sub-folder that belongs to the scene.

4. Open the Decentraland Editor tab, and press **Run Scene**

Alternatively, you can use the command line. Inside this scene root directory run:

```
npm run start
```

## Acknowledgements

Model and animations from https://www.mixamo.com/

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.
