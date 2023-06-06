import { createDog } from './dog'
import { InputAction, pointerEventsSystem, engine, Transform, GltfContainer } from '@dcl/sdk/ecs'
import { changeState, randomSwitchBehavior } from './systems/dogAI'
import { dogStates } from './components'
import { moveSystem } from './systems/moveSystem'
import { Vector3 } from '@dcl/sdk/math'
export * from '@dcl/sdk'

const garden = engine.addEntity()

Transform.create(garden, {
  position: Vector3.create(8, 0, 8),
  scale: Vector3.create(1.6, 1.6, 1.6)
})

GltfContainer.create(garden, {
  src: 'models/garden.glb'
})

export const bowl = engine.addEntity()

Transform.create(bowl, {
  position: Vector3.create(9, 0, 1)
})

GltfContainer.create(bowl, {
  src: 'models/BlockDogBowl.gltf'
})

pointerEventsSystem.onPointerDown(
  bowl,
  () => {
    changeState(dog, dogStates.GoDrink)
  },
  {
    button: InputAction.IA_PRIMARY,
    hoverText: 'Drink'
  }
)

const dog = createDog(Vector3.create(8, 0, 9))

const dog2 = createDog(Vector3.create(10, 0, 8))

engine.addSystem(moveSystem)

engine.addSystem(randomSwitchBehavior)
