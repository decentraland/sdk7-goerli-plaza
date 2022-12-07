import { createGLTF } from './gltf'
import { createDog } from './dog'
import { PointerHoverFeedback, PointerEventType, InputAction, createPointerEventSystem, pointerEventsSystem, engine } from '@dcl/sdk/ecs'
import { changeState } from './systems/dogAI'
import { dogStates } from './components'
import { moveSystem } from './systems/moveSystem'
import { timerSystem } from './systems/timeOutSystem'
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


const dog = createDog()


engine.addSystem(moveSystem)


engine.addSystem(timerSystem)