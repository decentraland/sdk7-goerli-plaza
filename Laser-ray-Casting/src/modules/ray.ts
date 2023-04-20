import {
	ColliderLayer,
	engine,
	Entity,
	Material,
	Raycast,
	RaycastQueryType,
	RaycastResult,
	raycastSystem,
	Transform,
	TransformType
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import {
	defaultMaterial,
	hitMaterial,
} from '../definitions'
import { rayMeshEntity } from "../index";



// If the query type is changed to HitFirst, the ray mesh adapts to the hit distance
let raycastQueryType = RaycastQueryType.RQT_QUERY_ALL
const RAY_POWER = 30

const lastHitEntities: Entity[] = []


export function updateRayMeshScale(mutableTransform: TransformType, rayLength: number) {
	mutableTransform.scale.z = rayLength
	mutableTransform.position.z = mutableTransform.scale.z / 2 + 2
}

export function resetLastHitEntities() {
	if (lastHitEntities.length > 0) {
		for (const hitEntity of lastHitEntities) {
			Material.setPbrMaterial(hitEntity, defaultMaterial)
		}
		lastHitEntities.length = 0
	}
}

export function affectHitEntity(hitEntity: Entity) {
	Material.setPbrMaterial(hitEntity, hitMaterial)
	lastHitEntities.push(hitEntity)
}

export function createRaycast(entity: Entity) {

	raycastSystem.registerLocalDirectionRaycast(entity,
		(raycastResult) => {
			resetLastHitEntities()
			if (raycastResult.hits.length > 0) {
				for (const hit of raycastResult.hits) {
					if (hit.entityId) {
						affectHitEntity(hit.entityId as Entity)
						if (raycastQueryType == RaycastQueryType.RQT_HIT_FIRST) {
							updateRayMeshScale(Transform.getMutable(rayMeshEntity), hit.length)
						}
					}
				}
			} else {
				if (raycastQueryType == RaycastQueryType.RQT_HIT_FIRST) {
					const raycast = Raycast.getOrNull(entity)
					if (raycast) {
						updateRayMeshScale(Transform.getMutable(rayMeshEntity), Math.min(raycast.maxDistance, 30))
					}
				}
			}
		}
		, {
			collisionMask: ColliderLayer.CL_CUSTOM1 | ColliderLayer.CL_CUSTOM3 | ColliderLayer.CL_POINTER,
			originOffset: Vector3.create(0, 0.4, 0),
			direction: Vector3.Forward(),
			maxDistance: RAY_POWER,
			queryType: raycastQueryType,
			continuous: true // don't overuse the 'continuous' property as raycasting is expensive on performance
		})

}