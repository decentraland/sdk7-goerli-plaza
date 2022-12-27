# Zombie Attack
A scene that uses `Quaternion` and `Vector3` methods to move an animated character following and looking at the player

![](screenshots/zombie-attack.gif)

This scene shows:
- How to add a 3D model
- How to play animations from a 3D model
- How to get the Player's entity `Transform` and its position
- How to rotate and move an entity smoothly
- How to create custom components
- How to use group of entities that have a specific component
- How to position entities randomly with `Math.random()`

## Instructions
Move around using <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> keys and get chased by a zombie that will play an 'Attack' animation when it reaches the player.

## Try it out

**Install the CLI**

Download and install the Decentraland CLI by running the following command inside this scene root directory:

```bash
npm install @dcl/sdk@next
```

**Previewing the scene**

Inside this scene root directory run:

```
dcl start
```

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.