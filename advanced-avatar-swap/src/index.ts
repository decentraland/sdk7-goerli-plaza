import { AvatarAnchorPointType, AvatarAttach, engine, MeshRenderer, Transform } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { initializeCharacter, initializeModels } from './modules/modelsHandler'
import { createAvatarSwappingArea, avatarSwappingSystem, createSeparationWall } from './modules/avatarSwappingArea'
import { createJoinTeamControl } from './modules/swappingControls'
import { TeamModels } from './modules/modelsHandler'

export function main() {
  // Initializing for models to be properly loaded even before usage
  initializeModels()

  // Instantiate ground model
  const groundEntity = engine.addEntity()
  MeshRenderer.setBox(groundEntity)
  Transform.create(groundEntity, {
    position: Vector3.create(8, 0, 18.5),
    scale: Vector3.create(16, 0.1, 27)
  })

  // Instantiate 'Santa' character animated model
  const modelEntity = initializeCharacter()

  const modelEntityTransform = Transform.get(modelEntity)

  if (modelEntityTransform.parent) {
    AvatarAttach.create(modelEntityTransform.parent, {
      anchorPointId: AvatarAnchorPointType.AAPT_POSITION
    })
  }

  // Set avatar modifier area to swap player avatar
  createAvatarSwappingArea(Vector3.create(8, 2, 18.5), Vector3.create(16, 4, 27), modelEntity)

  // Add a wall of separation between 2 areas
  createSeparationWall(Vector3.create(8, 0.5, 4.75), Vector3.create(16, 1.5, 0.5))

  // Add Swap Models Controls
  createJoinTeamControl(TeamModels.Santa, Vector3.create(7, 1, 6), Color4.Red())
  createJoinTeamControl(TeamModels.Krampus, Vector3.create(9, 1, 6), Color4.Blue())

  // Register avatar swapping system
  engine.addSystem(avatarSwappingSystem)
}
