import {
  ColliderLayer,
  engine,
  Entity,
  Material,
  Raycast,
  RaycastQueryType,
  RaycastResult,
  Transform,
  TransformType
} from '@dcl/sdk/ecs'
import {Vector3} from '@dcl/sdk/math'
import {
  defaultMaterial,
  hitMaterial,
  hitMaterial2,
  Ray,
  raycastMode,
  RaycastModeType,
  RayMesh,
  rayTargetEntity,
  rayTargetTransform
} from '../definitions'

const lastHitEntities: Entity[] = []
const queryType: RaycastQueryType = RaycastQueryType.RQT_QUERY_ALL
export function raycastResultsSystem() {
  // clear last hit entities
  if (lastHitEntities.length > 0) {
    for (const entity of lastHitEntities) {
      Material.setPbrMaterial(entity, defaultMaterial)
    }
    lastHitEntities.length = 0
  }
  
  for (const [entity, raycastResult] of engine.getEntitiesWith(RaycastResult)) {    
    if (raycastResult.hits.length > 0) {      
      for (const hit of raycastResult.hits) {
        if (hit.entityId) {
          const hitEntity = hit.entityId as Entity
          Material.setPbrMaterial(hitEntity, entity === engine.CameraEntity ? hitMaterial2 : hitMaterial)
          lastHitEntities.push(hitEntity)
          
          if(queryType == RaycastQueryType.RQT_HIT_FIRST) {
            for (const [rayMeshEntity] of engine.getEntitiesWith(RayMesh, Transform)) {
              updateRayMeshScale(Transform.getMutable(rayMeshEntity), hit.length)
            }
          }
        }
      }      
    } else {
      if(queryType == RaycastQueryType.RQT_HIT_FIRST) {
        for (const [rayMeshEntity] of engine.getEntitiesWith(RayMesh, Transform)) {
          const raycast = Raycast.getOrNull(entity)
          if (raycast) {
            updateRayMeshScale(Transform.getMutable(rayMeshEntity), Math.min(raycast.maxDistance, 30))
          }
        }
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
    // collisionMask: ColliderLayer.CL_CUSTOM1,
    // collisionMask: ColliderLayer.CL_CUSTOM2,
    // collisionMask: ColliderLayer.CL_CUSTOM3,
    collisionMask: ColliderLayer.CL_CUSTOM3 | ColliderLayer.CL_CUSTOM1 | ColliderLayer.CL_PHYSICS | ColliderLayer.CL_POINTER,
    direction: direction,
    maxDistance: ray.power,
    queryType: queryType,
    continuous: true // don't overuse the 'continuous' property as raycasting is expensive on performance
  })
}
