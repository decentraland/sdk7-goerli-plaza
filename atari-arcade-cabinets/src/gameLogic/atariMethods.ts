import { Entity } from '@dcl/sdk/ecs'
import { Color3, Vector3 } from '@dcl/sdk/math'
import { PLANE_HEIGHT } from '../gameConfig'
import { createBrick } from '../gameObjects/brick'
import { toggleVisibilityReadyPlayerOne } from './sharedMethods'
import { Games } from './sharedConstants'

export const ATARI_RED = Color3.fromInts(255, 127, 0)
export const ATARI_GREEN = Color3.fromInts(127, 255, 127)

/**
 * Loads Atari level bricks.
 *
 * @param game - The first input is a game (string value) from Games enum
 * @param parent - The second input is an entity to get a parent to all bricks
 *
 * @remarks This function is only for this level, bricks are defined by the function itself.
 */

export function loadAtariBricks(game: Games, parent: Entity): void {
  toggleVisibilityReadyPlayerOne(game, false)
  // Red bricks
  let brickPosX = 6
  let redBrickPosZ = 24
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 9; j++) {
      createBrick(
        {
          position: Vector3.create(brickPosX, PLANE_HEIGHT, redBrickPosZ),
          scale: Vector3.create(2, 0.1, 1)
        },
        ATARI_RED,
        parent,
        game
      )
      brickPosX += 2.5
    }
    redBrickPosZ -= 1.5
    brickPosX = 6
  }

  // Green bricks
  let greenBrickPosZ = 19.5
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 9; j++) {
      createBrick(
        {
          position: Vector3.create(brickPosX, PLANE_HEIGHT, greenBrickPosZ),
          scale: Vector3.create(2, 0.1, 1)
        },
        ATARI_GREEN,
        parent,
        game
      )
      brickPosX += 2.5
    }
    greenBrickPosZ -= 1.5
    brickPosX = 6
  }
}
