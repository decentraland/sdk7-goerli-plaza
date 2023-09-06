import { Entity, GltfContainer, MeshRenderer, Transform, VisibilityComponent, engine } from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { SubSceneComp } from './components'
import { nftCollection, createPainting, NFTdata } from './nft'
import * as utils from '@dcl-sdk/utils'
import { showScene } from './modules/SceneMgmt/sceneManager'
import { scene1active, scene2active } from './subSceneSetup'

export function createScene() {
	const scene1 = engine.addEntity()

	Transform.create(scene1, {
		position: Vector3.create(0, 0, 0),
		rotation: Quaternion.create(0, 0, 0, 1),
		scale: Vector3.create(1, 1, 1)
	})

	const shopBlack = engine.addEntity()
	Transform.create(shopBlack, {
		position: Vector3.create(26, 0, 8),
		rotation: Quaternion.create(0, 0, 0, 1),
		scale: Vector3.create(1, 1, 1),
		parent: scene1
	})
	GltfContainer.create(shopBlack, {
		src: 'models/Shop_Black.glb'
	})

	const shopBlack2 = engine.addEntity()
	Transform.create(shopBlack2, {
		position: Vector3.create(16, 0, 8),
		rotation: Quaternion.create(0, 0, 0, 1),
		scale: Vector3.create(1, 1, 1),
		parent: scene1
	})
	GltfContainer.create(shopBlack2, {
		src: 'models/Shop_Black.glb'
	})

	const shopBlack3 = engine.addEntity()
	Transform.create(shopBlack3, {
		position: Vector3.create(4, 0, 8),
		rotation: Quaternion.create(0, 0, 0, 1),
		scale: Vector3.create(1, 1, 1),
		parent: scene1
	})
	GltfContainer.create(shopBlack3, {
		src: 'models/Shop_Black.glb'
	})

	const shopBlack4 = engine.addEntity()
	Transform.create(shopBlack4, {
		position: Vector3.create(26, 0, 25),
		rotation: Quaternion.create(7.362779683899381e-15, 1, -1.1920927533992653e-7, 2.980232238769531e-8),
		scale: Vector3.create(1, 1, 1),
		parent: scene1
	})
	GltfContainer.create(shopBlack4, {
		src: 'models/Shop_Black.glb'
	})

	const shopBlack5 = engine.addEntity()
	Transform.create(shopBlack5, {
		position: Vector3.create(16, 0, 25),
		rotation: Quaternion.create(7.362779683899381e-15, 1, -1.1920927533992653e-7, 2.980232238769531e-8),
		scale: Vector3.create(1, 1, 1),
		parent: scene1
	})
	GltfContainer.create(shopBlack5, {
		src: 'models/Shop_Black.glb'
	})

	const shopBlack6 = engine.addEntity()
	Transform.create(shopBlack6, {
		position: Vector3.create(5, 0, 25),
		rotation: Quaternion.create(7.362779683899381e-15, 1, -1.1920927533992653e-7, 2.980232238769531e-8),
		scale: Vector3.create(1, 1, 1),
		parent: scene1
	})
	GltfContainer.create(shopBlack6, {
		src: 'models/Shop_Black.glb'
	})

	createSubScene(shopBlack, 6)
	createSubScene(shopBlack2, 5)
	createSubScene(shopBlack3, 4)
	createSubScene(shopBlack4, 3)
	createSubScene(shopBlack5, 2)
	createSubScene(shopBlack6, 1)

	return scene1
}

export function createSubScene(parentPos: Entity, id: number) {
	const entity = engine.addEntity()

	Transform.create(entity, {
		parent: parentPos
	})
	SubSceneComp.create(entity, {
		showing: false,
		originalPos: Vector3.create(0, 0, 0)
	})

	const box = engine.addEntity()
	Transform.create(box, { parent: parentPos, scale: Vector3.create(8, 5, 14) })

	MeshRenderer.setBox(box)
	let createdPaintings: Entity[] = []

	VisibilityComponent.create(box, { visible: false })

	utils.triggers.addTrigger(
		box,
		utils.LAYER_2,
		utils.LAYER_1,
		[{ type: 'box', scale: Vector3.create(8, 5, 14) }],
		() => {
			if (scene1active || scene2active) {
				console.log(`ACTIVE`)
				console.log(`ENTERED ` + id)
				createdPaintings = []
				for (const nft of nftCollection) {
					if (nft.room === id) {
						const painting = createPainting(undefined, nft.id, nft.position, nft.contract, nft.tokenId)
						createdPaintings.push(painting)
					}
				}
			}
		},
		() => {
			console.log('LEFT')
			for (const painting of createdPaintings) {
				engine.removeEntity(painting)
			}

			createdPaintings = [] // Clear the array
		}
	)

	return entity
}
