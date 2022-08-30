// Coordinates of path to patrol

const point1 = {x:8, y:0, z:8}
const point2 = {x:8, y:0, z:24}
const point3 = {x:24,y: 0,z: 24}
const point4 = {x:24,y: 0,z: 8}
const pathArray= [point1, point2, point3, point4]


const TURN_TIME = 0.9


const { Transform, GLTFShape } = engine.baseComponents
import { MoveTransformComponent } from './components/moveTransport'
import { gnarkStates, NPComponent } from "./components/NPC"
import { PathDataComponent } from './components/pathData'
import { TimeOutComponent } from "./components/timeOut"



export function createGnark(): Entity {
	const gnark = engine.addEntity()
  
	Transform.create(gnark, {
	  position: point1,
	  scale: { x: 1, y: 1, z: 1 },
	  rotation: { x: 0, y: 0, z: 0, w: 1 }
	})


	
  
	GLTFShape.create(gnark, {
	  withCollisions: true,
	  isPointerBlocker: true,
	  visible: true,
	  src: 'models/gnark.glb'
	})

	engine.baseComponents.Animator.create(gnark, {states:[{
			name: "walk",
			clip: "walk",
			playing: true,
			weight: 1,
			speed: 1,
			loop: true,
			shouldReset: false
		}, {
			name: "turnRight",
			clip: "turnRight",
			playing: false,
			weight: 1,
			speed: 1,
			loop: false,
			shouldReset: true
		},
		{
			name: "raiseDead",
			clip: "raiseDead",
			playing: false,
			weight: 1,
			speed: 1,
			loop: true,
			shouldReset: true
		}
	]})

	NPComponent.create(gnark, {state: gnarkStates.WALKING, previousState: gnarkStates.WALKING})

	const randomPathStart = Math.floor(Math.random()*3)

	PathDataComponent.create(gnark,{
		path: pathArray,
		paused: false,
		origin: randomPathStart,
		target: randomPathStart + 1
	})
  
	MoveTransformComponent.create(gnark, {
	  start: point1,
	  end: point2,
	  duration: 5,
	  normalizedTime: 0,
	  lerpTime: 0,
	  speed: 0.1,
	  hasFinished: false,
	  interpolationType: 1
	})

	TimeOutComponent.create(gnark, {
		timeLeft:0.9,
		hasFinished: false,
		paused: false
	})
  
	return gnark
  }

  