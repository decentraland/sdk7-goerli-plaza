import {
	CameraModeArea,
	CameraType,
	ColliderLayer,
	Entity,
	GltfContainer,
	InputAction,
	PointerEventType,
	RaycastQueryType,
	Transform,
	engine,
	inputSystem,
	raycastSystem
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { Sound } from './sound'
import { FloatingRock } from './floatingRock'
import { ReflectedRay } from './reflectedRay'
import { movePlayerTo } from '~system/RestrictedActions'
import { OnFinishCallback } from '@dcl-sdk/utils/dist/tween'
import * as utils from '@dcl-sdk/utils'
import { OnlyInScene, isInScene, onlyInSceneSystem } from './onlyRenderInScene'

// Sounds
const firstNoteSound = new Sound('sounds/firstNote.mp3', false)
const secondNoteSound = new Sound('sounds/secondNote.mp3', false)
const thirdNoteSound = new Sound('sounds/thirdNote.mp3', false)
const forthNoteSound = new Sound('sounds/forthNote.mp3', false)
const lightningOrbSound = new Sound('sounds/lightningOrb.mp3', false)
const victorySound = new Sound('sounds/complete.mp3', false)

export function main() {
	engine.addSystem(onlyInSceneSystem)

	utils.timers.setTimeout(function () {
		// Ensure player is inside
		movePlayerTo({
			newRelativePosition: Vector3.create(4, 0, 4),
			cameraTarget: Vector3.create(8, 1, 8)
		})

		// Force first person view
		const modEntity = engine.addEntity()
		Transform.create(modEntity, {
			position: Vector3.create(8, 4, 8)
		})
		CameraModeArea.create(modEntity, {
			area: Vector3.create(16, 8, 16),
			mode: CameraType.CT_FIRST_PERSON
		})

		// Lightning orb
		const lightningOrb = engine.addEntity()
		GltfContainer.create(lightningOrb, {
			src: 'models/lightningOrb.glb'
		})
		Transform.create(lightningOrb, {
			parent: engine.CameraEntity,
			position: Vector3.create(0, -0.5, 0.75)
		})
		OnlyInScene.create(lightningOrb)

		// Base
		const base = engine.addEntity()
		GltfContainer.create(base, {
			src: 'models/baseCheckered.glb',
			invisibleMeshesCollisionMask: ColliderLayer.CL_NONE
		})
	}, 2000)

	// Rocks
	//#region

	//floatingWindRock
	new FloatingRock({
		modelPath: 'models/floatingWindRock.glb',
		glowPath: 'models/floatingWindRockGlow.glb',
		position: Vector3.create(12, 2.5, 8),
		rotation: Quaternion.fromEulerDegrees(0, -90, 0)
	})

	//floatingFireRock
	new FloatingRock({
		modelPath: 'models/floatingFireRock.glb',
		glowPath: 'models/floatingFireRockGlow.glb',
		position: Vector3.create(8, 3, 12),
		rotation: Quaternion.fromEulerDegrees(0, 180, 0)
	})

	//floatingWaterRock
	new FloatingRock({
		modelPath: 'models/floatingWaterRock.glb',
		glowPath: 'models/floatingWaterRockGlow.glb',
		position: Vector3.create(4, 3.5, 8),
		rotation: Quaternion.fromEulerDegrees(0, 90, 0)
	})

	//floatingEarthRock
	new FloatingRock({
		modelPath: 'models/floatingEarthRock.glb',
		glowPath: 'models/floatingEarthRockGlow.glb',
		position: Vector3.create(8, 4, 4),
		rotation: Quaternion.fromEulerDegrees(0, 0, 0)
	})
	//#endregion

	// Ray
	const ray = engine.addEntity()
	GltfContainer.create(ray, {
		src: 'models/ray.glb'
	})
	Transform.create(ray, {
		position: Vector3.create(8, 1.25, 8),
		scale: Vector3.Zero()
	})

	engine.addSystem(() => {
		// Left mouse button
		const result = inputSystem.getInputCommand(InputAction.IA_POINTER, PointerEventType.PET_DOWN)
		if (result) {

			// only keep going if the player is inside the scene parcels
			if (!isInScene(Transform.get(engine.PlayerEntity).position)) return

			let forwardVector: Vector3 = Vector3.rotate(Vector3.Forward(), Transform.getMutable(engine.CameraEntity).rotation)
			const cameraTransform = Transform.getMutable(engine.CameraEntity)
			const rayTransform = Transform.getMutable(ray)

			lightningOrbSound.stopAudio()
			utils.timers.setTimeout(function () {
				lightningOrbSound.playAudio()
			}, 100)

			// Switch off all rock glows
			FloatingRock.ToggleGlowAll(false)

			let distance: number = 4
			let onFinish: OnFinishCallback = () => { }
			if (result.hit && result.hit.position && result.hit.normalHit) {
				const hitPosition: Vector3 = result.hit.position
				const hitNormal: Vector3 = result.hit.normalHit

				// Delete previous reflected rays and temp entities
				ReflectedRay.removeAll()

				// Stop all audio sources
				firstNoteSound.stopAudio()
				secondNoteSound.stopAudio()
				thirdNoteSound.stopAudio()
				forthNoteSound.stopAudio()

				if (result.hit.entityId === undefined || result.hit.entityId === null) return
				const floatingRock = FloatingRock.GetFloatingRock(result.hit.entityId)

				if (floatingRock === null) return

				floatingRock.toggleGlow(true) // Turn on glow for the rock that's hit

				const reflectedVector: Vector3 = reflectVector(forwardVector, hitNormal)
				const startPosition = Vector3.add(cameraTransform.position, forwardVector)
				distance = Vector3.distance(startPosition, hitPosition)

				// Ray
				rayTransform.position = startPosition
				rayTransform.position.y -= 0.5 // Offset ray
				rayTransform.rotation = Quaternion.fromLookAt(startPosition, hitPosition)
				onFinish = () => {
					reflectRay(hitPosition, reflectedVector, 0)
				}
			} else {
				const startPosition = Vector3.add(cameraTransform.position, forwardVector)
				rayTransform.position = startPosition
				rayTransform.position.y -= 0.5 // Offset ray

				const newPos: Vector3 = Vector3.add(
					Vector3.add(cameraTransform.position, forwardVector),
					Vector3.create(0, 0.11, 0)
				)
				rayTransform.rotation = Quaternion.fromLookAt(cameraTransform.position, newPos)
			}

			rayTransform.scale = Vector3.One()
			const startSize = rayTransform.scale

			// Scale the ray to size
			const endSize = Vector3.create(startSize.x, startSize.y, distance)

			utils.tweens.startScaling(ray, startSize, endSize, 0.1, utils.InterpolationType.LINEAR, onFinish)

			// Ray dissipates after half a second
			utils.timers.setTimeout(function () {
				utils.tweens.startScaling(ray, endSize, Vector3.create(0, 0, endSize.z), 0.2)
			}, 500)
		}
	})
}

// Recursive function for reflecting a ray every time it hits a mirror
function reflectRay(hitPoint: Vector3, reflectedVector: Vector3, reflectCount: number) {
	// Reflected ray
	const reflectedRay = new ReflectedRay('models/ray.glb')
	if (reflectedRay.reflectedRayEntity === undefined || reflectedRay.reflectedRayEntity === null) return

	const reflectedRayTransform = Transform.getMutable(reflectedRay.reflectedRayEntity)
	reflectedRayTransform.position = hitPoint

	const reflectedTarget = Vector3.add(hitPoint, reflectedVector)
	reflectedRayTransform.rotation = Quaternion.fromLookAt(hitPoint, reflectedTarget)

	playNote(reflectCount)

	raycastSystem.registerGlobalDirectionRaycast(
		{
			entity: reflectedRay.reflectedRayEntity,
			opts: {
				queryType: RaycastQueryType.RQT_HIT_FIRST,
				direction: reflectedVector,
				maxDistance: 1000
			}
		},
		function (result) {
			let distance: number = 5
			let onFinish: OnFinishCallback = () => { }
			if (
				result.hits &&
				result.hits.length > 0 &&
				result.hits[0] &&
				result.hits[0].position &&
				result.hits[0].normalHit
			) {
				const hitPosition = result.hits[0].position
				const hitNormal: Vector3 = result.hits[0].normalHit

				distance = Vector3.distance(hitPoint, hitPosition)
				onFinish = () => {
					if (result.hits[0].entityId === undefined || result.hits[0].entityId === null) return
					const roundMirror = FloatingRock.GetFloatingRock(result.hits[0].entityId)

					if (roundMirror === null) return

					roundMirror.toggleGlow(true) // Turn on glow for mirror
					const nextReflectedVector: Vector3 = reflectVector(
						Vector3.create(reflectedVector.x, reflectedVector.y, reflectedVector.z),
						Vector3.create(hitNormal.x, hitNormal.y, hitNormal.z)
					)
					reflectRay(Vector3.create(hitPosition.x, hitPosition.y, hitPosition.z), nextReflectedVector, reflectCount + 1)
				}
			}

			const startSize = reflectedRayTransform.scale

			// Scale reflected ray to size
			const endSize = Vector3.create(startSize.x, startSize.y, distance)
			const timeToTravel = distance * 0.05

			utils.tweens.startScaling(
				reflectedRay.reflectedRayEntity as Entity,
				startSize,
				endSize,
				timeToTravel,
				utils.InterpolationType.LINEAR,
				onFinish
			)

			// Reflected ray dissipates after a period proportional to the travelled distance
			utils.timers.setTimeout(function () {
				utils.tweens.startScaling(
					reflectedRay.reflectedRayEntity as Entity,
					endSize,
					Vector3.create(0, 0, endSize.z),
					0.5
				)
			}, 2000 * timeToTravel)
		}
	)
}

// Put in the direction of the previous ray and the normal of the raycast's hitpoint
function reflectVector(incident: Vector3, normal: Vector3): Vector3 {
	const dot = 2 * Vector3.dot(incident, normal)
	const reflected = Vector3.subtract(incident, Vector3.multiplyByFloats(normal, dot, dot, dot))
	return reflected
}

function playNote(reflectCount: number): void {
	// TODO: There's a delay when playing the notes
	switch (reflectCount) {
		case 0:
			firstNoteSound.playAudio()
			break
		case 1:
			secondNoteSound.playAudio()
			break
		case 2:
			thirdNoteSound.playAudio()
			break
		case 3:
			forthNoteSound.playAudio()
			console.log('You Win!')
			utils.timers.setTimeout(function () {
				victorySound.playAudio()
			}, 2000)
			break
		default:
			break
	}
}
