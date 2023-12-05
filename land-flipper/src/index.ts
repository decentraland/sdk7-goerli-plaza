// We define the empty imports so the auto-complete feature works as expected.
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { Animator, AudioSource, AvatarAttach, CameraModeArea, CameraType, GltfContainer, Material, MeshRenderer, PointerEventType, PointerEvents, Transform, VisibilityComponent, engine, pointerEventsSystem } from '@dcl/sdk/ecs'
import { initAssetPacks } from '@dcl/asset-packs/dist/scene-entrypoint'

import { colorTiles, resetAllTiles } from './systems'
import { createTile } from './factory'
import { syncEntity } from '@dcl/sdk/network'
import * as utils from '@dcl-sdk/utils'
import { setupUi } from './ui'

// You can remove this if you don't use any asset packs
initAssetPacks(engine, pointerEventsSystem, {
	Animator,
	AudioSource,
	AvatarAttach,
	Transform,
	VisibilityComponent,
	GltfContainer
})

export function main() {

	// id counter for the tiles
	let id = 300

	// draw tiles
	for (let x = 3; x < 40; x += 2.6) {
		for (let y = 3; y < 40; y += 2.6) {
			createTile(x, 0, y, id)
			id++
		}
	}

	engine.addSystem(colorTiles)

	const floor = engine.addEntity()
	Transform.create(floor, { position: { x: 24, y: -0.01, z: 24 }, scale: { x: 48, y: 48, z: 48 }, rotation: Quaternion.fromEulerDegrees(90, 0, 0) })
	MeshRenderer.setPlane(floor)
	Material.setPbrMaterial(floor, { albedoColor: Color4.fromHexString("#92b096") })

	utils.addTestCube({ position: Vector3.create(40, 1, 42) }, (cube) => {
		resetAllTiles()
	}, "RESET ALL TILES", Color4.Red())



	setupUi()


}
