import { Schemas, Transform, VisibilityComponent, engine } from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'
import { Vector3 } from '@dcl/sdk/math'

const SCENE_SIZE_X = 1
const SCENE_SIZE_Y = 1

export const OnlyInScene = engine.defineComponent('OnlyInScene', { scale: Schemas.Vector3 }, { scale: { x: 1, y: 1, z: 1 } })

// check if entities are inside the scene parcels, even if attached to player
export function onlyInSceneSystem(dt: number) {
	for (const [entity, _onlyInScene] of engine.getEntitiesWith(OnlyInScene)) {
		const finalPos = utils.getWorldPosition(entity)
		const MutableTransform = Transform.getMutable(entity)
		if (!isInScene(finalPos)) {
			if (!VisibilityComponent.has(entity)) {
				VisibilityComponent.createOrReplace(entity, { visible: false })
				MutableTransform.scale = Vector3.Zero()
			}
		} else if (VisibilityComponent.has(entity)) {
			VisibilityComponent.deleteFrom(entity)
			MutableTransform.scale = _onlyInScene.scale
		}
	}
}

// check if any position is inside the scene parcels
export function isInScene(position: Vector3) {
	if (position.x < 0 || position.x >= SCENE_SIZE_X * 16 || position.z < 0 || position.z >= SCENE_SIZE_Y * 16) {
		return false
	} else {
		return true
	}
}
