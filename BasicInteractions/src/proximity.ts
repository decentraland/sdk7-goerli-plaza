import { engine, Transform, GltfContainer } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { paintCube } from './painter'
import * as utils from '@dcl-sdk/utils'

export function setupProximity() {
	const closeCube = utils.addTestCube({ position: Vector3.create(2, 1, 9) }, undefined, 'Walk near')

	// check distance for closeCube
	engine.addSystem(() => {
		const transform = Transform.get(closeCube)
		const playerPosition = Transform.getOrNull(engine.PlayerEntity)
		if (playerPosition) {
			const dist = Vector3.distanceSquared(transform.position, playerPosition.position)
			if (dist < 8) {
				paintCube(closeCube)
			}
		}
	})

	// ground
	const floor = engine.addEntity()
	GltfContainer.create(floor, { src: 'models/FloorBaseGrass.glb' })
	Transform.create(floor, {
		position: Vector3.create(8, 0, 8),
		scale: Vector3.create(1.6, 0.1, 1.6)
	})
}
