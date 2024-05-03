import { InputAction, Transform, engine, inputSystem } from '@dcl/sdk/ecs'
import { Color3, Vector3 } from '@dcl/sdk/math'

import { NEG_X_LIMIT, PADDLE_SPEED, PADDLE_WIDTH, PLANE_HEIGHT, POS_X_LIMIT } from './gameConfig'
import { shoot } from './gameObjects/ball'
import { createPaddle } from './gameObjects/paddle'
import {
  HasGameLoaded,
  IsBallAlive,
  PlayerElementsFlag,
  BallFlag,
  KnobFlag,
  SpinComponent,
  PaddleFlag
} from './components/definitions'
import { Games } from './gameLogic/sharedConstants'

/**
 * Loads all player elements who are necessary.
 *
 * @remarks This method calls to create the paddle and add the buttonChecker system for playability.
 *
 * @param game - The input is a game (string value) from Games enum to vinculate to that game.
 *
 */
export function loadPlayer(game: Games): void {
  // Game has loaded
  HasGameLoaded.createOrReplace(engine.RootEntity, { loaded: true, game })

  // Paddle
  createPaddle(
    {
      position: Vector3.create(16, PLANE_HEIGHT, 4),
      scale: Vector3.create(PADDLE_WIDTH, 0.01, 1)
    },
    Color3.fromInts(127, 127, 255)
  )
  engine.addSystem(buttonChecker)
}

/**
 * Remove all player elements.
 *
 * @remarks This method remove the ball, the paddle and the buttonChecker system.
 *
 * @param game - The input is a game (string value) from Games enum to remove elements from that game.
 *
 */
export function unloadPlayer() {
  for (const [playerElement] of engine.getEntitiesWith(PlayerElementsFlag)) {
    engine.removeEntity(playerElement)
  }
  HasGameLoaded.createOrReplace(engine.RootEntity, { loaded: false, game: '' })
  IsBallAlive.createOrReplace(engine.RootEntity, { alive: false })
  engine.removeSystem(buttonChecker)
}

function controlStop() {
  for (const [knob] of engine.getEntitiesWith(KnobFlag)) {
    if (KnobFlag.get(knob).game === HasGameLoaded.get(engine.RootEntity).game) {
      if (SpinComponent.has(knob)) SpinComponent.deleteFrom(knob)
    }
  }
}
function controlLeft() {
  for (const [knob] of engine.getEntitiesWith(KnobFlag)) {
    if (KnobFlag.get(knob).game === HasGameLoaded.get(engine.RootEntity).game) {
      SpinComponent.createOrReplace(knob, { clockwise: -1 })
    }
  }
}
function controlRight() {
  for (const [knob] of engine.getEntitiesWith(KnobFlag)) {
    if (KnobFlag.get(knob).game === HasGameLoaded.get(engine.RootEntity).game) {
      SpinComponent.createOrReplace(knob, { clockwise: 1 })
    }
  }
}
function buttonChecker(dt: number) {
  for (const [paddleEntity] of engine.getEntitiesWith(PaddleFlag)) {
    const transform = Transform.getMutableOrNull(paddleEntity)
    const increment = Vector3.scale(Vector3.Right(), dt * PADDLE_SPEED)
    if (transform) {
      if (!inputSystem.isPressed(InputAction.IA_PRIMARY) && !inputSystem.isPressed(InputAction.IA_SECONDARY)) {
        controlStop()
      }

      if (inputSystem.isPressed(InputAction.IA_PRIMARY) && transform.position.x >= NEG_X_LIMIT) {
        transform.position = Vector3.add(transform.position, Vector3.multiplyByFloats(increment, -1, -1, -1))
        controlLeft()
      }

      if (inputSystem.isPressed(InputAction.IA_SECONDARY) && transform.position.x <= POS_X_LIMIT) {
        transform.position = Vector3.add(transform.position, increment)
        controlRight()
      }
    }
  }
  if (inputSystem.isPressed(InputAction.IA_POINTER)) {
    if (
      HasGameLoaded.getOrNull(engine.RootEntity)?.loaded === true &&
      IsBallAlive.getOrNull(engine.RootEntity)?.alive === false
    ) {
      IsBallAlive.createOrReplace(engine.RootEntity, { alive: true })
      const forwardVector = Vector3.Forward()
      forwardVector.y = 0 // Ignore y-axis
      shoot(Vector3.normalize(forwardVector))
    }
  }
}
