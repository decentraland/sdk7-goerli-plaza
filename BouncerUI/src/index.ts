import {
  engine,
  GltfContainer,
  InputAction,
  inputSystem,
  Material,
  MeshCollider,
  pointerEventsSystem,
  Transform
} from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'

import { setupUi } from './ui'

export function main() {
  // draw UI
  setupUi()

  const bermudaGrass = engine.addEntity()
  Transform.create(bermudaGrass, {
    position: Vector3.create(8, 0, 8),
    scale: Vector3.create(1, 1, 1),
    rotation: Quaternion.create(0, 0, 0, 1)
  })
  GltfContainer.create(bermudaGrass, {
    src: 'assets/scene/Models/FloorBaseGrass_01/FloorBaseGrass_01.glb'
  })

  const shopEmissive = engine.addEntity()
  Transform.create(shopEmissive, {
    position: Vector3.create(9.5, 0, 8),
    scale: Vector3.create(1, 1, 1),
    rotation: Quaternion.create(0, 0, 0, 1)
  })
  GltfContainer.create(shopEmissive, {
    src: 'assets/scene/Models/Shop_Emissive.glb'
  })
}
