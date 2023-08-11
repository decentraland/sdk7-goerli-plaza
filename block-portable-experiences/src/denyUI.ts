import { Color4 } from '@dcl/sdk/math'
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import * as ui from 'dcl-ui-toolkit'
import * as utils from '@dcl-sdk/utils'





ReactEcsRenderer.setUiRenderer(ui.render)
const announcement = ui.createComponent(ui.Announcement, {
    value: 'This scene does not allow smart wearables.\nTake them off, then step out and back in.',
    startHidden: true,
    duration: 5,
    color: Color4.Red(),
    size: 50,
    xOffset: 100,
    yOffset: -50,
})

const mediumIcon = ui.createComponent(ui.LargeIcon, { image: 'images/no-sign.png', xOffset: -600, yOffset: 500 })


export function showUI() {
    mediumIcon.show()
    announcement.show()
    utils.timers.setTimeout(
        function () {
            mediumIcon.hide()
            announcement.hide()
        },
        5000
    )
}

export function hideUI() {
    mediumIcon.hide()
    announcement.hide()
}