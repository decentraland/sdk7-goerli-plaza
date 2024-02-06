# Clap Meter

A scene featuring a clap meter that responds to player claps with synchronized animations.

![demo](https://github.com/decentraland-scenes/clap-meter/blob/main/screenshots/clap-meter.gif)

## Overview

The Clap Meter scene showcases synchronized animations triggered by player claps. The project demonstrates the usage of P2P communication to sync events between players, handling multiple animations in a single model, maintaining organized and abstracted code, and managing random events.

## Try it out

### Setting Up Your Environment

To start developing for Decentraland, follow [these instructions](https://docs.decentraland.org/creator/development-guide/sdk7/installation-guide/).

### Previewing the Scene

You can run the scene by following [these instructions](https://docs.decentraland.org/creator/development-guide/sdk7/preview-scene/).

### Scene Interaction

The clap meter has a needle that responds to claps. It features gradual needle movement based on claps and a cooldown period. The scene adapts to different camera views and provides an engaging experience for players.

## Development

Feel free to explore the code and make modifications to the scene. If you have suggestions or improvements, contributions are welcome.

## Usage

### Handling Clap Interactions

To integrate similar functionality into your Decentraland projects, follow these guidelines:

#### Creating Clap Meter

Instantiate a `ClapMeter` object to manage the clap meter functionality:

```typescript
import { ClapMeter } from './clapMeter'
import { Vector3 } from '@dcl/sdk/math'

const clapMeter = new ClapMeter(
  new Vector3(x, y, z), // Position
  new Vector3(0, 0, 0), // Rotation
  new Vector3(1, 1, 1), // Scale
  undefined // Parent entity
)
```

#### Handling Clap Events

Listen for clap events and trigger corresponding actions:

```typescript
import { AvatarEmoteCommand } from '@dcl/sdk/ecs'

AvatarEmoteCommand.onChange(engine.PlayerEntity, (emote) => {
  if (!emote) return
  console.log('Emote played: ', emote)
  if (emote.emoteUrn == 'clap') {
    console.log('clap detected')
    isClapping = true
    sceneMessageBus.emit('updateClapMeter', {})

    // Set a timer to reset isClapping after a certain duration
    clapCooldownTimer = utils.timers.setTimeout(() => {
      isClapping = false
      clapCooldownTimer = 0

      // Update needle when the timer expires
      sceneMessageBus.emit('updateClapMeter', {})
    }, COOLDOWN_TIME)
  }
})
```

### Customizing the Scene

Adjusting Cooldown and Needle Movement.
Modify the `updateNeedle` method in the `ClapMeter` class to fine-tune the cooldown and needle movement logic:

```typescript
 public updateNeedle: SystemFn = (dt: number) => {
        const clapsNeeded = 4; // Number of claps needed to reach the end, higher number = more difficult / lower number = easier

        if (this.cooldownRemaining > 0) {
           this.currentNeedleRotation += COOLDOWN_INCREMENT;

           // Clamp the needle rotation to the start angle
           if (this.currentNeedleRotation >= START_ANGLE) {
               this.currentNeedleRotation = START_ANGLE;
           }

           // Decrease remaining cooldown time
           this.cooldownRemaining -= dt;


            if (this.cooldownRemaining <= 0) {
                // Cooldown is over, reset the needle
                this.cooldownRemaining = 0;
                clapMeterFull = false;
            }
        }

        else if (isClapping && this.currentNeedleRotation > END_ANGLE) {
        // If clapping and the needle is not at the end, advance the needle
        const angleIncrement = ANGLE_INCREMENT / clapsNeeded;

        this.currentNeedleRotation -= angleIncrement;

        // Clamp the needle rotation to the end angle
        if (this.currentNeedleRotation <= END_ANGLE) {
            this.currentNeedleRotation = END_ANGLE;
            clapMeterFull = true;


        }
    } else if (this.currentNeedleRotation < START_ANGLE) {
        // If not clapping and the needle is not at the start, return the needle to start
        this.currentNeedleRotation += COOLDOWN_INCREMENT / clapsNeeded;

        // Clamp the needle rotation to the start angle
        if (this.currentNeedleRotation >= START_ANGLE) {
            this.currentNeedleRotation = START_ANGLE;
        }
    }
```

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.
