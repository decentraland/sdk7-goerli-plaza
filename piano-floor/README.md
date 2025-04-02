# Piano Floor Example Scene SDK7

A piano floor where the player walks on the keys to play.

![demo](https://github.com/decentraland-scenes/piano-floor-example-scene/blob/master/screenshots/piano-floor.gif)

This scene shows you:
- How to play sounds from files
- How to change the material of a primitive shape
- How to use the trigger area from the Utils library to activate something when a player walks over it
- How to keey players synced by using the messagebus to communicate each player's actions to others
- How to use the pitch value of audioclips to create different musical notes

## Try it out

**Previewing the scene**

1. Download this repository.

2. Open the command line and navigate to this scene root directory

3. Run:

```
npm install
```

4. Run:

```
npm run start -- --explorer-alpha
```

## Scene Usage

Step on the keys to activate each note. 

If there are multiple players in the scene, they should all hear what each other plays. You can simulate this by opening two browser windows with the same preview. 

Learn more about how to build your own scenes in the Decentraland [documentation](https://docs.decentraland.org/) site.

If something doesn't work, please [create a pull request](https://github.com/decentraland/sdk7-goerli-plaza/pulls). 

## Code Overview

### 'pianoKey.ts'

- **BlackPianoKey Class**: Represents a black piano key, managing its properties like shape, colour and triggers.
- **WhitePianoKey Class**: Represents a white piano key, similar to the black key.

### 'index.ts'

Sets up the scene, creating black and white keys and handling audio.

### 'audioController.ts'

Manages audio entities, calculates pitch, and provides methods to play sounds.

### 'resources.ts'

Holds paths to scene models and sounds. 

## Customisation Guide

### Changing Base Sound Files

To use custom sound files, modify the 'baseSoundUrl' property in 'audioController.ts' and the sound paths in 'resources.ts'.

```
public static baseSoundUrl = 'resources/sounds/yourAudioFile.mp3' // audioController.ts
```
```
  sounds: {
    whiteKeys: {
      c4: 'sounds/whiteKeys/yourAudioFile.mp3'
    },
    blackKeys: {
      aSharp3: 'sounds/blackKeys/yourAudioFile.mp3'
    }
  }, // resources.ts
```

### Adding More Notes

Update the 'notes' array in 'audioController.ts' to add more piano notes. 

### Adjusting Pitch Calculations

For more precision in pitch calculations, you can fine-tune the 'calculatePitch' method in 'audioController.ts'. This algorithm translates musical notes into numerical pitches and forms the basis for generating different tones. 

```
public static calculatePitch(note: string): number {
  const pitchMap: { [key: string]: number } = {
    c3: 60, d3: 62, e3: 64, f3: 65, g3: 67, a3: 69, b3: 71,
    c4: 72, d4: 74, e4: 76, f4: 77, g4: 79, a4: 81, b4: 83,
    cSharp3: 61, dSharp3: 63, fSharp3: 66, gSharp3: 68, aSharp3: 70,
    cSharp4: 73, dSharp4: 75, fSharp4: 78, gSharp4: 80, aSharp4: 82,
  };
  
  const noteString = `c${note}`;
  return pitchMap[note] || 1.0;
}
```
Modify the numerical values associated with each note to achieve the desired pitch adjustments for the sounds.

## Copyright Info

This scene is protected with a standard Apache 2 license.
