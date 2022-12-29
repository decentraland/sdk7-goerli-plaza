import { AudioSource, engine, GltfContainer, NftShape, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { ShipShapes, SpawnerComponent, SpawnerShape } from './components/customComponents'

import { clickedSystem } from './systems/clickable'
import { enemySpawnSystem } from './systems/enemySpawner'
import { expire } from './systems/expire'
import { moveSystem } from './systems/moveEnemy'


export * from '@dcl/sdk'


// --- ground ---
const ground = engine.addEntity()
Transform.create(ground, {
	scale: Vector3.create(2, 1, 2)
})
GltfContainer.create(ground, {
	src: 'models/baseLight.glb'
})

// Portals
const POSITION_Z = 30

// --- green ---
const greenPortal = engine.addEntity()
Transform.create(greenPortal, {
	position: Vector3.create(16, 6, POSITION_Z)
})
GltfContainer.create(greenPortal, {
	src: 'models/greenPortal.glb'
})
SpawnerComponent.create(greenPortal, {
	enemyShape: ShipShapes.GREEN,
	size: 6,
	spawnerShape: SpawnerShape.TRIANGLE,
	timeToNextSpawn: 1
})


// --- blue ---
const bluePortal = engine.addEntity()
Transform.create(bluePortal, {
	position: Vector3.create(27, 6, POSITION_Z)
})
GltfContainer.create(bluePortal, {
	src: 'models/bluePortal.glb'
})
SpawnerComponent.create(bluePortal, {
	enemyShape: ShipShapes.BLUE,
	size: 6,
	spawnerShape: SpawnerShape.SQUARE,
	timeToNextSpawn: 1
})

// --- red ---
const redPortal = engine.addEntity()
Transform.create(redPortal, {
	position: Vector3.create(6, 6, POSITION_Z)
})
GltfContainer.create(redPortal, {
	src: 'models/redPortal.glb'
})
SpawnerComponent.create(redPortal, {
	enemyShape: ShipShapes.RED,
	size: 6,
	spawnerShape: SpawnerShape.CIRCLE,
	timeToNextSpawn: 1
})

engine.addSystem(clickedSystem)

engine.addSystem(enemySpawnSystem)

engine.addSystem(moveSystem)

engine.addSystem(expire)
