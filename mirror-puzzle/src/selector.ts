import {
  Entity,
  GltfContainer,
  InputAction,
  PointerEventType,
  RaycastQueryType,
  Transform,
  engine,
  inputSystem,
  raycastSystem
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { Mirror } from './mirror'
import { Blockers } from './blockers'

export class Selector {
  private static readonly SELECTOR_HAND_Y_OFFSET = 1.5

  selectorHand: Entity | null = null
  selectorGlow: Entity | null = null

  constructor() {
    // Selector
    this.selectorHand = engine.addEntity()
    GltfContainer.create(this.selectorHand, { src: 'models/selectorHand.glb' })
    Transform.create(this.selectorHand, { scale: Vector3.Zero() })

    this.selectorGlow = engine.addEntity()
    GltfContainer.create(this.selectorGlow, { src: 'models/selectorGlow.glb' })
    Transform.create(this.selectorGlow, { scale: Vector3.Zero() })

    let self = this
    // Adds system to the engine
    raycastSystem.registerLocalDirectionRaycast(
      {
        entity: engine.CameraEntity,
        opts: {
          queryType: RaycastQueryType.RQT_HIT_FIRST,
          direction: Vector3.Forward(),
          maxDistance: 5,
          continuous: true
        }
      },
      function (raycastResult) {
        if (raycastResult.hits.length > 0 && raycastResult.hits[0].meshName === 'mirrorSelector_collider') {
          let entityID: number | undefined = raycastResult.hits[0].entityId
          if (entityID != undefined && raycastResult.hits[0].normalHit != undefined) {
            self.selectorFace(entityID, raycastResult.hits[0].normalHit)
          }
        } else {
          if (self.selectorHand && self.selectorGlow) {
            Transform.getMutable(self.selectorHand).scale = Vector3.Zero()
            Transform.getMutable(self.selectorGlow).scale = Vector3.Zero()
          }
        }
      }
    )
  }

  selectorFace(entityID: number, hitNormal: Vector3) {
    let mirror = Mirror.GetMirror(entityID)
    if (mirror == null) return

    const mirrorPosition = Vector3.clone(Transform.getMutable(mirror.selectorEntity as Entity).position) // Clone position of the mirror

    let selectorGlowTransform = Transform.getMutable(this.selectorGlow as Entity)
    let selectorHandTransform = Transform.getMutable(this.selectorHand as Entity)

    selectorGlowTransform.position = Vector3.clone(mirrorPosition)
    selectorGlowTransform.position.y = mirrorPosition.y + 0.05
    selectorGlowTransform.scale = Vector3.One()

    selectorHandTransform.position = mirrorPosition
    selectorHandTransform.position.y = mirrorPosition.y + Selector.SELECTOR_HAND_Y_OFFSET
    selectorHandTransform.scale = Vector3.One()

    if (hitNormal.x > 0) {
      selectorHandTransform.rotation = Quaternion.fromEulerDegrees(0, 90, 0)
      selectorHandTransform.position.x = mirrorPosition.x + 1 / 1.99
    } else if (hitNormal.x < 0) {
      selectorHandTransform.rotation = Quaternion.fromEulerDegrees(0, -90, 0)
      selectorHandTransform.position.x = mirrorPosition.x - 1 / 1.99
    }
    if (hitNormal.z > 0) {
      selectorHandTransform.rotation = Quaternion.fromEulerDegrees(0, 0, 0)
      selectorHandTransform.position.z = mirrorPosition.z + 1 / 1.99
    } else if (hitNormal.z < 0) {
      selectorHandTransform.rotation = Quaternion.fromEulerDegrees(0, 180, 0)
      selectorHandTransform.position.z = mirrorPosition.z - 1 / 1.99
    }

    // Handle mouse left click
    const clickResult = inputSystem.getInputCommand(InputAction.IA_POINTER, PointerEventType.PET_DOWN)
    if (clickResult) {
      const currentPos = Vector3.clone(Transform.getMutable(mirror.selectorEntity as Entity).position)
      const endPos = Vector3.subtract(currentPos, hitNormal)

      // Checks if at least one mirror in the array is blocking its path
      const mirrorOverlap = Mirror.OccupiedByMirror(endPos)
      const isBlocked = Blockers.BLOCKED.some((block) => {
        return Vector3.equals(endPos, block)
      })

      // Check boundaries
      if (endPos.x >= 1 && endPos.x <= 15 && endPos.z >= 1 && endPos.z <= 31 && !mirrorOverlap && !isBlocked) {
        // Slide the mirror to its endPos over half a second
        mirror.moveMirror(currentPos, endPos)
      }
    }

    // Handle E press
    const eResult = inputSystem.getInputCommand(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)
    if (eResult) {
      mirror.rotateMirror(true)
    }

    // Handle F press
    const fResult = inputSystem.getInputCommand(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN)
    if (fResult) {
      mirror.rotateMirror(false)
    }
  }
}
