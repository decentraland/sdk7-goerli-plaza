import { MoveTransformComponent } from '../components/moveTransport'
import { PathDataComponent } from '../components/pathData'
import { Interpolate } from '../helper/interpolation'

const { Transform } = engine.baseComponents

const callbackMap = new Map<Entity, () => void>()

export function onMoveFinish(entity: Entity, callback: () => void) {
  callbackMap.set(entity, callback)
}

export function moveSystem(dt: number) {
  for (const [entity,  path] of engine.getEntitiesWith( PathDataComponent)) {

	if(path.paused) return

	const move = MoveTransformComponent.getMutable(entity)
	const transform = engine.baseComponents.Transform.getMutable(entity)


    move.normalizedTime = Math.min(Math.max(move.normalizedTime + dt * move.speed, 0), 1)
    move.lerpTime = Interpolate(move.interpolationType, move.normalizedTime)

    // assign value to transform
    transform.position = Vector3.lerp(move.start, move.end, move.lerpTime)

    // has finished
    move.hasFinished = move.normalizedTime >= 1

    if (move.hasFinished) {
		MoveTransformComponent.deleteFrom(entity)
      const fn = callbackMap.get(entity)
      if (fn) fn()
     
    }
  }
}

