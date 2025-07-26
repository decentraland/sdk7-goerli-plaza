import { engine, Entity, GltfContainer, Transform, raycastSystem, RaycastQueryType } from '@dcl/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { PuzzleBuilder } from './puzzleBuilder'
import { MAX_DISTANCE } from '.'

export class Selector {
  selectorHand: Entity = engine.addEntity()
  selectorGlow: Entity = engine.addEntity()
  SELECTOR_HAND_Y_OFFSET = 1.35
  static raycastNormalHit: Vector3
  static entityID: number = -1

  constructor() {
    // Selector
    GltfContainer.create(this.selectorHand, { src: 'assets/scene/Models/selectorHand.glb' })
    Transform.create(this.selectorHand, { scale: Vector3.create(0, 0, 0) })

    GltfContainer.create(this.selectorGlow, { src: 'assets/scene/Models/selectorGlow.glb' })
    Transform.create(this.selectorGlow, { scale: Vector3.create(0, 0, 0) })

    let self = this

    // Adds system to the engine
    raycastSystem.registerLocalDirectionRaycast(
      {
        entity: engine.CameraEntity,
        opts: {
          queryType: RaycastQueryType.RQT_QUERY_ALL,
          direction: Vector3.Forward(),
          maxDistance: MAX_DISTANCE,
          continuous: true
        }
      },
      function (raycastResult) {
        if (raycastResult.hits.length > 0) {
          if (raycastResult.hits[0].meshName === 'statue_collider') {
            let entityID: number | undefined = raycastResult.hits[0].entityId
            if (entityID != undefined && raycastResult.hits[0].normalHit != undefined) {
              Selector.raycastNormalHit = raycastResult.hits[0].normalHit
              Selector.entityID = entityID
              self.selectorFace(entityID, raycastResult.hits[0].normalHit)
            }
          } else {
            Transform.getMutable(self.selectorHand).scale = Vector3.create(0, 0, 0)
            Transform.getMutable(self.selectorGlow).scale = Vector3.create(0, 0, 0)
          }
        } else {
          Transform.getMutable(self.selectorHand).scale = Vector3.create(0, 0, 0)
          Transform.getMutable(self.selectorGlow).scale = Vector3.create(0, 0, 0)
        }
      }
    )
  }

  selectorFace(entityID: number, hitNormal: Vector3) {
    let entity: Entity | undefined
    // Find our Entity from it's ID
    PuzzleBuilder.statues.forEach((element) => {
      if (element.entity == entityID) {
        entity = element.entity
      }
    })

    if (entity == undefined) {
      return
    }

    const statuePosition: Vector3 = Transform.get(entity).position // Copy the statue position

    Transform.getMutable(this.selectorGlow).position = Vector3.create(
      statuePosition.x,
      statuePosition.y + 0.035,
      statuePosition.z
    )
    Transform.getMutable(this.selectorGlow).scale = Vector3.create(1, 1, 1)

    Transform.getMutable(this.selectorHand).position = Vector3.create(
      statuePosition.x,
      statuePosition.y + this.SELECTOR_HAND_Y_OFFSET,
      statuePosition.z
    )
    Transform.getMutable(this.selectorHand).scale = Vector3.create(1, 1, 1)

    let selectorRotation = Transform.getMutable(this.selectorHand).rotation
    if (hitNormal.x > 0) {
      selectorRotation = Quaternion.fromEulerDegrees(0, 90, 0)
      Transform.getMutable(this.selectorHand).position.x = statuePosition.x + 2 / 1.99
    } else if (hitNormal.x < 0) {
      selectorRotation = Quaternion.fromEulerDegrees(0, -90, 0)
      Transform.getMutable(this.selectorHand).position.x = statuePosition.x - 2 / 1.99
    }
    if (hitNormal.z > 0) {
      selectorRotation = Quaternion.fromEulerDegrees(0, 0, 0)
      Transform.getMutable(this.selectorHand).position.z = statuePosition.z + 2 / 1.99
    } else if (hitNormal.z < 0) {
      selectorRotation = Quaternion.fromEulerDegrees(0, 180, 0)
      Transform.getMutable(this.selectorHand).position.z = statuePosition.z - 2 / 1.99
    }
    Transform.getMutable(this.selectorHand).rotation = selectorRotation
  }
}
