import { engine, Transform, RaycastResult, Material, Entity, Raycast, RaycastQueryType } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { defaultMaterial, hitMaterial, hitMaterial2, MovingCube, Ray } from '../definitions'

// There are 4 kinds of 'direction' we may use with the Raycast component,
// by changing 'raycastMode' you can try out those different kinds
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

export default function raycastSystem() {
  for (const [entity, ray] of engine.getEntitiesWith(Ray)) {
    const result = RaycastResult.getOrNull(entity)      
    if (result?.timestamp === ray.timestamp) {
      if (result.hits.length > 0) {
        for (const hit of result.hits) {
          if (hit.entityId) {
            console.log("HIT ENTITY " + hit.entityId)
            // Material.setPbrMaterial(hit.entityId as Entity, entity === engine.CameraEntity ? hitMaterial2 : hitMaterial)
          }
        }
      } else {
        for (const [entity] of engine.getEntitiesWith(MovingCube)) {
          // Material.setPbrMaterial(entity, defaultMaterial)
        }
      }
    }

    // Updating raycast to keep casting the rays by updating its model (timestamp)
    const shouldUpdateRaycast = Raycast.getOrNull(entity) === null || (result && ray.timestamp === result.timestamp)
    if (shouldUpdateRaycast) {
      const raycastMut = Ray.getMutable(entity)
      raycastMut.timestamp += 1

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
        maxDistance: raycastMut.power,
        queryType: RaycastQueryType.RQT_QUERY_ALL,
        timestamp: raycastMut.timestamp
      })
    }
  }
}
