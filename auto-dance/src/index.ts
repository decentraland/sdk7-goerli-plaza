import { Vector3 } from '@dcl/sdk/math'
import { createBasicDanceArea, createDanceArea } from './autoDance'
import { engine, Transform, MeshRenderer, GltfContainer } from '@dcl/sdk/ecs'
import { setupUi } from './ui'

export function main() {
  // UI with GH link
  setupUi()

  createDanceArea(Vector3.create(4, 1, 4), Vector3.create(4, 1, 4))
  createBasicDanceArea(Vector3.create(10, 1, 10), Vector3.create(4, 1, 4))

  const base = engine.addEntity()
  // Transform.create(base, {

  // })
  GltfContainer.create(base, {
    src: 'models/baseLight.glb'
  })

  const platform1 = engine.addEntity()
  Transform.create(platform1, {
    position: Vector3.create(4, -0.5, 4),
    scale: Vector3.create(2, 1, 2)
  })
  GltfContainer.create(platform1, {
    src: 'models/platform.glb'
  })

  const platform2 = engine.addEntity()
  Transform.create(platform2, {
    position: Vector3.create(10, -0.5, 10),
    scale: Vector3.create(2, 1, 2)
  })
  GltfContainer.create(platform2, {
    src: 'models/platform.glb'
  })
}
