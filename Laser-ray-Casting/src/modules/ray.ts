import { engine, Transform, RaycastResult, Material, Entity, Raycast, RaycastQueryType } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { defaultMaterial, hitMaterial, hitMaterial2, MovingCube, Ray } from '../definitions'

let lastHitEntity: Entity
export function raycastResultsSystem() {
  for (const [entity, raycastResult] of engine.getEntitiesWith(RaycastResult)) {
    if (raycastResult.hits.length > 0) {
      const entityHit = raycastResult.hits[0].entityId
      if (entityHit) {
        lastHitEntity = entityHit as Entity
        Material.setPbrMaterial(lastHitEntity, entity === engine.CameraEntity ? hitMaterial2 : hitMaterial) 
      }      
    } else if (lastHitEntity) {
      Material.setPbrMaterial(lastHitEntity, defaultMaterial)
    }
  }
}

// There are 4 types of 'direction' we may use with the Raycast component,
// by changing 'raycastMode' you can try out those different types
const enum RaycastModeType {
  LOCAL_DIRECTION,
  GLOBAL_DIRECTION,
  TARGET_ENTITY,
  GLOBAL_TARGET
}
let raycastMode = RaycastModeType.LOCAL_DIRECTION

// Only used if raycastMode is TARGET_ENTITY or GLOBAL_TARGET
const rayTargetEntity = engine.addEntity()
const rayTargetTransform = Transform.create(rayTargetEntity, {
  position: Vector3.create(8, 1, 20)
})

export function createRaycast(entity: Entity)
{
  const ray = Ray.getOrNull(entity)
  if(!ray) return
  
  let direction: {$case: "localDirection", localDirection: Vector3}
      | {$case: "globalDirection", globalDirection: Vector3}
      | {$case: "globalTarget", globalTarget: Vector3}
      | {$case: "targetEntity", targetEntity: Entity}
  switch (raycastMode) {
    case RaycastModeType.LOCAL_DIRECTION:
      direction = {
        $case: "localDirection",
        localDirection: Vector3.Forward()
      }
      break
    case RaycastModeType.GLOBAL_DIRECTION:
      direction = {
        $case: "globalDirection",
        globalDirection: Vector3.Forward()
      }
      break
    case RaycastModeType.TARGET_ENTITY:
      direction = {
        $case: "targetEntity",
        targetEntity: rayTargetEntity
      }
      break
    case RaycastModeType.GLOBAL_TARGET:
      direction = {
        $case: "globalTarget",
        globalTarget: rayTargetTransform.position
      }
      break
  }
  Raycast.createOrReplace(entity, {
    direction: direction,
    maxDistance: ray.power,
    queryType: RaycastQueryType.RQT_HIT_FIRST,
    continuous: true // don't overuse the 'continuous' property as raycasting is expensive on performance
  })
}
