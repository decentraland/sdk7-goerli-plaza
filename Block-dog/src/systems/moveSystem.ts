import { CustomComponents } from '../components'
import { Interpolate } from '../helper/interpolation'

const callbackMap = new Map<Entity, () => void>()

export function onMoveFinish(entity: Entity, callback: () => void) {
  callbackMap.set(entity, callback)
}

export function moveSystem(dt: number) {
  for (const [entity] of engine.getEntitiesWith(CustomComponents.MoveTransform)) {
    const move = CustomComponents.MoveTransform.getMutable(entity)
    const transform = Transform.getMutable(entity)

    move.normalizedTime = Math.min(Math.max(move.normalizedTime + dt * move.speed, 0), 1)
    move.lerpTime = Interpolate(move.interpolationType, move.normalizedTime)

    // assign value to transform
    transform.position = Vector3.lerp(move.start, move.end, move.lerpTime)

    // has finished
    move.hasFinished = move.normalizedTime >= 1

    if (move.hasFinished) {
      CustomComponents.MoveTransform.deleteFrom(entity)
      const fn = callbackMap.get(entity)
      if (fn) fn()
    }
  }
}
