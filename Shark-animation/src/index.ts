import {
  Animator,
  ColliderLayer,
  engine,
  GltfContainer,
  InputAction,
  pointerEventsSystem,
  Transform
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { setupUi } from './ui'

export function main() {
  const seaBed = engine.addEntity()

  Transform.create(seaBed, {
    position: Vector3.create(8, 0, 8),
    scale: Vector3.create(0.8, 0.8, 0.8)
  })

  GltfContainer.create(seaBed, {
    src: 'models/Underwater.gltf'
  })

  const shark = engine.addEntity()

  Transform.create(shark, {
    position: Vector3.create(8, 3, 8)
  })

  GltfContainer.create(shark, {
    src: 'models/shark.glb',
    visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
    invisibleMeshesCollisionMask: undefined
  })

  Animator.create(shark, {
    states: [
      {
        clip: 'swim',
        playing: true,
        loop: true
      },
      {
        clip: 'bite',
        playing: false,
        loop: false,
        shouldReset: true
      }
    ]
  })

  pointerEventsSystem.onPointerDown(
    {
      entity: shark,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Bite'
      }
    },
    () => {
      // TODO use Animator.getClip()
      const mutableAnimator = Animator.getMutable(shark)
      mutableAnimator.states[1].playing = true
    }
  )

  // UI with GitHub link
  setupUi()
}
