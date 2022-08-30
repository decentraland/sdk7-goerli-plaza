import { MoveTransformComponent, RotateTransformComponent } from '../components/moveTransport'
import { PathDataComponent } from '../components/path'
import { SpeedComponent } from '../components/swimSpeed'
// import { Interpolate } from '../helper/interpolation'


export function moveSystem(dt: number) {
  for (const [entity] of engine.getEntitiesWith(MoveTransformComponent, Transform)) {

	const move = MoveTransformComponent.getMutable(entity)
	const transform = Transform.getMutable(entity)
    move.normalizedTime = Math.min(Math.max(move.normalizedTime + dt * move.speed, 0), 1)
    move.lerpTime = move.normalizedTime //  Interpolate(move.interpolationType, move.normalizedTime)

    // assign value to transform
    transform.position = Vector3.lerp(move.start, move.end, move.lerpTime)

    // has finished
    move.hasFinished = move.normalizedTime >= 1

    if (move.hasFinished) {
      MoveTransformComponent.deleteFrom(entity)
    }
  }
}

engine.addSystem(moveSystem)



// Lerp over the points of the curve
export function PatrolPath(dt:number) {

	  for (const[shark] of engine.getEntitiesWith(MoveTransformComponent)) {

		const transform = Transform.getMutable(shark)
		const path = PathDataComponent.getMutable(shark)
		const speed = SpeedComponent.getMutable(shark)
		transform.position = Vector3.lerp(
		  path.path[path.origin],
		  path.path[path.target],
		  path.fraction
		)
		path.fraction += speed.speed / 10
		if (path.fraction > 1) {
		  path.origin = path.target
		  path.target += 1
		  if (path.target >= path.path.length - 1) {
			path.target = 0
		  }
		  path.fraction = 0
		}
	  }
	
  }
  
  engine.addSystem(PatrolPath)
  


  // Rotate gradually with a spherical lerp
  export function RotateSystem(dt:number) {
	
	  for (const[shark] of engine.getEntitiesWith(RotateTransformComponent)) {
		const transform = Transform.getMutable(shark)
		const path = PathDataComponent.getMutable(shark)
		const speed = SpeedComponent.getMutable(shark)
		const rotate = RotateTransformComponent.getMutable(shark)
		rotate.fraction += speed.speed / 10
  
		if (rotate.fraction > 1) {
		  rotate.fraction = 0
		  rotate.originRot = transform.rotation
		  const direction = path.path[path.target]
			.subtract(path.path[path.origin])
			.normalize()
		  rotate.targetRot = Quaternion.lookRotation(direction)
		}
		transform.rotation = Quaternion.slerp(
		  rotate.originRot,
		  rotate.targetRot,
		  rotate.fraction
		)
	  }
	
  }
  
  engine.addSystem(RotateSystem)
  



  export function UpdateSpeed(dt:number) {

	for (const [shark] of engine.getEntitiesWith(SpeedComponent)) {

	  const speed = SpeedComponent.getMutable(shark)
	  const path = MoveTransformComponent.getMutable(shark)

	  let depthDiff =
		(path.path[path.target].y - path.path[path.origin].y) //* curvePoints
	  if (depthDiff > 1) {
		depthDiff = 1
	  } else if (depthDiff < -1) {
		depthDiff = -1
	  }
	  depthDiff += 1.5 // from 0.5 to 2.5

	  const clipSwim = Animator.getMutable(shark).states[0]
	  clipSwim.speed = depthDiff
	  clipSwim.weight = depthDiff

	  speed.speed = depthDiff * -1 + 3 // from 2.5 to 0.5
	  //log("dd :" , depthDiff, " speed: " , speed.speed)
	}
  }


engine.addSystem(UpdateSpeed)
