# Grab Objects Advanced(SDK7 Version)

This scene has no description yet.

> Please visit the [SDK7 scene template](https://github.com/decentraland/sdk7-scene-template) for a SDK7 summary.

_demo of grab-objects-advanced scene running in preview._

![demo](https://github.com/decentraland-scenes/sdk7-goerli-plaza/grab-objects-advanced/blob/main/screenshots/grab-objects-advanced.gif)

## Description

Demonstrates how you can grab and move an object using the [cannon.js](https://github.com/schteppe/cannon.js) physics engine. This is the advanced version of this scene [here](https://github.com/decentraland-scenes/sdk7-goerli-plaza/grab-objects).

## Instructions

- Use your mouse to look around and <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> keys on your keyboard to move forward, left, backward and right respectively.
- To jump, press the <kbd>Space</kbd> key.
- To grab the object, click and hold the <kbd>Left Mouse Button</kbd>.
- Press and hold the <kbd>E</kbd> key to pull the object in.

## Issues

There are a couple of issues that need looking at:

- Object reorientates itself when you first pick it up.
- Making large arcs/turns whilst holding the object can cause the object to go out of bounds.

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

Code is adapted from https://github.com/schteppe/cannon.js/blob/master/examples/threejs_mousepick.html
