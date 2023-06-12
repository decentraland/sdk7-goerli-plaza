import { engine, UiCanvasInformation } from '@dcl/sdk/ecs'
import { setupUi } from './ui'

// export all the functions required to make the scene work
export * from '@dcl/sdk'

export let canvasInfo = {
  width: 0,
  height: 0
}

export function main() {
  setupUi()

  engine.addSystem((deltaTime) => {
    const uiCanvasInfo = UiCanvasInformation.getOrNull(engine.RootEntity)

    if (!uiCanvasInfo) return

    canvasInfo.width = uiCanvasInfo.width
    canvasInfo.height = uiCanvasInfo.height

    // console.log('--------------' +
    //   '\nscreen width: ' + uiCanvasInfo.width +
    //   '\nscreen height: ' + uiCanvasInfo.height +
    //   '\nscreen pixel ratio: ' + uiCanvasInfo.devicePixelRatio +
    //   '\n--------------')
  })
}
