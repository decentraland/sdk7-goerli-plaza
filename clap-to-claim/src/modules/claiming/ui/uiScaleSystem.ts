import { engine, UiCanvasInformation } from "@dcl/sdk/ecs"


export let scaleFactor = 1

let canvasInfoTimer = 0
const canvasUpdatePeriod = 1

export function UiScaleSystem(dt: number){
    canvasInfoTimer += dt

    if (canvasInfoTimer <= canvasUpdatePeriod) return
    canvasInfoTimer = 0

    const uiCanvasInfo = UiCanvasInformation.getOrNull(engine.RootEntity)

    if (!uiCanvasInfo) return

    const newScaleFactor = Math.min(uiCanvasInfo.width / 1920, uiCanvasInfo.height / 1080)

    if (newScaleFactor !== scaleFactor) {
        scaleFactor = newScaleFactor
    }
}