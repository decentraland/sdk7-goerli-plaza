// Pointer Down Cube

import { InputAction, pointerEventsSystem } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { paintCube } from './painter'
import * as utils from '@dcl-sdk/utils'

export function setupEventOnEntities() {
	const pointerDownCube = utils.addTestCube({ position: Vector3.create(2, 1, 4) }, undefined, 'Pointer down')

	pointerEventsSystem.onPointerDown(
		{
			entity: pointerDownCube,
			opts: {
				button: InputAction.IA_POINTER,
				hoverText: 'Activate'
			}
		},
		function (cmd) {
			paintCube(pointerDownCube)
		}
	)

	// Pointer Up Cube

	const pointerUpCube = utils.addTestCube({ position: Vector3.create(2, 1, 6) }, undefined, 'Pointer up')

	pointerEventsSystem.onPointerUp(
		{
			entity: pointerUpCube,
			opts: {
				button: InputAction.IA_POINTER,
				hoverText: 'Activate'
			}
		},
		function (cmd) {
			paintCube(pointerUpCube)
		}
	)

	//  Primary Down Cube (while pointing)
	const primaryDownCube = utils.addTestCube({ position: Vector3.create(8, 1, 12) }, undefined, 'Primary down')

	pointerEventsSystem.onPointerDown(
		{
			entity: primaryDownCube,
			opts: {
				button: InputAction.IA_PRIMARY,
				hoverText: 'Activate'
			}
		},
		function (cmd) {
			paintCube(primaryDownCube)
		}
	)

	// Primary Up Cube
	const primaryUpCube = utils.addTestCube({ position: Vector3.create(10, 1, 12) }, undefined, 'Primary up')

	pointerEventsSystem.onPointerUp(
		{
			entity: primaryUpCube,
			opts: {
				button: InputAction.IA_PRIMARY,
				hoverText: 'Activate'
			}
		},
		function (cmd) {
			paintCube(primaryUpCube)
		}
	)

	// Secondary Down Cube
	const secondaryDownCube = utils.addTestCube({ position: Vector3.create(12, 1, 12) }, undefined, 'Secondary down')

	pointerEventsSystem.onPointerDown(
		{
			entity: secondaryDownCube,
			opts: {
				button: InputAction.IA_SECONDARY,
				hoverText: 'Activate'
			}
		},
		function (cmd) {
			paintCube(secondaryDownCube)
		}
	)

	// Secondary Up Cube
	const secondaryUpCube = utils.addTestCube({ position: Vector3.create(14, 1, 12) }, undefined, 'Secondary up')

	pointerEventsSystem.onPointerUp(
		{
			entity: secondaryUpCube,
			opts: {
				button: InputAction.IA_SECONDARY,
				hoverText: 'Activate'
			}
		},
		function (cmd) {
			paintCube(secondaryUpCube)
		}
	)
}
