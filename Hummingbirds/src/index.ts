import { createHummingBird } from './hummingBird'

const ground = engine.addEntity()
Transform.create(ground, {
  position: { x: 8, y: 0, z: 8 },
  rotation: { x: 0, y: 0, z: 0, w: 0 },
  scale: { x: 1.6, y: 1.6, z: 1.6 }
})
GltfContainer.create(ground, {
  src: 'models/Ground.gltf'
})

const tree = engine.addEntity()
Transform.create(tree, {
  position: { x: 8, y: 0, z: 8 },
  rotation: { x: 0, y: 0, z: 0, w: 0 },
  scale: { x: 1.6, y: 1.6, z: 1.6 }
})
GltfContainer.create(tree, {
  src: 'models/Tree.gltf'
})

Animator.create(tree, {
  states: [
    {
      clip: 'Tree_Action',
      loop: false,
      playing: false,
      shouldReset: true,
      name: 'Tree_Action'
    }
  ]
})

EventsSystem.onPointerDown(
  tree,
  function () {
    createHummingBird()
    const anim = Animator.getMutable(tree)
    anim.states[0].playing = true
  },
  {
    button: InputAction.IA_PRIMARY,
    hoverText: 'Shake'
  }
)
