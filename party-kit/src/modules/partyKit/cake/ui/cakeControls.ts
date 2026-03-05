import { EasingFunction, engine, Entity, timers, Transform, Tween } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"
import { ReactEcsRenderer } from "@dcl/sdk/react-ecs"
import { createControlsCakeUI } from "./cakeControlsUI"

let bIsVisible: boolean = false
let uiPositionEntity: Entity
const UI_POSITION_Y: number = 0
const UI_POSITION_HIDDEN_Y: number = -20

export function showCakeControlsUI() {
    if(!uiPositionEntity) {
        uiPositionEntity = engine.addEntity()
        Transform.create(uiPositionEntity, {
            position: Vector3.create(0, UI_POSITION_HIDDEN_Y, 0)
        })
        ReactEcsRenderer.addUiRenderer(uiPositionEntity, () => createControlsCakeUI(), {virtualWidth: 1920, virtualHeight: 1080})
    }
    
    bIsVisible = true
    showAnimation()
    
}

export function hideCakeControlsUI() {
    hideAnimation(()=>{
        bIsVisible = false
    })
}

function showAnimation() {
    Tween.createOrReplace(uiPositionEntity,{
        duration: 400,
        easingFunction: EasingFunction.EF_EASEOUTBACK,
        currentTime: 0,
        playing: true,
        mode: Tween.Mode.Move({
            start: Vector3.create(0, Transform.get(uiPositionEntity).position.y, 0),
            end: Vector3.create(0, UI_POSITION_Y, 0)
        })
    })
}

function hideAnimation(cb?: () => void) {
    Tween.createOrReplace(uiPositionEntity,{
        duration: 400,
        easingFunction: EasingFunction.EF_EASEINBACK,
        currentTime: 0,
        playing: true,
        mode: Tween.Mode.Move({
            start: Vector3.create(0, Transform.get(uiPositionEntity).position.y, 0),
            end: Vector3.create(0, UI_POSITION_HIDDEN_Y, 0)
        })
    })

    if(cb) {
        timers.setTimeout(() => {
            cb()
        }, 400)
    }
}

export function isVisible() {
    return bIsVisible
}

export function getUiPositionY(): number {
    if(!uiPositionEntity) {
        return UI_POSITION_HIDDEN_Y
    }
    return Transform.get(uiPositionEntity).position.y
}