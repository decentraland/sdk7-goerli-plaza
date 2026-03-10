import { EasingFunction, engine, Entity, timers, Transform, Tween } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"
import { ReactEcsRenderer } from "@dcl/sdk/react-ecs"
import { createCakeSplashUI } from "./cakeSplashUI"
import { randomFloat, randomInt, randomSign } from "../../../utils/utils"
import { rotateUVs } from "../../../../uiAnim/utilities";
import { audioPlayer } from "../../../audioPlayer";

const SPLAT_SOUNDS = [
    "assets/sounds/cake splat/cake_splat_1.mp3",
    "assets/sounds/cake splat/cake_splat_2.mp3",
    "assets/sounds/cake splat/cake_splat_3.mp3"
]

const MAX_SPLASHES: number = 9

let bIsVisible: boolean = false
let uiSplashEntity: Entity
const randomSplashIndex: number[] = []
const randomSplashSide: number[] = []
const randomOffsetX: number[] = []
const randomOffsetY: number[] = []
const randomAngleUVs: number[][] = []
const randomSizeScale: number[] = []
const animationEntities: Entity[] = []
const animationAlphaEntities: Entity[] = []
const inUse: boolean[] = []
const splashIsVisible: boolean[] = []

const START_ALPHA: number = 1.0
const MAX_ALPHA: number = 0.95
const END_ALPHA: number = 0
const START_POSITION_Y: number = 0
const MAX_POSITION_Y: number = 0
const END_POSITION_Y: number = 400
const START_SCALE: number = 0
const MAX_SCALE: number = 1.7
const END_SCALE: number = 1.5


export function showCakeSplashUI() {
    if(!uiSplashEntity) {
        uiSplashEntity = engine.addEntity()
        
        for(let i = 0; i < MAX_SPLASHES; i++) {
            animationEntities[i] = engine.addEntity()
            animationAlphaEntities[i] = engine.addEntity()
            Transform.create(animationEntities[i], {
                position: Vector3.create(START_SCALE, START_POSITION_Y, 0),
            })
            Transform.create(animationAlphaEntities[i], {
                position: Vector3.create(START_ALPHA, START_ALPHA, START_ALPHA),
            })
            inUse[i] = false
            splashIsVisible[i] = false
        }
        ReactEcsRenderer.addUiRenderer(uiSplashEntity, () => createCakeSplashUI(), {virtualWidth: 1920, virtualHeight: 1080})
    }
    
    bIsVisible = true

    let indexesToUse = []
    for (let i = 0; i < inUse.length && indexesToUse.length < 3; i++) {
        if(!inUse[i]) {
            indexesToUse.push(i)
            inUse[i] = true
        }
    }
    if(indexesToUse.length == 0) {
        return
    }

    let startSide = randomSign()
    for(let i = 0; i < indexesToUse.length; i++) {
        randomSplashIndex[indexesToUse[i]] = randomInt(0, 3)
        randomAngleUVs[indexesToUse[i]] = rotateUVs(randomInt(0, 360))
        splashIsVisible[indexesToUse[i]] = false
        randomSplashSide[indexesToUse[i]] = (i % 2 === 0) ? startSide : -startSide
        randomOffsetX[indexesToUse[i]] = randomFloat(0.3, 1.0)
        randomOffsetY[indexesToUse[i]] = randomFloat(0, 1.0)
        randomSizeScale[indexesToUse[i]] = randomFloat(0.9, 1.3)
    }

    timers.setTimeout(() => {
        splashAnimations(indexesToUse)
    }, 200)
}

function splashAnimations(indexesToUse: number[]) {
    for(let i = 0; i < indexesToUse.length; i++) {
        showAnimation(indexesToUse[i], () => {
            easeHideAnimation(indexesToUse[i], () => {
                splashIsVisible[indexesToUse[i]] = false
                inUse[indexesToUse[i]] = false
            })
        })
    }
}

function showAnimation(index: number, cb?: () => void) {
    splashIsVisible[index] = true
    audioPlayer.playSingleSound({
        audioClipUrl: SPLAT_SOUNDS[randomInt(0, 2)],
        volume: 0.25
    })
    Transform.createOrReplace(animationEntities[index], {
        position: Vector3.create(START_SCALE, MAX_POSITION_Y, START_ALPHA)
    })
    Transform.createOrReplace(animationAlphaEntities[index], {
        position: Vector3.create(START_ALPHA, START_ALPHA, START_ALPHA)
    })
    Tween.createOrReplace(animationEntities[index], {
        duration: 200,
        easingFunction: EasingFunction.EF_EASEEXPO,
        currentTime: 0,
        playing: true,
        mode: Tween.Mode.Move({
            start: Vector3.create(START_SCALE, MAX_POSITION_Y, 0),
            end: Vector3.create(MAX_SCALE, MAX_POSITION_Y, 0)
        })
    })
    Tween.createOrReplace(animationAlphaEntities[index], {
        duration: 200,
        easingFunction: EasingFunction.EF_EASEEXPO,
        currentTime: 0,
        playing: true,
        mode: Tween.Mode.Move({
            start: Vector3.create(START_ALPHA, START_ALPHA, START_ALPHA),
            end: Vector3.create(MAX_ALPHA, MAX_ALPHA, MAX_ALPHA)
        })
    })
    timers.setTimeout(() => {
        cb?.()
    }, 200)
}

function easeHideAnimation(index: number, cb?: () => void) {
    Tween.createOrReplace(animationEntities[index], {
        duration: 4000,
        easingFunction: EasingFunction.EF_EASEINSINE,
        currentTime: 0,
        playing: true,
        mode: Tween.Mode.Move({
            start: Vector3.create(MAX_SCALE, MAX_POSITION_Y, MAX_ALPHA),
            end: Vector3.create(END_SCALE, END_POSITION_Y, END_ALPHA)
        })
    })
    timers.setTimeout(() => {
        Tween.createOrReplace(animationAlphaEntities[index], {
            duration: 2500,
            easingFunction: EasingFunction.EF_EASEINEXPO,
            currentTime: 0,
            playing: true,
            mode: Tween.Mode.Move({
                start: Vector3.create(MAX_ALPHA, MAX_ALPHA, MAX_ALPHA),
                end: Vector3.create(END_ALPHA, END_ALPHA, END_ALPHA)
            })
        })
    }, 1500)
    timers.setTimeout(() => {
        cb?.()
    }, 4300)
}

export function isVisible() {
    return bIsVisible
}

export function isSplashVisible(index: number): boolean {
    return splashIsVisible[index]
}
export function getSplashImageIndex(index: number): number {
    return randomSplashIndex[index] || 0
}

export function getSplashSide(index: number): number {
    return randomSplashSide[index] || 1
}

export function getSplashOffsetX(index: number): number {
    return randomOffsetX[index] || 0
}
export function getSplashOffsetY(index: number): number {
    return randomOffsetY[index] || 0
}
export function getSplashUVs(index: number) {
    return randomAngleUVs[index] || undefined
}
export function getAnimOffsetY(index: number): number {
    return Transform.get(animationEntities[index]).position.y
}
export function getAnimAlpha(index: number): number {
    return Transform.get(animationAlphaEntities[index]).position.z
}
export function getAnimScale(index: number): number {
    return Transform.get(animationEntities[index]).position.x
}
export function getSizeScale(index: number): number {
    return randomSizeScale[index] || 1
}