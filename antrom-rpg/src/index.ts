import { UiCanvasInformation, engine } from '@dcl/sdk/ecs'

import { setupNpcDialogUi } from './migrated-ui/npcDialog'
import { BONE_TRADER_DIALOGS } from './mocked-data/dialogsData'
import { setupResourcesMarket } from './migrated-ui/resourcesMarket'

export let canvasInfo = {
  width: 0,
  height: 0
}

export function main() {
  engine.addSystem((deltaTime) => {
    const uiCanvasInfo = UiCanvasInformation.getOrNull(engine.RootEntity)

    if (!uiCanvasInfo) return

    canvasInfo.width = uiCanvasInfo.width
    canvasInfo.height = uiCanvasInfo.height
  })

  // draw UI

  setupResourcesMarket()
}
