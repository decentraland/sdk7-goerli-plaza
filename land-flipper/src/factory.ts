import {
	engine,
	Transform,
	MeshRenderer,
	Material,
	AudioSource
} from '@dcl/sdk/ecs'
import { Tile } from './components'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { syncEntity } from '@dcl/sdk/network'

export function createTile(x: number, y: number, z: number, id: number) {
	const entity = engine.addEntity()

	// Used to track the colors
	Tile.create(entity)

	Transform.create(entity, { position: { x, y, z }, rotation: Quaternion.fromEulerDegrees(90, 0, 0), scale: Vector3.create(2.5, 2.5, 2.5) })

	// set how the cube looks and collides
	MeshRenderer.setPlane(entity)

	Material.setPbrMaterial(entity, { albedoColor: Color4.White() })

	AudioSource.create(entity, { playing: false, volume: 0.3, loop: false, audioClipUrl: 'assets/sounds/coinPickup.mp3' })

	syncEntity(entity, [Material.componentId, AudioSource.componentId], id)

	return entity

}
