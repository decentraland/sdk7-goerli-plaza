# Avatar Swap (SDK7 Version)

A scene that takes the avatar-swap example scene and adds more to it.
https://github.com/decentraland-scenes/sdk7-goerli-plaza/tree/main/avatar-swap
This version aims to show you how to swap between models and animations on the same entity.

> Please visit the [SDK7 scene template](https://github.com/decentraland/sdk7-scene-template) for a SDK7 summary.

![](screenshots/avatar-swap.png)

This scene shows:

- How to add a 3D model
- How to play animations from a 3D model
- How to hide an avatar using `AvatarModifier` component
- How to attach an entity to the Player
- How to get the Player's entity `Transform` and its position
- How to preload 3D models
- How to change 3D model assigned to an entity
- How to update `Animation states` on an `Animator`

## Instructions

Jump over to the wall keeping the snow from getting on you side to automatically switch avatars. Click `E` on one of the available ball-controls to switch teams and models. Use your mouse to look around and <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> keys on your keyboard to move forward, left, backward and right respectively.

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
