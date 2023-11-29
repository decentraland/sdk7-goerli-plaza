import {
	engine,
	inputSystem,
	InputAction,
	PointerEventType,
	Entity,
	Transform,
	AvatarAttach,
	AvatarAnchorPointType,
	Animator,
	NetworkParent
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { BeerGlass, PickedUp, TapBase } from '../definitions'
import { playSound } from './factory'
import { currentPlayerId, getPlayerPosition } from './helpers'
import { parentEntity, syncEntity, getParent, getChildren, removeParent } from '@dcl/sdk/network'

export function pickingGlassSystem() {
	// If there is some PickedUp, so the behvior is to listen when this
	//  can be dropped
	for (const [entity, pickedUp] of engine.getEntitiesWith(PickedUp)) {
		const tryToDropCommand = inputSystem.getInputCommand(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)
		if (pickedUp.avatarId !== currentPlayerId) continue
		const pickedUpChild = Array.from(getChildren(entity))[0]
		if (!pickedUpChild) break
		if (tryToDropCommand) {
			const hitPosition = tryToDropCommand.hit?.position || getPlayerPosition()
			const hitEntity = tryToDropCommand.hit?.entityId as Entity
			const hitParentEntity = getParent(hitEntity)

			let drop = false

			// If there is a tap base (the collider)
			if (hitParentEntity && TapBase.getOrNull(hitParentEntity)) {
				Transform.createOrReplace(pickedUpChild, {
					//parent: hitParentEntity
				})
				parentEntity(pickedUpChild, hitParentEntity)
				console.log("parented to a tap, ", hitParentEntity, TapBase.getOrNull(hitParentEntity)?.beerType)
				drop = true
			} else {
				// Only it's allowed to hold the beer in surface parallel to floor
				const diff = Vector3.subtract(Vector3.Up(), tryToDropCommand.hit?.normalHit || Vector3.Zero())
				if (Vector3.length(diff) < 0.01) {
					Transform.createOrReplace(pickedUpChild, {
						position: hitPosition,
						//parent: engine.RootEntity
					})
					//NetworkParent.deleteFrom(pickedUpChild)
					removeParent(pickedUpChild)
					drop = true

				}
			}


			// TODO: These line crashes the renderer
			// AvatarAttach.deleteFrom(entity)
			// engine.removeEntity(entity)
			if (drop) {
				PickedUp.deleteFrom(entity)
				playSound('sounds/putDown.mp3', false, hitPosition)
			}
		}


		const glass = BeerGlass.get(pickedUpChild)

		const tryToDrinkCommand = inputSystem.getInputCommand(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN)
		if (glass.filled && tryToDrinkCommand) {
			BeerGlass.getMutable(pickedUpChild).filled = false
			Animator.playSingleAnimation(pickedUpChild, 'Blank')
			playSound('sounds/swallow.mp3', false, getPlayerPosition())
		}
		return
	}

	// Only happens when there isn't any PickedUp component
	for (const [entity, glass] of engine.getEntitiesWith(BeerGlass)) {
		if (!glass.beingFilled && inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN, entity)) {
			const parentBeer = engine.addEntity()
			PickedUp.create(parentBeer, { avatarId: currentPlayerId })

			AvatarAttach.create(parentBeer, {
				avatarId: currentPlayerId,
				anchorPointId: AvatarAnchorPointType.AAPT_RIGHT_HAND
			})
			Transform.createOrReplace(entity, {
				position: Vector3.create(0, 0.225, 0),
				rotation: Quaternion.fromEulerDegrees(180, -90, -60),
				//parent: parentBeer
			})

			syncEntity(parentBeer, [AvatarAttach.componentId, Transform.componentId, PickedUp.componentId])

			parentEntity(entity, parentBeer)

			playSound('sounds/pickUp.mp3', false, getPlayerPosition())
		}
	}
}


