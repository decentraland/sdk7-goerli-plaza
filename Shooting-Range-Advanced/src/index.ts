/**   ADVANCED SHOOTING TARGET DEMO
    this file outlines the standard use of the shooting target module & all included
    components. the target shooting module allows you to create targets around your scene
   	(both static and rotating) based on given styles that can be shot by the player. players 
	can only shoot targets when they are within the bounds of the firing range area. you can 
	find a detailed description of each component within its file.
 */

import { PlayerShootingArea } from './shooting-range-advanced/player-shooting-area'
import { TargetObject } from './shooting-range-advanced/target-object'
import { PLATFORM_STYLE_TYPE } from './shooting-range-advanced/target-data'

export function main() {
  //NOTE: all that is required for you to set up shooting targets in your scene is:
  //	1 - set a shooting area
  // 	2 - create targets
  //all score & shot decal objects are handled internally

  //create firing range trigger (player will be allowed to shoot when in this area)
  PlayerShootingArea.Move({ x: 16, y: 0, z: 8 })

  //create targets (will display scores when hit by player)
  //	static target 1
  TargetObject.Create({
    type: PLATFORM_STYLE_TYPE.STATIC_RED,
    pos: { x: 11, y: 0, z: 12 },
    rot: { x: 0, y: -30, z: 0 }
  })
  //	static target 2
  TargetObject.Create({
    type: PLATFORM_STYLE_TYPE.STATIC_GREEN,
    pos: { x: 13.5, y: 0, z: 13 },
    rot: { x: 0, y: -15, z: 0 }
  })
  //	static target 3
  TargetObject.Create({
    type: PLATFORM_STYLE_TYPE.STATIC_BLUE,
    pos: { x: 16, y: 0, z: 14 },
    rot: { x: 0, y: 0, z: 0 }
  })
  //	static target 4
  TargetObject.Create({
    type: PLATFORM_STYLE_TYPE.STATIC_GREEN,
    pos: { x: 18.5, y: 0, z: 13 },
    rot: { x: 0, y: 15, z: 0 }
  })
  //	static target 5
  TargetObject.Create({
    type: PLATFORM_STYLE_TYPE.STATIC_RED,
    pos: { x: 20, y: 0, z: 12 },
    rot: { x: 0, y: 30, z: 0 }
  })
  //	rotating target 1
  TargetObject.Create({
    type: PLATFORM_STYLE_TYPE.ROTATING_RED,
    pos: { x: 11.5, y: 0, z: 17 },
    rot: { x: 0, y: 0, z: 0 }
  })
  //	rotating target 2
  TargetObject.Create({
    type: PLATFORM_STYLE_TYPE.ROTATING_GREEN,
    pos: { x: 16, y: 0, z: 19 },
    rot: { x: 0, y: 0, z: 0 }
  })
  //	rotating target 3
  TargetObject.Create({
    type: PLATFORM_STYLE_TYPE.ROTATING_BLUE,
    pos: { x: 20.5, y: 0, z: 17 },
    rot: { x: 0, y: 0, z: 0 }
  })
}
