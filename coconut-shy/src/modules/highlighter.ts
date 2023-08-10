import { ColliderLayer, engine, Entity, RaycastQueryType, raycastSystem } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { Ball } from './components'
import { setGlow } from './ball'

// If the query type is changed to HitFirst, the ray mesh adapts to the hit distance
let raycastQueryType = RaycastQueryType.RQT_QUERY_ALL
const RAY_POWER = 30

export function createRaycast(parentEntity: Entity) {
  raycastSystem.registerLocalDirectionRaycast(
    {
      entity: parentEntity,
      opts: {
        collisionMask: ColliderLayer.CL_CUSTOM1 | ColliderLayer.CL_CUSTOM3 | ColliderLayer.CL_POINTER,
        originOffset: Vector3.create(0, 0, 0),
        direction: Vector3.Forward(),
        maxDistance: RAY_POWER,
        queryType: raycastQueryType,
        continuous: true // don't overuse the 'continuous' property as raycasting is expensive on performance
      }
    },
    (raycastResult) => {
      if (raycastResult.hits.length > 0) {
        // if hitted entity
        for (const hit of raycastResult.hits) {
          // do something on each entity hitted
          for (const [entity] of engine.getEntitiesWith(Ball)) {
            if (hit.entityId == entity) {
              // if hitted entity is an entity with the Ball component do something
              for (const [entity] of engine.getEntitiesWith(Ball)) {
                // remove glow of all entities
                setGlow(entity, false)
              }
              setGlow(entity, true) // enable glow of hitted entity if has Ball component
            }
          }
        }
      } else {
        // if not hitted entity, remove glow of all entities
        for (const [entity] of engine.getEntitiesWith(Ball)) {
          setGlow(entity, false)
        }
      }
    }
  )
}
