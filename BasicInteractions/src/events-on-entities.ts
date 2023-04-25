// Pointer Down Cube

import { InputAction, pointerEventsSystem } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { paintCube } from './painter'
import * as utils from '@dcl-sdk/utils'


export function setupEventOnEntities() {

	const pointerDownCube = utils.addTestCube({ position: Vector3.create(2, 1, 4) }, undefined, 'Pointer down')

	pointerEventsSystem.onPointerDown(
		pointerDownCube,
		function (cmd) {
			paintCube(pointerDownCube)
		},
		{
			button: InputAction.IA_POINTER,
			hoverText: 'Activate'
		}
	)

	// Pointer Up Cube

	const pointerUpCube = utils.addTestCube({ position: Vector3.create(2, 1, 6) }, undefined, 'Pointer up')

	pointerEventsSystem.onPointerUp(
		pointerUpCube,
		function (cmd) {
			paintCube(pointerUpCube)
		},
		{
			button: InputAction.IA_POINTER,
			hoverText: 'Activate'
		}
	)

	//  Primary Down Cube (while pointing)
	const primaryDownCube = utils.addTestCube({ position: Vector3.create(8, 1, 12) }, undefined, 'Primary down')


	pointerEventsSystem.onPointerDown(
		primaryDownCube,
		function (cmd) {
			paintCube(primaryDownCube)
		},
		{
			button: InputAction.IA_PRIMARY,
			hoverText: 'Activate'
		}
	)

	// Primary Up Cube
	const primaryUpCube = utils.addTestCube({ position: Vector3.create(10, 1, 12) }, undefined, 'Primary up')

	pointerEventsSystem.onPointerUp(
		primaryUpCube,
		function (cmd) {
			paintCube(primaryUpCube)
		},
		{
			button: InputAction.IA_PRIMARY,
			hoverText: 'Activate'
		}
	)

	// Secondary Down Cube
	const secondaryDownCube = utils.addTestCube({ position: Vector3.create(12, 1, 12) }, undefined, 'Secondary down')


	pointerEventsSystem.onPointerDown(
		secondaryDownCube,
		function (cmd) {
			paintCube(secondaryDownCube)
		},
		{
			button: InputAction.IA_SECONDARY,
			hoverText: 'Activate'
		}
	)

	// Secondary Up Cube
	const secondaryUpCube = utils.addTestCube({ position: Vector3.create(14, 1, 12) }, undefined, 'Secondary up')

	pointerEventsSystem.onPointerUp(
		secondaryUpCube,
		function (cmd) {
			paintCube(secondaryUpCube)
		},
		{
			button: InputAction.IA_SECONDARY,
			hoverText: 'Activate'
		}
	)
}
