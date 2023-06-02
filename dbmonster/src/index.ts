import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import { engine } from '@dcl/sdk/ecs'
import { ui } from './ui'

export function main() {

	ReactEcsRenderer.setUiRenderer(ui)
	engine.addEntity()

}

