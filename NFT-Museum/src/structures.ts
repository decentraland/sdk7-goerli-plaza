import { Animator, GltfContainer, Transform, engine } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

export let sceneCentrePosition = Vector3.create(16, 0, 16)

export function createBaseScene() {
  const scene = engine.addEntity()
  Transform.create(scene, {
    position: Vector3.create(0, 0, 0),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1)
  })

  const museum = engine.addEntity()
  Transform.create(museum, {
    position: sceneCentrePosition,
    rotation: Quaternion.Zero(),
    scale: Vector3.One(),
    parent: scene
  })
  GltfContainer.create(museum, {
    src: 'models/museum-noAlpha.glb'
  })

  const museumAlpha = engine.addEntity()
  Transform.create(museumAlpha, {
    position: sceneCentrePosition,
    rotation: Quaternion.Zero(),
    scale: Vector3.One(),
    parent: scene
  })
  GltfContainer.create(museumAlpha, {
    src: 'models/museum-Alpha.glb'
  })



  const museumAnimation = engine.addEntity()
  Transform.create(museumAnimation, {
    position: sceneCentrePosition,
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: Vector3.One(),
    parent: scene
  })
  GltfContainer.create(museumAnimation, {
    src: 'models/museumAnimation.glb'
  })
  Animator.create(museumAnimation, {
    states: [
      {
        clip: 'play6',
        playing: true,
        loop: true
      }
    ]
  })

  return scene
}
