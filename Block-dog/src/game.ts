import { createGLTF } from './gltf'
import { createDog } from './dog'

createGLTF(
  {
    position: { x: 8, y: 0, z: 8 },
    scale: { x: 1.6, y: 1.6, z: 1.6 },
    rotation: { x: 0, y: 180, z: 0, w: 1 }
  },
  'models/garden.glb'
)

const bowl = createGLTF(
  {
    position: { x: 9, y: 0, z: 1 },
    scale: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: 180, z: 0, w: 1 }
  },
  'models/BlockDogBowl.gltf'
)

PointerHoverFeedback.create(bowl, {
  pointerEvents: [
    {
      eventType: PointerEventType.PET_DOWN,
      eventInfo: {
        button: InputAction.IA_PRIMARY,
        hoverText: 'Drink'
      }
    }
  ]
})

createDog()
