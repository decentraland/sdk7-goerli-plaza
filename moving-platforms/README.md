# Moving Platforms (SDK7 Version)

> Please visit the [SDK7 scene template](https://github.com/decentraland/sdk7-scene-template) for a SDK7 summary.

![](screenshot/moving-platforms.gif)

This scene shows you:

- How to play a local audio file
- How to add a 3D model
- How to handle synchronized changes of several entities through a system
- How to create custom components
- How to use group of entities that have a specific component
- How to move platforms along a collection of waypoints using `Vector3.lerp()`
- How to detect player position inside a defined 3D area and react to that

## Instructions

The aim is to collect the coin by moving and jumping between platforms. Use your mouse to look around and <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> keys on your keyboard to move forward, left, backward and right respectively. To jump, press the <kbd>Space</kbd> key.

## Try it out

**Install the CLI**

Download and install the Decentraland CLI by running the following command inside this scene root directory:

```bash
npm install @dcl/sdk@next
```

**Previewing the scene**

1. Download this full repository from [sdk7-goerli-plaza](https://github.com/decentraland/sdk7-goerli-plaza/tree/main), including this and several other example scenes on SDK7.
1. Download this repository.

2. Open the command line and navigate to this scene root directory

3. Run:

```
npm install
```


## Acknowledgements

- _coinPickup.mp3_ modified from https://freesound.org/people/MATRIXXX_/sounds/402766/

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.
