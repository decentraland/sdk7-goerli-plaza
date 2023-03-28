import { engine, Transform, RaycastResult, Material, Entity, Raycast, RaycastQueryType, TransformType } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import {
  defaultMaterial,
  hitMaterial,
  hitMaterial2,
  Ray,
  raycastMode,
  RaycastModeType,
  RayMesh, rayTargetEntity, rayTargetTransform
} from '../definitions'

let lastHitEntity: Entity
export function raycastResultsSystem() {
  for (const [entity, raycastResult] of engine.getEntitiesWith(RaycastResult)) {
    if (raycastResult.hits.length > 0) {
      const hit = raycastResult.hits[0]
      if (hit.entityId) {
        for (const [rayMeshEntity] of engine.getEntitiesWith(RayMesh, Transform)) {
          // console.log("hit length: " + hit.length)
          updateRayMeshScale(Transform.getMutable(rayMeshEntity), hit.length)
        }        
        lastHitEntity = hit.entityId as Entity
        Material.setPbrMaterial(lastHitEntity, entity === engine.CameraEntity ? hitMaterial2 : hitMaterial) 
      }      
    } else {
      for (const [rayMeshEntity] of engine.getEntitiesWith(RayMesh, Transform)) {
        const raycast = Raycast.getOrNull(entity)
        if (raycast) {
          updateRayMeshScale(Transform.getMutable(rayMeshEntity), Math.min(raycast.maxDistance, 25))
        }
      }
      
      if (lastHitEntity) {
        Material.setPbrMaterial(lastHitEntity, defaultMaterial)
      }
    }       
  }
}

function updateRayMeshScale(mutableTransform: TransformType, rayLength: number ) {
  mutableTransform.scale.z = rayLength
  mutableTransform.position.z = mutableTransform.scale.z / 2 + 2
}

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
