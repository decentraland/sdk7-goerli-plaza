import { Vector3 } from '@dcl/ecs-math'
import { Transform, engine } from '@dcl/sdk/ecs'
import { BallFlag, IsBallAlive } from '../components/definitions'
import { BALL_SPEED, OUT_OF_BOUNDS } from '../gameConfig'
import { playSound } from '../gameObjects/sound'
import { Sounds } from './sharedConstants'

/**
 * Translate ball based on its direction property
 */

export function BallTranslatorSystem(dt: number) {
  for (const [ball] of engine.getEntitiesWith(BallFlag)) {
    const transform = Transform.getMutable(ball)
    const increment = Vector3.scale(
      BallFlag.getMutable(ball).direction,
      dt * BALL_SPEED
    )
    transform.position = Vector3.add(transform.position, increment)

    if (transform.position.z <= OUT_OF_BOUNDS) {
      IsBallAlive.createOrReplace(engine.RootEntity, { alive: false })
      playSound(Sounds.S_MISS)
      engine.removeEntity(ball)
    }
    if (
      transform.position.x < 0 ||
      transform.position.x > 32 ||
      transform.position.z < 0 ||
      transform.position.z > 32
    ) {
      IsBallAlive.createOrReplace(engine.RootEntity, { alive: false })
      engine.removeEntity(ball)
    }
  }
}
