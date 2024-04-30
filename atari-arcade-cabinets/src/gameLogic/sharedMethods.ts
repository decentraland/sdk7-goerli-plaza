import { Entity, GltfContainer, Transform, VisibilityComponent, engine } from '@dcl/sdk/ecs'
import { Color3, Vector3 } from '@dcl/sdk/math'
import { createBrick } from '../gameObjects/brick'
import { PLANE_HEIGHT } from '../gameConfig'
import { ReadyPlayerOneFlag, BrickFlag } from '../components/definitions'
import { createBackground } from '../gameObjects/background'
import { createWall } from '../gameObjects/wall'
import { BRICK_SIZE, Games } from './sharedConstants'

export function loadBricks(game: Games, bricks: Array<{ position: Vector3; color: Color3 }>, parent: Entity): void {
  toggleVisibilityReadyPlayerOne(game, false)
  for (let i = 0; i < bricks.length; i++) {
    createBrick(
      {
        position: Vector3.add(bricks[i].position, Vector3.create(0, 0, 0)),
        scale: Vector3.create(BRICK_SIZE - 0.1, 0.1, BRICK_SIZE - 0.1)
      },
      bricks[i].color,
      parent,
      game
    )
  }
}

/**
 * Toggle visibility 'Ready Player One' billboard on that game's cabinet.
 *
 * @param game - The input is a game (string value) from Games enum.
 * @param visible - The input is a boolean to determine if billboard is visible or isn't.
 */
export function toggleVisibilityReadyPlayerOne(game: Games, visible: boolean) {
  for (const [readyPlayerOne] of engine.getEntitiesWith(ReadyPlayerOneFlag)) {
    if (ReadyPlayerOneFlag.get(readyPlayerOne).game === game) {
      const mutableVisibility = VisibilityComponent.getMutableOrNull(readyPlayerOne)
      if (mutableVisibility) {
        mutableVisibility.visible = visible
      } else {
        VisibilityComponent.create(readyPlayerOne, { visible })
      }
    }
  }
}

export function createWallsAndBackground(parent: Entity) {
  createWall(
    {
      scale: Vector3.create(2, 0.1, 32),
      position: Vector3.create(3.5, PLANE_HEIGHT + 0.1, 16)
    },
    Vector3.create(1, 0, 0),
    Color3.White(),
    parent
  )
  createWall(
    {
      scale: Vector3.create(27, 0.1, 2),
      position: Vector3.create(16, PLANE_HEIGHT + 0.1, 31.5)
    },
    Vector3.create(0, 0, -1),
    Color3.White(),
    parent
  )
  createWall(
    {
      scale: Vector3.create(2, 0.1, 32),
      position: Vector3.create(28.5, PLANE_HEIGHT + 0.1, 16)
    },
    Vector3.create(-1, 0, 0),
    Color3.White(),
    parent
  ),
    createBackground(
      {
        position: Vector3.create(16, PLANE_HEIGHT - 0.1, 16),
        scale: Vector3.create(26, 0.01, 32)
      },
      parent
    )
}

export function deleteBricks() {
  for (const [brick] of engine.getEntitiesWith(BrickFlag)) {
    engine.removeEntity(brick)
  }
}

export function unloadBricks(game: Games): void {
  deleteBricks()
  toggleVisibilityReadyPlayerOne(game, true)
}

/**
 * Create 'Ready Player One' billboard on that game's cabinet.
 *
 * @param parent - The input is an entity who will be parent of this billboard.
 * @param game - The input is a game (string value) from Games enum to vinculate to a particular game.
 */
export function readyPlayerOne(parent: Entity, game: Games) {
  // Ready player one
  const readyPlayerOne: Entity = engine.addEntity()
  ReadyPlayerOneFlag.create(readyPlayerOne, { game })
  Transform.create(readyPlayerOne, {
    parent,
    position: Vector3.create(16, 1, 15)
  })
  GltfContainer.create(readyPlayerOne, { src: 'models/readyPlayerOne.glb' })
}
