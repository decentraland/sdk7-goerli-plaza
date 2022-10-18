
import { PathDataComponent } from '../components/path'
import { SpeedComponent } from '../components/swimSpeed'


// // Lerp over the points of the curve
export function PatrolPath(dt:number) {

	  for (const[entity] of engine.getEntitiesWith(PathDataComponent)) {
		const transform = Transform.getMutable(entity)
		const path = PathDataComponent.getMutable(entity)
		const speed = SpeedComponent.get(entity)
		
		// move
		path.fraction += speed.speed / 10
		transform.position = Vector3.lerp(
		  path.path[path.origin],
		  path.path[path.target],
		  path.fraction
		)

		// rotate
		transform.rotation = Quaternion.slerp(
				path.startRot,
				path.endRot,
				path.fraction
		)
		
		// next segment
		if (path.fraction > 1) {
		  path.origin = path.target
		  path.target += 1
		  if (path.target >= path.path.length - 1) {
			path.target = 0
		  }
		  path.fraction = 0

		  // rotation
		  path.startRot = transform.rotation
		  const difference = Vector3.subtract( path.path[path.target], path.path[path.origin])
		  const normalizedDifference = Vector3.normalize(difference)
		  path.endRot = Quaternion.lookRotation(normalizedDifference)

		  UpdateSpeed()
		}
	  }
	
  }
  




  export function UpdateSpeed() {

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
	}
  }


