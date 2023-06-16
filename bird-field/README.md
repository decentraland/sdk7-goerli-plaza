# Item Pickup (SDK7 Version)

> Please visit the [SDK7 scene template](https://github.com/decentraland/sdk7-scene-template) for a SDK7 summary.

![](screenshots/item-pickup.gif)

This scene shows you:

- How to play a local audio file
- How to add a 3D model
- How to create custom components
- How to detect the player position inside a defined area and react to that
- How to use the `VisibilityComponent` to toggle 3D meshes visibility
- How to use group of entities that have a specific component

## Instructions

Run over or stand over an item to pick it up. Use your mouse to look around and <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> keys on your keyboard to move forward, left, backward and right respectively.

## Try it out

**Install the CLI**

Download and install the Decentraland CLI by running the following command inside this scene root directory:

```bash
npm install @dcl/sdk@next
```

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

The following files were taken from https://freesound.org/:

- _ammoPickup.mp3_ modified from https://freesound.org/people/ken788/sounds/386744/
- _armorPickup.mp3_ modified from https://freesound.org/people/morganpurkis/sounds/371217/
- _medikitPickup.mp3_ modified from https://freesound.org/people/Adam_N/sounds/325279/

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.
