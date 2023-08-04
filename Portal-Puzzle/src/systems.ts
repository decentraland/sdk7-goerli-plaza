import {
  engine,
  Transform,
  Schemas,
  inputSystem,
  InputAction,
  PointerEventType,
  Entity,
  AudioSource,
  raycastSystem,
  DeepReadonlyObject,
  PBRaycastResult,
  RaycastQueryType,
  ColliderLayer
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { createPortal } from './portals'
import { HOLDING_GUN } from './gun'
import { GlowColor, Portal, PortalColor } from './components'
import * as utils from '@dcl-sdk/utils'

export let activePortal: PortalColor = PortalColor.Blue

/**
 * switch colors
 */
export function colorSystem(dt: number) {
  if (!HOLDING_GUN) return

  if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)) {
    if (activePortal == PortalColor.Blue) {
      activePortal = PortalColor.Orange
    } else {
      activePortal = PortalColor.Blue
    }

    const glowEntities = engine.getEntitiesWith(GlowColor)
    for (const [entity, glow] of glowEntities) {
      const glowTranform = Transform.getMutable(entity)
      if (glow.color == activePortal) {
        glowTranform.scale = Vector3.One()
      } else {
        glowTranform.scale = Vector3.Zero()
      }
    }
  }
}

/**
 * create portals
 */
export function gunSystem(dt: number) {
  if (!HOLDING_GUN) return

  const result = inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN)

  if (result) {
    raycastSystem.registerGlobalDirectionRaycast(
      {
        entity: engine.CameraEntity,
        opts: {
          queryType: RaycastQueryType.RQT_HIT_FIRST,
          direction: Vector3.rotate(Vector3.Forward(), Transform.get(engine.CameraEntity).rotation),
          maxDistance: 90,
          collisionMask: ColliderLayer.CL_PHYSICS | ColliderLayer.CL_POINTER
        }
      },
      function (raycastResult) {
        handlePortalRay(raycastResult)
      }
    )
  }
}

export function handlePortalRay(result: DeepReadonlyObject<PBRaycastResult>) {
  console.log(result)
  if (result && result.hits[0] && result.hits[0].position && result.hits[0].normalHit) {
    // remove old portals of that color
    const activePortals = engine.getEntitiesWith(Portal)
    for (const [entity, portal] of activePortals) {
      if (portal.color == activePortal) {
        utils.triggers.removeTrigger(entity)
        engine.removeEntity(entity)
      }
    }

    const playerPosition = Transform.get(engine.PlayerEntity).position
    const portalPosition = result.hits[0].position
    const adjustment = Vector3.scale(Vector3.normalize(Vector3.subtract(playerPosition, portalPosition)), 0.05)
    const adjustedPortalPosition = Vector3.add(portalPosition, adjustment)

    // create new portal
    createPortal(activePortal, {
      position: adjustedPortalPosition,
      rotation: Quaternion.lookRotation(result.hits[0].normalHit),

      //Quaternion.fromEulerDegrees(result.hit.normalHit.x * 180 / Math.PI, result.hit.normalHit.y * 180 / Math.PI, result.hit.normalHit.z * 180 / Math.PI),
      scale: Vector3.One()
    })

    //}
  } else {
    AudioSource.createOrReplace(engine.PlayerEntity, {
      audioClipUrl: 'sounds/portalFail.mp3',
      playing: true,
      loop: false
    })
  }
}
