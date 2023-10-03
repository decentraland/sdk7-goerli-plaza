import { Vector3, Quaternion } from '@dcl/sdk/math'
import {
	engine,
	GltfContainer,
	Transform,
	Animator,
	removeEntityWithChildren,
	inputSystem,
	InputAction,
	PointerEventType,
	Entity,
	PointerEvents,
	Billboard,
	VisibilityComponent,
	TextShape
} from '@dcl/sdk/ecs'
import { Zombie } from '../definitions'

const ZOMBIE_MODEL_PATH = 'models/zombie.glb'
const ATTACK_DISTANCE = 2
const MOVEMENT_SPEED = 1
const ROTATION_SPEED = 1

export function createZombie(position: Vector3) {
	const zombieEntity = engine.addEntity()
	Transform.create(zombieEntity, {
		position
	})
	GltfContainer.create(zombieEntity, {
		src: ZOMBIE_MODEL_PATH
	})
	Animator.create(zombieEntity, {
		states: [
			{
				clip: 'Walking',
				playing: true,
				loop: true
			},
			{
				clip: 'Attacking',
				loop: true
			}
		]
	})

	const damageEntity = engine.addEntity()
	const zombie = Zombie.create(zombieEntity, {
		movementSpeed: MOVEMENT_SPEED,
		rotationSpeed: ROTATION_SPEED,
		damageEntity
	})

	Transform.create(damageEntity, { parent: zombieEntity, position: Vector3.create(0, 1, 0) })
	Billboard.create(damageEntity)
	TextShape.create(damageEntity, { text: `Health: ${zombie.health - zombie.damage}/${zombie.health}`, fontSize: 3 })

	PointerEvents.create(zombieEntity, {
		pointerEvents: [
			{
				eventType: PointerEventType.PET_DOWN,
				eventInfo: {
					hoverText: 'Attack!'
				}
			}
		]
	})
}

function zombieMovementSystem(deltaTime: number) {
	if (!Transform.has(engine.PlayerEntity)) return
	const playerPos = Transform.get(engine.PlayerEntity).position

	for (const [entity] of engine.getEntitiesWith(Zombie)) {
		const transform = Transform.getMutable(entity)

		// Rotate to face player
		const lookAtTarget = Vector3.create(playerPos.x, transform.position.y, playerPos.z)
		const lookAtDirection = Vector3.subtract(lookAtTarget, transform.position)
		transform.rotation = Quaternion.slerp(
			transform.rotation,
			Quaternion.lookRotation(lookAtDirection),
			ROTATION_SPEED + deltaTime
		)

		// Move towards player until it's at attack distance
		const distance = Vector3.distanceSquared(transform.position, playerPos) // Check distance squared as it's more optimized

		const isInAttackDistance = distance < ATTACK_DISTANCE
		if (!isInAttackDistance) {
			const forwardVector = Vector3.rotate(Vector3.Forward(), transform.rotation)
			const positionDelta = Vector3.scale(forwardVector, MOVEMENT_SPEED * deltaTime)
			transform.position = Vector3.add(transform.position, positionDelta)
		}

		Animator.getClip(entity, 'Walking').playing = !isInAttackDistance
		Animator.getClip(entity, 'Attacking').playing = isInAttackDistance
	}
}

function zombieLifeSystem(dt: number) {
	for (const [entity] of engine.getEntitiesWith(Zombie)) {
		const zombie = Zombie.getMutable(entity)

		if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN, entity)) {
			zombie.damage += 1
			TextShape.getMutable(zombie.damageEntity).text = `Health: ${zombie.health - zombie.damage}/${zombie.health}`
		}

		if (zombie.damage > 0) {
			if (zombie.damage >= zombie.health) {
				removeEntityWithChildren(engine, entity)
				continue
			}

			zombie.damageCooldown += dt
			if (zombie.damageCooldown > 1) {
				zombie.damageCooldown = 0
				zombie.damage -= 1
				TextShape.getMutable(zombie.damageEntity).text = `Health: ${zombie.health - zombie.damage}/${zombie.health}`
			}
		}
	}
}

engine.addSystem(zombieMovementSystem)
engine.addSystem(zombieLifeSystem)
