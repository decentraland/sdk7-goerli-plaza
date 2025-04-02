# Beer Dispenser (SDK7 Version)

_demo of beer-dispenser scene running in preview._

> Please visit the [SDK7 scene template](https://github.com/decentraland/sdk7-scene-template) for a SDK7 summary.

![demo](https://github.com/decentraland-scenes/beer-dispenser/blob/main/screenshots/beer-dispenser.gif)

## Description

A beer dispenser that uses P2P messaging so that you can pour beer for yourself and friends.

## Instructions

Pick up and put down the beer glass using the <kbd>E</kbd> key - you will only be able to place the beer glass on a flat surface that's pointing upwards. To fill a glass, place it at one of the bases on the dispenser and then press on the corresponding tap using the the <kbd>E</kbd> key again; to drink the beer just press the <kbd>F</kbd> key. Use your mouse to look around and <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> keys on your keyboard to move forward, left, backward and right respectively. Finally, pressing the <kbd>Space</kbd> key will make your avatar jump.

If you launch a scene preview and open it in two (or more) browser windows, each window will be interpreted as a separate player and a mock communications server will keep these players in sync.

_Note: If you open separate tabs in the same window, the interaction won’t work properly, as only one tab will be treated as active by the browser at a time._

## Try it out

**Previewing the scene**

1. Download this full repository from [sdk7-goerli-plaza](https://github.com/decentraland/sdk7-goerli-plaza/tree/main), including this and several other example scenes on SDK7.
1. Download this repository.

2. Open the command line and navigate to this scene root directory

3. Run:

```
npm install
```


## Acknowledgements

- _beerPump.mp3_ modified from https://freesound.org/people/RG_Campus/sounds/392893/
- _error.mp3_ modified from https://freesound.org/people/distillerystudio/sounds/327736/
- _pickUp.mp3_ modified from https://freesound.org/people/drummerman/sounds/368130/
- _putDown.mp3_ modified from https://freesound.org/people/Nightflame/sounds/368614/
- _swallow.mp3_ modified from https://freesound.org/people/freakinbehemoth/sounds/243635/
