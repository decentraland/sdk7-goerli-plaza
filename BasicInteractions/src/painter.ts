import { engine, Entity, Material, PBMaterial_PbrMaterial, Schemas } from '@dcl/sdk/ecs'
import { Color3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'

export function paintCube(entity: Entity) {
	Material.setPbrMaterial(entity, {
		albedoColor: { a: 1, r: 0, g: 1, b: 0 }
	})
	utils.timers.setTimeout(
		() => {
			Material.setPbrMaterial(entity, {
				albedoColor: { a: 1, r: 0, g: 1, b: 1 }
			})
		}, 1000
	)
}

