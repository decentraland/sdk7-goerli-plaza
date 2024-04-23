import {
  Animator,
  AudioSource,
  ColliderLayer,
  engine,
  GltfContainer,
  InputAction,
  pointerEventsSystem,
  Transform
} from '@dcl/sdk/ecs'
import { createHummingBird } from './hummingBird'
import { setupUi } from './ui'

export function main() {
  const ground = engine.addEntity()
  Transform.create(ground, {
    position: { x: 8, y: 0, z: 8 },
    scale: { x: 1.6, y: 1.6, z: 1.6 }
  })
  GltfContainer.create(ground, {
    src: 'models/Ground.gltf'
  })

  const tree = engine.addEntity()
  Transform.create(tree, {
    position: { x: 8, y: 0, z: 8 },
    scale: { x: 1.6, y: 1.6, z: 1.6 }
  })
  GltfContainer.create(tree, {
    src: 'models/Tree.gltf',
    visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
    invisibleMeshesCollisionMask: undefined
  })

  AudioSource.create(tree, {
    audioClipUrl: 'sounds/pickUp.mp3',
  })

  Animator.create(tree, {
    states: [
      {
        clip: 'Tree_Action',
        shouldReset: true
      }
    ]
  })

  pointerEventsSystem.onPointerDown(
    {
      entity: tree,
      opts: {
        button: InputAction.IA_PRIMARY,
        hoverText: 'Shake'
      }
    },
    function () {
      createHummingBird()
      const anim = Animator.getMutable(tree)
      anim.states[0].playing = true
      AudioSource.playSound(tree, 'sounds/pickUp.mp3')
    }
  )

  // UI with GitHub link
  setupUi()
}
