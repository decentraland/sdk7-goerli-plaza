import { UiCanvasInformation, engine } from '@dcl/sdk/ecs'

import { bannerSystem, setupBanner } from './migrated-ui/banner'
import { BannerPosition, BannerType } from './migrated-ui/bannerConstants'

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
  engine.addSystem(bannerSystem)

  setupBanner(BannerType.B_MEAT)
}
