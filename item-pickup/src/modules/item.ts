import { Vector3 } from '@dcl/sdk/math'
import { engine, GltfContainer, Transform, AudioSource, Entity, VisibilityComponent } from '@dcl/sdk/ecs'
import { PickableItem } from '../definitions'

export function instantiatePickableItem(modelPath: string, pos: Vector3, sfxPath: string, respawnSeconds: number) {
  const entity = engine.addEntity()
  GltfContainer.create(entity, {
    src: modelPath
  })

  VisibilityComponent.create(entity)

  Transform.create(entity, {
    position: pos
  })

  AudioSource.create(entity, {
    audioClipUrl: sfxPath,
    playing: false,
    loop: false
  })

  PickableItem.create(entity, {
    respawnSeconds: respawnSeconds,
    respawnTimer: -1,
    playerDetectionArea: Vector3.create(1.5, 3, 1.5)
  })
}

function isPositionInsidePickUpArea(targetPosition: Vector3, pickableItemEntity: Entity): boolean {
  const pickableItemComp = PickableItem.get(pickableItemEntity)
  const transformComp = Transform.get(pickableItemEntity)

  const detectionAreaCenter = transformComp.position
  const detectionAreaSize = pickableItemComp.playerDetectionArea

  const halfSize = Vector3.scale(detectionAreaSize, 0.5)
  const areaMinPosition = Vector3.create(
    detectionAreaCenter.x - halfSize.x,
    detectionAreaCenter.y - halfSize.y,
    detectionAreaCenter.z - halfSize.z
  )
  const areaMaxPosition = Vector3.create(
    detectionAreaCenter.x + halfSize.x,
    detectionAreaCenter.y + halfSize.y,
    detectionAreaCenter.z + halfSize.z
  )

  return (
    targetPosition.x > areaMinPosition.x &&
    targetPosition.y > areaMinPosition.y &&
    targetPosition.z > areaMinPosition.z &&
    targetPosition.x < areaMaxPosition.x &&
    targetPosition.y < areaMaxPosition.y &&
    targetPosition.z < areaMaxPosition.z
  )
}

let lastPlayerPos: Vector3 | undefined = undefined
export function itemPickupSystem(deltaTime: number) {
  if (!Transform.has(engine.PlayerEntity)) return

  const playerPos = Transform.get(engine.PlayerEntity).position
  const moved = playerPos != lastPlayerPos

  for (const [entity] of engine.getEntitiesWith(PickableItem)) {
    const visibilityComp = VisibilityComponent.getMutable(entity)
    const pickableItemComp = PickableItem.getMutable(entity)

    if (visibilityComp.visible) {
      if (moved && isPositionInsidePickUpArea(playerPos, entity)) {
        // Pick item
        visibilityComp.visible = false
        pickableItemComp.respawnTimer = pickableItemComp.respawnSeconds
        AudioSource.getMutable(entity).playing = true
      }
    } else {
      pickableItemComp.respawnTimer -= deltaTime

      // Respawn item
      if (pickableItemComp.respawnTimer <= 0) {
        visibilityComp.visible = true
      }
    }
  }

  lastPlayerPos = playerPos
}
