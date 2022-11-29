import { engine, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { MoveAnimation } from '../definitions'

export default function moveAnimationSystem(dt: number) {
  for (const [entity] of engine.getEntitiesWith(MoveAnimation, Transform)) {
    const move = MoveAnimation.getMutable(entity)
    const mul = move.deltaMultiplier ? move.deltaMultiplier : 1
    move.currentPosition += dt * mul
    if (move.currentPosition >= 1.0) {
      Transform.getMutable(entity).position = move.to
      MoveAnimation.deleteFrom(entity)
    } else {
      Transform.getMutable(entity).position = Vector3.lerp(move.from, move.to, move.currentPosition)
    }
  }
}
