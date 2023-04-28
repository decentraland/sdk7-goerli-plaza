import { engine, InputAction, inputSystem, PointerEventType } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { paintCube } from './painter'
import * as utils from '@dcl-sdk/utils'

export function setupGlobalEvents() {
	// Global Pointer Down Sphere
	const globalPointerDownCube = utils.addTestCube(
		{ position: Vector3.create(2, 1, 10), scale: Vector3.create(0.75, 0.75, 0.75) },
		undefined,
		'Global Pointer down',
		undefined,
		true
	)

	// Global Pointer Up Sphere
	const globalPointerUpCube = utils.addTestCube(
		{ position: Vector3.create(2, 1, 12), scale: Vector3.create(0.75, 0.75, 0.75) },
		undefined,
		'Global Pointer up',
		undefined,
		true
	)

	// Global Primary Down Sphere
	const globalPrimaryDownCube = utils.addTestCube(
		{ position: Vector3.create(4, 1, 10), scale: Vector3.create(0.75, 0.75, 0.75) },
		undefined,
		'Global Primary down',
		undefined,
		true
	)

	// Global Primary Up Sphere
	const globalPrimaryUpCube = utils.addTestCube(
		{ position: Vector3.create(4, 1, 12), scale: Vector3.create(0.75, 0.75, 0.75) },
		undefined,
		'Global Primary up',
		undefined,
		true
	)

	// Global Secondary Down Sphere
	const globalSecondaryDownCube = utils.addTestCube(
		{ position: Vector3.create(6, 1, 10), scale: Vector3.create(0.75, 0.75, 0.75) },
		undefined,
		'Global Secondary down',
		undefined,
		true
	)

	// Global Secondary Up Sphere
	const globalSecondaryUpCube = utils.addTestCube(
		{ position: Vector3.create(6, 1, 12), scale: Vector3.create(0.75, 0.75, 0.75) },
		undefined,
		'Global Secondary up',
		undefined,
		true
	)

	/////// GLOBAL EVENT LISTENERS

	engine.addSystem(() => {
		if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN)) {
			paintCube(globalPointerDownCube)
		}
		if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_UP)) {
			paintCube(globalPointerUpCube)
		}
		if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)) {
			paintCube(globalPrimaryDownCube)
		}
		if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_UP)) {
			paintCube(globalPrimaryUpCube)
		}
		if (inputSystem.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN)) {
			paintCube(globalSecondaryDownCube)
		}
		if (inputSystem.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_UP)) {
			paintCube(globalSecondaryUpCube)
		}
	})
}


