import { createDog } from './dog'
import { InputAction, pointerEventsSystem, engine, Transform, GltfContainer, ColliderLayer } from '@dcl/sdk/ecs'
import { BowlPosition, changeState, randomSwitchBehavior } from './systems/dogAI'
import { dogStates } from './components'
import { moveSystem } from './systems/moveSystem'
import { Vector3 } from '@dcl/sdk/math'
import { setupUi } from './ui'

export function main() {
  const garden = engine.addEntity()

  Transform.create(garden, {
    position: Vector3.create(8, 0, 8),
    scale: Vector3.create(1.6, 1.6, 1.6)
  })

  GltfContainer.create(garden, {
    src: 'models/garden.glb'
  })

  const bowl = engine.addEntity()

  Transform.create(bowl, {
    position: BowlPosition
  })

  GltfContainer.create(bowl, {
    src: 'models/BlockDogBowl.gltf',
    visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
    invisibleMeshesCollisionMask: undefined
  })

  pointerEventsSystem.onPointerDown(
    {
      entity: bowl,
      opts: {
        button: InputAction.IA_PRIMARY,
        hoverText: 'Drink'
      }
    },
    () => {
      changeState(dog, dogStates.GoDrink)
    }
  )

  const dog = createDog(Vector3.create(8, 0, 9))

  const dog2 = createDog(Vector3.create(10, 0, 8))

  engine.addSystem(moveSystem)

  engine.addSystem(randomSwitchBehavior)

  // UI with GitHub link
  setupUi()
}
