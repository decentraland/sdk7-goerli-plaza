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


## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.
