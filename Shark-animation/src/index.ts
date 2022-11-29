import { Animator, engine, GltfContainer, InputAction, pointerEventsSystem, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

export * from '@dcl/sdk'

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
  src: 'models/shark.glb'
})

Animator.create(shark, {
  states: [
    {
      clip: 'swim',
      name: 'swim',
      playing: true,
      loop: true
    },
    {
      clip: 'bite',
      name: 'bite',
      playing: false,
      loop: false,
      shouldReset: true
    }
  ]
})

pointerEventsSystem.onPointerDown(
  shark,
  () => {
    // TODO use Animator.getClip()
    const mutableAnimator = Animator.getMutable(shark)
    mutableAnimator.states[1].playing = true
  },
  {
    button: InputAction.IA_POINTER,
    hoverText: 'Bite'
  }
)
