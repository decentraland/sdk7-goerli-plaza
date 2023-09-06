import { Schemas, VisibilityComponent, engine } from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'
import { Vector3 } from '~system/EngineApi'

const SCENE_SIZE_X = 1
const SCENE_SIZE_Y = 1

export const OnlyInScene = engine.defineComponent('OnlyInScene', {})

// check if entities are inside the scene parcels, even if attached to player
export function onlyInSceneSystem(dt: number) {
	for (const [entity, _onlyInScene] of engine.getEntitiesWith(OnlyInScene)) {
		const finalPos = utils.getWorldPosition(entity)
		if (!isInScene(finalPos)) {

			if (!VisibilityComponent.has(entity)) {
				VisibilityComponent.createOrReplace(entity, { visible: false })
			}
		} else if (VisibilityComponent.has(entity)) {
			VisibilityComponent.deleteFrom(entity)
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