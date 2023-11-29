import {
	engine,
	GltfContainer,
	Transform,
	Animator,
	PointerEvents,
	PointerEventType,
	InputAction,
	Entity,
	MeshCollider,
	MeshRenderer,
	AudioSource,
	ColliderLayer,
	AvatarAttach
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { BeerGlass, BeerType, getTapData, TapBase, TapComponent } from '../definitions'
import { parentEntity, syncEntity } from '@dcl/sdk/network'

export enum SyncEntityIDs {
	RED = 1,
	GREEN = 2,
	YELLOW = 3,
	GLASS1 = 4,
	GLASS2 = 5,
	GLASS3 = 6,
	GLASS4 = 7,
	GLASS5 = 8,
	GLASS6 = 9,
	GLASS7 = 10,
	GLASS8 = 11,
	GLASS9 = 12,
}


export function createBeerGlass(model: string, position: Vector3, id: SyncEntityIDs) {
	const glassEntity = engine.addEntity()

	GltfContainer.create(glassEntity, {
		src: model,
		visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
		invisibleMeshesCollisionMask: undefined
	})

	Transform.create(glassEntity, { position })

	Animator.create(glassEntity, {
		states: [
			{
				clip: 'Blank',
				playing: true
			},
			{
				clip: 'PourRed',
				loop: false
			},
			{
				clip: 'PourYellow',
				loop: false
			},
			{
				clip: 'PourGreen',
				loop: false
			}
		]
	})
	BeerGlass.create(glassEntity)

	PointerEvents.create(glassEntity, {
		pointerEvents: [
			{
				eventType: PointerEventType.PET_DOWN,
				eventInfo: {
					hoverText: 'Pick up',
					maxDistance: 5,
					button: InputAction.IA_PRIMARY
				}
			}
		]
	})

	syncEntity(glassEntity, [Animator.componentId, AudioSource.componentId, Transform.componentId], id)
}

export function createTap(tapBeerType: BeerType, dispenseEntity: Entity, id: SyncEntityIDs) {
	const tapEntity = engine.addEntity()
	const tapData = getTapData(tapBeerType)

	TapComponent.create(tapEntity, {
		beerType: tapBeerType
	})
	GltfContainer.create(tapEntity, {
		src: tapData.model
	})
	Transform.create(tapEntity, {
		parent: dispenseEntity
	})
	Animator.create(tapEntity, {
		states: [
			{
				clip: 'Blank',
				playing: true,
				loop: false
			},
			{
				clip: 'Pour',
				loop: false
			}
		]
	})

	PointerEvents.create(tapEntity, {
		pointerEvents: [
			{
				eventType: PointerEventType.PET_DOWN,
				eventInfo: {
					hoverText: 'Pour',
					maxDistance: 5,
					button: InputAction.IA_PRIMARY
				}
			}
		]
	})

	syncEntity(tapEntity, [Animator.componentId, AudioSource.componentId], id)

	const tapColliderPosition = Vector3.add(tapData.position, Vector3.create(0, 0.05, 0))
	const colliderParentEntity = engine.addEntity()
	Transform.create(colliderParentEntity, {
		//parent: tapEntity,
		position: tapColliderPosition
	})
	TapBase.create(colliderParentEntity, {
		beerType: tapBeerType
	})
	syncEntity(colliderParentEntity, [Transform.componentId], id + 100)
	parentEntity(colliderParentEntity, tapEntity)

	const colliderEntity = engine.addEntity()
	Transform.create(colliderEntity, {
		//parent: colliderParentEntity,
		scale: Vector3.scale(Vector3.One(), 0.33),
		rotation: Quaternion.fromEulerDegrees(90, 0, 0)
	})
	syncEntity(colliderEntity, [Transform.componentId], id + 200)
	parentEntity(colliderEntity, colliderParentEntity)


	MeshCollider.setPlane(colliderEntity)
	// Debug to see the collider
	//MeshRenderer.setPlane(colliderEntity)
	PointerEvents.create(colliderEntity, {
		pointerEvents: [
			{
				eventType: PointerEventType.PET_DOWN,
				eventInfo: {
					hoverText: 'Place mug',
					button: InputAction.IA_PRIMARY
				}
			}
		]
	})
}

export function playSound(audio: string, loop: boolean = false, position?: Vector3) {
	const entity = engine.addEntity()
	AudioSource.create(entity, {
		audioClipUrl: audio,
		loop,
		playing: true
	})

	Transform.create(entity, {
		position
	})

	return entity
}
