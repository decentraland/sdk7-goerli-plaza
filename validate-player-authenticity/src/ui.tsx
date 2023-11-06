import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import * as ui from 'dcl-ui-toolkit'

export class Announcement {
  passedAnnouncement: ui.Announcement
  failedAnnouncement: ui.Announcement

  constructor() {
    ReactEcsRenderer.setUiRenderer(ui.render)

    this.passedAnnouncement = ui.createComponent(ui.Announcement, { 
      value: 'Your intentions are pure' 
    })
    
    this.failedAnnouncement = ui.createComponent(ui.Announcement, { 
      value: 'Your dark schemes are not welcome here, be gone!' 
    })
  }
}