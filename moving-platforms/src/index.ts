import { engine, Entity, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { createCoin } from './modules/coin'
import * as utils from '@dcl-sdk/utils'

export function main() {

	// Instantiate base models
	GltfContainer.create(engine.addEntity(), {
		src: 'models/baseLight.glb'
	})

	GltfContainer.create(engine.addEntity(), {
		src: 'models/staticPlatforms.glb'
	})

	// Instantiate moving platforms

	//// only horizontal
	const platform1 = engine.addEntity()
	GltfContainer.create(platform1, {
		src: 'models/movingPlatform.glb'
	})
	Transform.create(platform1, {
		position: Vector3.create(2, 1.5, 8)
	})

	startPath(platform1, [Vector3.create(2, 1.5, 8), Vector3.create(2, 1.5, 10), Vector3.create(2, 1.5, 8)], 3, false, true)

	//// only vertical
	const platform2 = engine.addEntity()
	GltfContainer.create(platform2, {
		src: 'models/movingPlatform.glb'
	})
	Transform.create(platform2, {
		position: Vector3.create(4, 1.5, 14)
	})

	startPath(platform2, [Vector3.create(4, 1.5, 14), Vector3.create(4, 4, 14), Vector3.create(4, 1.5, 14)], 2, false, true)

	//// triggerable platform
	const platform3 = engine.addEntity()
	GltfContainer.create(platform3, {
		src: 'models/triggerPlatform.glb'
	})
	Transform.create(platform3, {
		position: Vector3.create(14, 4, 12)
	})

	utils.triggers.addTrigger(
		platform3,
		utils.LAYER_1,
		utils.LAYER_1,
		[{ type: 'box', scale: Vector3.create(1, 2, 1) }],
		() => {
			startPath(
				platform3,
				[Vector3.create(14, 4, 12), Vector3.create(14, 4, 4), Vector3.create(14, 4, 12)],
				20,
				false,
				false
			)
		}
	)

	//// path with many waypoints
	const platform4 = engine.addEntity()
	GltfContainer.create(platform4, {
		src: 'models/movingPlatform.glb'
	})
	Transform.create(platform4, {
		position: Vector3.create(6.5, 7, 4)
	})

	startPath(
		platform4,
		[
			Vector3.create(6.5, 7, 4),
			Vector3.create(6.5, 7, 12),
			Vector3.create(6.5, 10.5, 12),
			Vector3.create(6.5, 10.5, 4),
			Vector3.create(6.5, 7, 4)
		],
		40,
		false,
		true
	)

	// Instantiate pickable coin
	createCoin('models/starCoin.glb', Vector3.create(9, 12.75, 8), Vector3.create(1.5, 3, 1.5), Vector3.create(0, 1, 0))

}

// function to make path following recursive
function startPath(entity: Entity, path: Vector3[], duration: number, facePath?: boolean, loop?: boolean) {
	utils.paths.startStraightPath(entity, path, duration, false, function () {
		if (loop) startPath(entity, path, duration, facePath, loop)
	})
}
