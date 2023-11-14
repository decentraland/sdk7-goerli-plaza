import * as ui from 'dcl-ui-toolkit'
import { Color4 } from '@dcl/sdk/math'

export const uiBar = ui.createComponent(ui.UIBar, {
	value: 100,
	xOffset: -280,
	yOffset: 80,
})

const uiIcon = ui.createComponent(ui.SmallIcon, {
	image: "images/powerIcon.png",
	width: 90,
	height: 23,
	xOffset: -301,
	yOffset: 85,
})

uiBar.show()
uiIcon.show()

uiBar.set(0)

uiBar.color = Color4.Yellow()