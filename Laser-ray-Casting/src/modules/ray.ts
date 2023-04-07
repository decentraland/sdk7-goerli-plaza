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
import { Vector3 } from '@dcl/sdk/math'
import {
  defaultMaterial,
  hitMaterial,
  Ray
} from '../definitions'
import { rayMeshEntity } from "../index";

// If the query type is changed to HitFirst, the ray mesh adapts to the hit distance
let raycastQueryType = RaycastQueryType.RQT_QUERY_ALL
const lastHitEntities: Entity[] = []
export function raycastResultsSystem() {
  resetLastHitEntities()
  
  for (const [entity, raycastResult] of engine.getEntitiesWith(RaycastResult)) {
    if (raycastResult.hits.length > 0) {
      for (const hit of raycastResult.hits) {
        if (hit.entityId) {
          affectHitEntity(hit.entityId as Entity)
          if(raycastQueryType == RaycastQueryType.RQT_HIT_FIRST) {
            updateRayMeshScale(Transform.getMutable(rayMeshEntity), hit.length)
          }
        }
      }
    } else {
      if(raycastQueryType == RaycastQueryType.RQT_HIT_FIRST) {
        const raycast = Raycast.getOrNull(entity)
        if (raycast) {
          updateRayMeshScale(Transform.getMutable(rayMeshEntity), Math.min(raycast.maxDistance, 30))
        }
      }
    }       
  }
}

function updateRayMeshScale(mutableTransform: TransformType, rayLength: number) {
  mutableTransform.scale.z = rayLength
  mutableTransform.position.z = mutableTransform.scale.z / 2 + 2
}

function resetLastHitEntities()
{
  if (lastHitEntities.length > 0) {
    for (const hitEntity of lastHitEntities) {
      Material.setPbrMaterial(hitEntity, defaultMaterial)
      // Transform.getMutable(hitEntity).scale = Vector3.One()
    }
    lastHitEntities.length = 0
  }
}

function affectHitEntity(hitEntity: Entity)
{
  Material.setPbrMaterial(hitEntity, hitMaterial)
  // Transform.getMutable(hitEntity).scale = Vector3.create(0.5, 0.5, 0.5)
  lastHitEntities.push(hitEntity)
}

export function createRaycast(entity: Entity)
{
  const ray = Ray.getOrNull(entity)
  if(!ray) return
  
  Raycast.createOrReplace(entity, {
    collisionMask: ColliderLayer.CL_CUSTOM1 | ColliderLayer.CL_CUSTOM3 | ColliderLayer.CL_POINTER,
    direction: {
      $case: "localDirection",
      localDirection: Vector3.Forward()
    },
    maxDistance: ray.power,
    queryType: raycastQueryType,
    continuous: true // don't overuse the 'continuous' property as raycasting is expensive on performance
  })
}