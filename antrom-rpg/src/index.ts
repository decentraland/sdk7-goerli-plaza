import { UiCanvasInformation, engine } from '@dcl/sdk/ecs'

import { setupWearableMarket } from './migrated-ui/wearablesMarket'

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

  setupWearableMarket()
}
