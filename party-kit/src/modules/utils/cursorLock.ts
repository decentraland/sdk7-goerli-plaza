import {engine, PointerLock} from '@dcl/sdk/ecs'
    

export function initCursorLockSystem(){
    PointerLock.createOrReplace(engine.CameraEntity, {isPointerLocked: false})
}

export function lockCursor(){
    PointerLock.getMutable(engine.CameraEntity).isPointerLocked = true
}

export function unlockCursor(){
    PointerLock.getMutable(engine.CameraEntity).isPointerLocked = false
}

export function isCursorLocked(){
    return PointerLock.get(engine.CameraEntity).isPointerLocked
}

