import { MoveTransformComponent } from '../components/moveTransport'
import { Interpolate } from '../helper/interpolation'
// import { Interpolate } from '../helper/interpolation'


export function moveSystem(dt: number) {
  for (const [entity] of engine.getEntitiesWith(MoveTransformComponent)) {

	const move = MoveTransformComponent.getMutable(entity)
	const transform = Transform.getMutable(entity)
    move.normalizedTime = Math.min(Math.max(move.normalizedTime + dt * move.speed, 0), 1)
    // move.lerpTime = move.normalizedTime 
	move.lerpTime = Interpolate(move.interpolationType, move.normalizedTime)

    // assign value to transform
    transform.position = Vector3.lerp(move.start, move.end, move.lerpTime)


    if (move.lerpTime >= 1) {
      MoveTransformComponent.deleteFrom(entity)
    }
  }
}


engine.addSystem(moveSystem)