import { MoveTransformComponent, RotateTransformComponent } from '../components/moveTransport'
import { PathDataComponent } from '../components/path'
import { SpeedComponent } from '../components/swimSpeed'
// import { Interpolate } from '../helper/interpolation'


export function moveSystem(dt: number) {
  for (const [entity] of engine.getEntitiesWith(MoveTransformComponent)) {

	

	const move = MoveTransformComponent.getMutable(entity)
	const transform = Transform.getMutable(entity)
	const speed = SpeedComponent.get(entity)

    const normalizedTime = Math.min(Math.max(move.fraction + dt * speed.speed, 0), 1)
    move.fraction = normalizedTime //  Interpolate(move.interpolationType, move.normalizedTime)

	// log("shark current origin :" , move.start, " end: ", move.end, " progress: ", move.fraction)

    // assign value to transform
    transform.position = Vector3.lerp(move.start, move.end, move.fraction)

    // has finished
    move.hasFinished = move.fraction >= 1

    if (move.hasFinished) {
      MoveTransformComponent.deleteFrom(entity)
	  log("move finished")
    }
  }
}

engine.addSystem(moveSystem)



// // Lerp over the points of the curve
export function PatrolPath(dt:number) {

	  for (const[shark] of engine.getEntitiesWith(PathDataComponent)) {

		const transform = Transform.getMutable(shark)
		const path = PathDataComponent.getMutable(shark)
		const speed = SpeedComponent.get(shark)
		transform.position = Vector3.lerp(
		  path.path[path.origin],
		  path.path[path.target],
		  path.fraction
		)
		path.fraction += speed.speed / 10
		if (path.fraction > 1) {
		  path.origin = path.target
		  path.target += 1
		  log("shark moving in path, new target ", path.target)
		  if (path.target >= path.path.length - 1) {
			path.target = 0
			log("shark restarting path ", path.target)
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
		const speed = SpeedComponent.get(shark)
		const rotate = RotateTransformComponent.getMutable(shark)
  		rotate.fraction += speed.speed / 10
  

		if (rotate.fraction > 1) {
		  rotate.fraction = 0
		  rotate.start = transform.rotation

		  const difference = Vector3.subtract( path.path[path.target], path.path[path.origin])
		  const normalizedDifference = Vector3.normalize(difference)
		  rotate.end = Quaternion.lookRotation(normalizedDifference)

		//   const direction = path.path[path.target].subtract(path.path[path.origin])
		// 	.normalize()
		//   rotate.targetRot = Quaternion.lookRotation(direction)
		 }
		transform.rotation = Quaternion.slerp(
		  rotate.start,
		  rotate.end,
		  rotate.fraction
		)
    }
	
}
  
engine.addSystem(RotateSystem)
  



  export function UpdateSpeed(dt:number) {

	for (const [shark] of engine.getEntitiesWith(SpeedComponent)) {

	  const speed = SpeedComponent.getMutable(shark)
	  const path = PathDataComponent.get(shark)

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
