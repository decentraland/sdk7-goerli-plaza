import { engine, Entity, Transform, Animator, AvatarModifierArea, AvatarModifierType } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { IntervalUtil } from './intervalUtil'

let areaCenter: Vector3
let areaSize: Vector3
let areaMinPosition: Vector3
let areaMaxPosition: Vector3

function setupAreaData(center: Vector3, size: Vector3) {
  areaCenter = center
  areaSize = size

  const halfSize = Vector3.scale(size, 0.5)
  areaMinPosition = Vector3.create(areaCenter.x - halfSize.x, areaCenter.y - halfSize.y, areaCenter.z - halfSize.z)
  areaMaxPosition = Vector3.create(areaCenter.x + halfSize.x, areaCenter.y + halfSize.y, areaCenter.z + halfSize.z)
}

function isPositionInsideArea(targetPosition: Vector3): boolean {
  return (
    targetPosition.x > areaMinPosition.x &&
    targetPosition.y > areaMinPosition.y &&
    targetPosition.z > areaMinPosition.z &&
    targetPosition.x < areaMaxPosition.x &&
    targetPosition.y < areaMaxPosition.y &&
    targetPosition.z < areaMaxPosition.z
  )
}

let otherAvatarEntity: Entity
export function createAvatarSwappingArea(center: Vector3, size: Vector3, avatarEntity: Entity) {
  setupAreaData(center, size)
  otherAvatarEntity = avatarEntity
  const avatarHiderAreaEntity = engine.addEntity()
  AvatarModifierArea.create(avatarHiderAreaEntity, {
    area: areaSize,
    modifiers: [AvatarModifierType.AMT_HIDE_AVATARS],
    excludeIds: []
  })
  Transform.create(avatarHiderAreaEntity, {
    position: areaCenter
  })
}

let lastPlayerPos: Vector3 | undefined = undefined
const intervalUtil = new IntervalUtil(50)

export function avatarSwappingSystem(dt: number) {
  if (!Transform.has(engine.PlayerEntity)) return

  if (!intervalUtil.update(dt)) return

  const playerPos = Transform.get(engine.PlayerEntity).position
  const moved = playerPos != lastPlayerPos

  Animator.getClip(otherAvatarEntity, 'Idle').playing = !moved
  Animator.getClip(otherAvatarEntity, 'Running').playing = moved

  if (!moved) return

  const playerIsInsideHidingArea = isPositionInsideArea(playerPos)
  const otherAvatarTransform = Transform.getMutable(otherAvatarEntity)
  otherAvatarTransform.scale.x = playerIsInsideHidingArea ? 1.1 : 0
  otherAvatarTransform.scale.y = playerIsInsideHidingArea ? 1.1 : 0
  otherAvatarTransform.scale.z = playerIsInsideHidingArea ? 1.1 : 0

  lastPlayerPos = playerPos
}
