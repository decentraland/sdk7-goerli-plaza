import { setupEventOnEntities } from './events-on-entities'
import { setupGlobalEvents } from './global-events'
import { setupProximity } from './proximity'
import * as utils from '@dcl-sdk/utils'
import { Color4, Vector3 } from '@dcl/sdk/math'
import './painter'
import { setupUi } from './ui'

export function main() {

	setupUi()

	utils.addTestCube(
		{ position: Vector3.create(8, 1, 8), scale: Vector3.create(0.5, 0.5, 0.5) },
		undefined,
		"You're using ECS7",
		Color4.Magenta()
	)

	setupEventOnEntities()
	setupProximity()
	setupGlobalEvents()
}

