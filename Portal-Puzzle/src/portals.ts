import { Animator, AudioSource, Entity, GltfContainer, Transform, TransformType, engine } from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'
import { Vector3 } from '@dcl/sdk/math'
import { Portal, PortalColor } from './components'
import { activePortal } from './systems'
import { movePlayerTo } from '~system/RestrictedActions'

const HEIGHT_ABOVE_GROUND = 1.2 // In meters
const DELAY_TIME = 1500 // In milliseconds
const RESET_SIZE = 2 // In meters

export function createPortal(color: PortalColor, pos: TransformType) {
	const portal = engine.addEntity()
	Transform.create(portal, pos)
	GltfContainer.create(portal, {
		src: color == PortalColor.Blue ? 'assets/models/portalBlue.glb' : 'assets/models/portalOrange.glb'
	})
	Animator.create(portal, {
		states: [{ clip: 'Expand', name: 'expand', loop: false, shouldReset: true, playing: true }]
	})
	Portal.create(portal, { color: activePortal })

	AudioSource.createOrReplace(portal, { audioClipUrl: 'sounds/portalSuccess.mp3', playing: true, loop: false })

	//trigger
	utils.triggers.addTrigger(
		portal,
		1,
		1,
		[
			{
				type: 'box',
				scale: Vector3.create(1.5, 3, 1.5)
			}
		],
		() => {
			if (Portal.get(portal).coolDown) return

			teleport(portal)
			// teleport
		}
	)
}

export function teleport(portalEntity: Entity) {
	const portalData = Portal.getMutable(portalEntity)
	portalData.coolDown = true
	const portalColor = portalData.color

	const activePortals = engine.getEntitiesWith(Portal)
	for (const [destinationEntity, portal] of activePortals) {
		if (portal.color != portalColor) {
			const destination = Transform.get(destinationEntity).position
			const direction = Transform.get(destinationEntity).rotation
			const fiveMetersForward = Vector3.scale(Vector3.rotate(Vector3.Forward(), direction), 5)
			const cameraTarget = Vector3.add(destination, fiveMetersForward)

			movePlayerTo({ newRelativePosition: destination, cameraTarget: cameraTarget })

			const destinationPortalData = Portal.getMutable(destinationEntity)

			destinationPortalData.coolDown = true
			utils.timers.setTimeout(() => {
				destinationPortalData.coolDown = false
			}, DELAY_TIME)

			AudioSource.createOrReplace(destinationEntity, {
				audioClipUrl: 'sounds/teleport.mp3',
				playing: true,
				loop: false
			})
		}
	}

	utils.timers.setTimeout(() => {
		portalData.coolDown = false
	}, DELAY_TIME)
}
