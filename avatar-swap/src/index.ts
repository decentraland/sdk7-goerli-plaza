import { AvatarAnchorPointType, AvatarAttach, engine, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { createArissaCharacter } from './modules/arissa'
import { createAvatarSwappingArea, avatarSwappingSystem } from './modules/avatarSwappingArea'
import { setupUi } from './ui'

export function main() {
  // UI with GH link
  setupUi()

  // Instantiate ground model
  const groundEntity = engine.addEntity()
  GltfContainer.create(groundEntity, {
    src: 'models/baseGrass.glb'
  })

  // Instantiate 'Arissa' character animated model
  const arissaCharaEntity = createArissaCharacter()
  const parent = Transform.get(arissaCharaEntity).parent
  if (parent) {
    AvatarAttach.create(parent, {
      anchorPointId: AvatarAnchorPointType.AAPT_POSITION
    })
  }

  // Set avatar modifier area to swap player avatar
  createAvatarSwappingArea(Vector3.create(8, 2, 10.5), Vector3.create(16, 4, 11), arissaCharaEntity)

  // Register avatar swapping system
  engine.addSystem(avatarSwappingSystem)
}
