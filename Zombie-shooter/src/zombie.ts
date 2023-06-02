import { GameControllerComponent } from './components/gameController'
import { MoveTransformComponent } from './components/moveTransport'
import { coneEntity } from '.'
import { onMoveZombieFinish } from './systems/moveZombie'

import { playSound } from './systems/sound'
import {
	Entity,
	engine,
	Transform,
	GltfContainer,
	Animator,
	NftShape,
	pointerEventsSystem,
	InputAction,
	MeshCollider,
	AvatarAttach,
	AvatarAnchorPointType
} from '@dcl/sdk/ecs'

export function createZombie(xPos: number): Entity {
	const zombie = engine.addEntity()

	Transform.create(zombie, {
		position: { x: xPos, y: 1, z: 3 }
	})

	GltfContainer.create(zombie, {
		src: 'models/zombie.glb'
	})

	MoveTransformComponent.create(zombie, {
		start: { x: xPos, y: 1, z: 3 },
		end: { x: xPos, y: 1, z: 12 },
		duration: 6,
		normalizedTime: 0,
		lerpTime: 0,
		speed: 0.04,
		hasFinished: false,
		interpolationType: 1
	})

	MeshCollider.setBox(zombie)

	Animator.create(zombie, {
		states: [
			{
				clip: 'Walking',
				loop: true,
				name: 'Walk',
				playing: true
			},
			{
				clip: 'Attacking',
				loop: true,
				name: 'Attack',
				playing: false
			}
		]
	})

	pointerEventsSystem.onPointerDown(
		{
			entity: zombie, opts: {
				button: InputAction.IA_POINTER,
				hoverText: 'Shoot'
			}
		},
		function () {
			console.log('BOOM!!!')

			engine.removeEntity(zombie)
			playSound(dummySoundPlayer, 'sounds/explosion.mp3', true)

			if (GameControllerComponent.has(coneEntity)) {
				GameControllerComponent.getMutable(coneEntity).score += 1
			}
		}
	)

	onMoveZombieFinish(zombie, () => {
		console.log('finished zombie', zombie)

		if (GameControllerComponent.has(coneEntity)) {
			GameControllerComponent.getMutable(coneEntity).livesLeft -= 1
		}

		const animator = Animator.getMutable(zombie)
		const walkAnim = Animator.getClip(zombie, 'Walking')
		const attackAnim = Animator.getClip(zombie, 'Attacking')
		if (walkAnim && attackAnim) {
			walkAnim.playing = false
			walkAnim.loop = false
			attackAnim.playing = true
			attackAnim.loop = true
		}

		const nfts = engine.getEntitiesWith(NftShape)

		//only remove first
		for (const [entity] of nfts) {
			engine.removeEntity(entity)
			break
		}

		playSound(zombie, 'sounds/attack.mp3', true)
	})

	return zombie
}

const dummySoundPlayer = engine.addEntity()
AvatarAttach.create(dummySoundPlayer)
