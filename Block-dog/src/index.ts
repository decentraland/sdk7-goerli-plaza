import { createGLTF } from './gltf'
import { createDog } from './dog'
import { InputAction,  pointerEventsSystem, engine } from '@dcl/sdk/ecs'
import { changeState, randomSwitchBehavior } from './systems/dogAI'
import { dogStates } from './components'
import { moveSystem } from './systems/moveSystem'
import { Vector3 } from '@dcl/sdk/math'
export * from '@dcl/sdk'

createGLTF(
  {
    position: { x: 8, y: 0, z: 8 },
    scale: { x: 1.6, y: 1.6, z: 1.6 },
    rotation: { x: 0, y: 180, z: 0, w: 1 }
  },
  'models/garden.glb'
)

export const bowl = createGLTF(
  {
    position: { x: 9, y: 0, z: 1 },
    scale: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: 180, z: 0, w: 1 }
  },
  'models/BlockDogBowl.gltf'
)

pointerEventsSystem.onPointerDown(
	bowl, ()=>{
		changeState(dog, dogStates.GoDrink)
	},
	{
		button: InputAction.IA_PRIMARY,
		hoverText: 'Drink'
	}
)


const dog = createDog(Vector3.create( 8, 0, 9))

const dog2 = createDog(Vector3.create( 10, 0, 8))


engine.addSystem(moveSystem)

engine.addSystem(randomSwitchBehavior)