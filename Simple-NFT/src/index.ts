import {
  engine,
  GltfContainer,
  InputAction,
  inputSystem,
  Material,
  MeshCollider,
  MeshRenderer,
  NftFrameType,
  NftShape,
  pointerEventsSystem,
  Transform
} from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { setupUi } from './ui'

export function main() {
  const painting = engine.addEntity()
  Transform.create(painting, {
    position: Vector3.create(4, 1.5, 4)
  })

  NftShape.create(painting, {
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:229795',
    color: Color4.Red(),
    style: NftFrameType.NFT_GOLD_CARVED
  })

  const floor = engine.addEntity()
  Transform.create(floor, {
    position: Vector3.create(8, 0, 8),
    scale: Vector3.create(1.6, 0.1, 1.6)
  })
  GltfContainer.create(floor, {
    src: 'assets/models/FloorBaseGrass.glb'
  })

  const wall = engine.addEntity()
  Transform.create(wall, {
    position: Vector3.create(4.5, 1, 4.1),
    scale: Vector3.create(4, 3, 0.05)
  })
  MeshCollider.setBox(wall)
  MeshRenderer.setBox(wall)

  // UI with GitHub link
  setupUi()
}
