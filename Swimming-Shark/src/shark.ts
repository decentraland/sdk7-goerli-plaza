import { MoveTransformComponent, RotateTransformComponent } from "./components/moveTransport"
import { PathDataComponent } from "./components/path"
import { SpeedComponent } from "./components/swimSpeed"


// how many points on the curve
const curvePoints = 25

// Define the points through which the path must pass
const cpoint1 =  {x:6.4, y: 3.2, z: 4.2}
const cpoint2 = {x:12.8,y: 8, z:3.2}
const cpoint3 = {x:12.8,y: 7, z:12.8}
const cpoint4 = {x:3.2, y:3.2,z: 11.2}

// Compile these points into an array
const cpoints = [cpoint1, cpoint2, cpoint3, cpoint4]

// Create a Catmull-Rom Spline curve. This curve passes through all 4 points. The total number of points in the path is set by  `curvePoints`
// const catmullPath = Curve3.CreateCatmullRomSpline(
//   cpoints,
//   curvePoints,
//   true
// ).getPoints()






createShark()

export function createShark(){


	const shark = engine.addEntity()
	Transform.create(shark, {
		position: {x:1, y:0, z:1},
		rotation: {x:0, y:0, z:0, w: 1},
		scale:  {x:0.5, y:0.5, z:0.5}
	})
	GLTFShape.create(shark, {
		src:'models/shark.glb'
	})
	Animator.create(shark, {
		states:[
			{
				clip: "swim",
				loop: true,
				playing: true,
				speed: 0.5,
				weight: 0.5,
				name: "swim" 
			},
			{
				clip: "bite",
				loop: true,
				playing: false,
				shouldReset: false,
				name: "bite" 
			}
		]
	})

	SpeedComponent.create(shark, {
		speed: 0.5
	})

	MoveTransformComponent.create(shark, {
		hasFinished: false,
		start:cpoint1,
		end: cpoint2,
		lerpTime: 1,
		speed: SpeedComponent.get(shark).speed
	})

	RotateTransformComponent.create(shark, {
		hasFinished: false,
		start: Quaternion.Identity,
		end: Quaternion.Identity,
		lerpTime: 1,
		speed: 1,
		interpolationType: 1
	})

	PathDataComponent.create(shark,
		{
			path: cpoints,
			origin: 0,
			target: 1,
			paused: false	
		})


}
