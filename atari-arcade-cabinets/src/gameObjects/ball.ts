import { Entity, MeshRenderer, Transform, TransformType, engine } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { ArcadeScreenFlag, BallFlag, HasGameLoaded, PaddleFlag, PlayerElementsFlag } from '../components/definitions'
import { PLANE_HEIGHT } from '../gameConfig'

function createBall(transform: Partial<TransformType>, direction: Vector3): void {
  const ball: Entity = engine.addEntity()
  Transform.create(ball, transform)
  const transformMutable = Transform.getMutable(ball)
  for (const [screen] of engine.getEntitiesWith(ArcadeScreenFlag)) {
    if (ArcadeScreenFlag.getOrNull(screen)?.game === HasGameLoaded.getOrNull(engine.RootEntity)?.game) {
      transformMutable.parent = screen
    }
  }
  MeshRenderer.create(ball, { mesh: { $case: 'box', box: { uvs: [] } } })
  BallFlag.create(ball, { direction, collider: true })
  PlayerElementsFlag.create(ball, {})
}

/**src/gameLogic/sharedMethods.ts
 * Create and shoot a ball entity in a given direction.
 *
 * @param direction - The input is a Vector3 to determine the direction of the ball.
 */
export function shoot(direction: Vector3): void {
  for (const [_paddleEntity, _paddleFlag, transform] of engine.getEntitiesWith(PaddleFlag, Transform)) {
    const paddlePosition = transform.position
    const spawnPosition = Vector3.create(paddlePosition.x, PLANE_HEIGHT, paddlePosition.z + 1)
    // Ball
    createBall({ position: spawnPosition, scale: Vector3.create(0.3, 0.1, 0.4) }, direction)
  }
}
