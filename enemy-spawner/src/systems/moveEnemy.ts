import { engine, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { MoveTransformComponent } from '../components/customComponents'
import { Interpolate } from '../helper/interpolation'

export function moveSystem(dt: number) {
  for (const [entity] of engine.getEntitiesWith(MoveTransformComponent, Transform)) {
    const move = MoveTransformComponent.getMutable(entity)
    const transform = Transform.getMutable(entity)

    move.normalizedTime = Math.min(Math.max(move.normalizedTime + dt * move.speed, 0), 1)
    move.lerpTime = Interpolate(move.interpolationType, move.normalizedTime)

    // assign value to transform
    transform.position = Vector3.lerp(move.start, move.end, move.lerpTime)

    // has finished
    move.hasFinished = move.normalizedTime >= 1

    if (move.hasFinished) {
      engine.removeEntity(entity)
    }
  }
}
