// import resources, { setSection } from "../dcl-scene-ui-workaround/resources"
import { RESOURCES } from "../resources"
import { Color4 } from '@dcl/sdk/math'
import *  as  ui from 'dcl-ui-toolkit'
import resources from "../dcl-scene-ui-workaround/resources"

class LeavingQuestArea {
    visible: boolean = false
    bgImage: ui.CenterImage
    announcement: ui.Announcement

    constructor() {
        this.bgImage = ui.createComponent(ui.CenterImage, {
            image: RESOURCES.textures.dialogAtlas,
            duration: -1,
            width: 420,
            height: 150,
            section: {
                sourceHeight: resources.backgrounds.NPCDialog.sourceHeight,
                sourceWidth: resources.backgrounds.NPCDialog.sourceWidth,
                sourceLeft: resources.backgrounds.NPCDialog.sourceLeft || 0,
                sourceTop: resources.backgrounds.NPCDialog.sourceTop || 0,
                atlasWidth: 1,
                atlasHeight: 1
            }
        })

        this.announcement = ui.createComponent(ui.Announcement,
            {
                value: "You are too far away.  Catch up! \n Quest will end in\n 000 ",
                color: Color4.White(),
                size: 18,
                duration: -1,
                startHidden: true
            }
        )
    }

    show(force?: boolean) {
        const _force = force !== undefined && force
        if (_force || !this.visible) {
            this.visible = true
            this.bgImage.show()
            this.announcement.show()
        }
    }

    hide() {
        //this.counter.hide()
        this.visible = false
        this.bgImage.hide()
        this.announcement.hide()

    }

    updateText(text: string) {
        // if (this.directionTipText != text) this.directionTipText = text
        this.announcement.value = text
    }
}

export const LeavingQuestAreaUI = new LeavingQuestArea()