# Block Fountain

A cube-based fountain with multiple animations that uses P2P to sync animations between players.

![](screenshot/screenshot.png)

This scene shows you:

- How to use websockets to sync events between players
- How to handle multiple animations in a same model
- How to keep the scene's code abstracted into various game objects with state and methods of their own
- How to handle random events


## Try it out

**Setting Up Your Environment**

To start developing for Decentraland, follow [these instructions](https://docs.decentraland.org/creator/development-guide/sdk7/installation-guide/).

**Previewing the scene**

You can run the scene by following [these instructions](https://docs.decentraland.org/creator/development-guide/sdk7/preview-scene/).

**Scene Usage**

The fountain has four rings of cubes that each behave independently, each ring has three different animations. 

If left alone, these animations will be randomly triggered at random intervals. These random events aren't synced between players. 

If a player pushes one of the buttons, this will trigger the corresponding animation. The random behavior will stop for a given amount of time, and the animation triggered by the button is synced with all other players in the scene.

You can test this by opening the preview on multiple browser windows. If a player pushes a button on one of these instances, all other players should see the same animation play at the same time.

Learn more about how to build your own scenes in our [documentation](https://docs.decentraland.org/) site.

## Customize the Scene

To customize the Block Fountain scene or integrate similar functionality into your Decentraland projects, you can follow these guidelines and code snippets:

### Creating Buttons

You can create buttons that trigger animations when pressed. Here's how to create a button:

```typescript
import { Button } from './button';
import { Vector3 } from '@dcl/sdk/math';

// Create a new button
const button1 = new Button(
    'models/buttonModel.glb',         // Model path
    new Vector3(x, y, z),             // Position
    new Vector3(0, 0, 0),             // Rotation
    new Vector3(1, 1, 1),             // Scale
    'sounds/click.mp3',               // Audio clip URL
    'buttonAnimationName'             // Animation name
);
```

### Creating Consoles

Consoles contain interactive buttons and help organize the scene. Here's how to create a console:

```typescript
import { Console } from './console';
import { Vector3 } from '@dcl/sdk/math';
import { MessageBus } from '@dcl/sdk/message-bus';

// Create a new console
const cyanConsole = new Console(
    new Vector3(x, y, z),                 // Position
    new Vector3(0, 0, 0),                 // Rotation
    new Vector3(1, 1, 1),                 // Scale
    baseEntity,                           // Parent entity
    'models/consoleModel.glb',            // Console model path
    1,                                    // Target ring (1 to 4)
    'models/button1.glb',                 // Button 1 model path
    'button1Animation',                   // Button 1 animation name
    'models/button2.glb',                 // Button 2 model path
    'button2Animation',                   // Button 2 animation name
    'models/button3.glb',                 // Button 3 model path
    'button3Animation',                   // Button 3 animation name
    sceneMessageBus                       // Message bus for synchronization
);
```

### Handling Fountain Animations

Manage fountain animations and synchronize them using the 'RandomFountain' class:

```typescript
import { RandomFountain } from './randomizer';
import { Ring } from './ring';

// Create and add the fountain animation system
const fountainPlayer = new RandomFountain(rings, 10);
engine.addSystem((dt) => {
    fountainPlayer.update(dt);
});

// Handle fountain animation events
sceneMessageBus.on('fountainAnim', (e) => {
    fountainPlayer.playingMode = 0;
    utils.timers.setTimeout(() => {
        fountainPlayer.playingMode = 1;
    }, 20000);

    // Trigger ring animations according to events
    switch (e.anim) {
        case 1:
            rings[e.ring].play1();
            break;
        case 2:
            rings[e.ring].play2();
            break;
        case 3:
            rings[e.ring].play3();
            break;
    }
});
```

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.
