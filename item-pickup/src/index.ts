import { engine, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { instantiatePickableItem, itemPickupSystem } from './modules/item'

export function main() {
	// Instantiate ground model
	GltfContainer.create(engine.addEntity(), {
		src: 'models/baseLight.glb'
	})

	// Instantiate items bases
	const redBaseEntity = engine.addEntity()
	GltfContainer.create(redBaseEntity, {
		src: 'models/spawnBaseRed.glb'
	})
	Transform.create(redBaseEntity, {
		position: Vector3.create(4, 0, 6)
	})

	const greenBaseEntity = engine.addEntity()
	GltfContainer.create(greenBaseEntity, {
		src: 'models/spawnBaseGreen.glb'
	})
	Transform.create(greenBaseEntity, {
		position: Vector3.create(8, 0, 10)
	})

	const blueBaseEntity = engine.addEntity()
	GltfContainer.create(blueBaseEntity, {
		src: 'models/spawnBaseBlue.glb'
	})
	Transform.create(blueBaseEntity, {
		position: Vector3.create(12, 0, 6)
	})

	instantiatePickableItem('models/medikit.glb', Vector3.create(4, 0.75, 6), 'sounds/medikitPickup.mp3', 3)

	instantiatePickableItem('models/ammo.glb', Vector3.create(8, 0.75, 10), 'sounds/ammoPickup.mp3', 1.5)

	instantiatePickableItem('models/armor.glb', Vector3.create(12, 0.75, 6), 'sounds/armorPickup.mp3', 5)

	engine.addSystem(itemPickupSystem)
}