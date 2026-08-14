import { EasingFunction, engine, Entity, MapResult, Schemas, timers, Transform, Tween, VisibilityComponent } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"
import { ReactEcsRenderer } from "@dcl/sdk/react-ecs"
import { createCakeNotificationListUI } from "./cakeNotificationUI"

const NotificationSchema = {
    visible: Schemas.Boolean,
    active: Schemas.Boolean,
    text1: Schemas.String,
    text2: Schemas.String,
    createdAt: Schemas.Number,
    cleaning: Schemas.Boolean,
    timeoutToHide: Schemas.Optional(Schemas.Number),
}
const NotificationComponent = engine.defineComponent('NotificationComponent', NotificationSchema)
type NotificationType = MapResult<typeof NotificationSchema>

let bIsVisible: boolean = false
let uiNotificationListEntity: Entity
let uiNotificationEntities: Entity[] = []
let uiNotificationPositionIndex: number[] = []
const UI_NOTIFICATION_POSITION_X: number = 0
const UI_NOTIFICATION_POSITION_HIDDEN_X: number = -200
const MAX_VISIBLE_NOTIFICATIONS: number = 7
const MAX_NOTIFICATIONS: number = 12

export function showCakeNotificationListUI() {
    if(!uiNotificationListEntity) {
        uiNotificationListEntity = engine.addEntity()
        ReactEcsRenderer.addUiRenderer(uiNotificationListEntity, () => createCakeNotificationListUI(), {virtualWidth: 1920, virtualHeight: 1080})
    }
    bIsVisible = true
}

export function hideCakeNotificationListUI() {
    bIsVisible = false
}

export function requestCakeNotification(text1: string, text2: string, seconds: number = 0) {
    checkMaxActiveNotifications()
    let index = getFreeIndex()
    if(index == -1) {
        
        index = getOldestActiveIndex()
        hideCakeNotificationUI(index, () => {
            showCakeNotificationUI(index, text1, text2, seconds)
        })
        return index
    }
    showCakeNotificationUI(index, text1, text2, seconds)
    
    return index
}

function showCakeNotificationUI(index: number, text1: string, text2: string, seconds: number = 0) {
    if(!bIsVisible) {
        showCakeNotificationListUI()
    }
    if(!uiNotificationEntities[index]) {
        uiNotificationEntities[index] = engine.addEntity()
        Transform.createOrReplace(uiNotificationEntities[index], {
            position: Vector3.create(UI_NOTIFICATION_POSITION_HIDDEN_X, 0, 0)
        })
    }

    NotificationComponent.createOrReplace(uiNotificationEntities[index], {visible: true, active: true, text1: text1, text2: text2, createdAt: Date.now()})

    updateAllNotificationPositions()
    showAnimation(index)

    if(seconds > 0) {
        
        NotificationComponent.getMutable(uiNotificationEntities[index]).timeoutToHide = timers.setTimeout(() => {
            hideCakeNotificationUI(index)
        }, seconds * 1000)
    }
}

export function hideCakeNotificationUI(index: number, cb?: () => void) {
    if(!uiNotificationEntities[index]) return
    let timeoutToHide = NotificationComponent.get(uiNotificationEntities[index])?.timeoutToHide
    if(timeoutToHide !== undefined) {
        timers.clearTimeout(timeoutToHide)
    }
    NotificationComponent.getMutable(uiNotificationEntities[index]).cleaning = true
    hideAnimation(index, () => {
        timers.setTimeout(() => {
            NotificationComponent.getMutable(uiNotificationEntities[index]).cleaning = false
            NotificationComponent.getMutable(uiNotificationEntities[index]).active = false
            NotificationComponent.getMutable(uiNotificationEntities[index]).visible = false
            updateAllNotificationPositions()
            cb?.()
        }, 100)
    })
}

function showAnimation(index: number) {
    Tween.createOrReplace(uiNotificationEntities[index],{
        duration: 400,
        easingFunction: EasingFunction.EF_EASEOUTBACK,
        currentTime: 0,
        playing: true,
        mode: Tween.Mode.Move({
            start: Vector3.create(Transform.get(uiNotificationEntities[index]).position.x, 0, 0),
            end: Vector3.create(UI_NOTIFICATION_POSITION_X, 0, 0)
        })
    })
}

function hideAnimation(index: number, cb?: () => void) {
    Tween.createOrReplace(uiNotificationEntities[index],{
        duration: 400,
        easingFunction: EasingFunction.EF_EASEINBACK,
        currentTime: 0,
        playing: true,
        mode: Tween.Mode.Move({
            start: Vector3.create(Transform.get(uiNotificationEntities[index]).position.x, 0, 0),
            end: Vector3.create(UI_NOTIFICATION_POSITION_HIDDEN_X, 0, 0)
        })
    })

    timers.setTimeout(() => {
        cb?.()
    }, 400)
}

function getFreeIndex(): number {

    for(let i = 0; i < uiNotificationEntities.length; i++) {
        if(!NotificationComponent.get(uiNotificationEntities[i]).active) {
            return i
        }
    }
    if(uiNotificationEntities.length < MAX_NOTIFICATIONS) {
        return uiNotificationEntities.length
    }
    return -1
    
}
function getOldestActiveIndex(): number {
    let oldestIndex = 0
    let oldestCreatedAt = NotificationComponent.get(uiNotificationEntities[0]).createdAt
    for(let i = 0; i < uiNotificationEntities.length; i++) {
        if(
            NotificationComponent.get(uiNotificationEntities[i]).active && 
            !NotificationComponent.get(uiNotificationEntities[i]).cleaning &&
            NotificationComponent.get(uiNotificationEntities[i]).createdAt < oldestCreatedAt
        ) {
            oldestIndex = i
            oldestCreatedAt = NotificationComponent.get(uiNotificationEntities[i]).createdAt
        }
    }
    return oldestIndex
}

function getActiveCount(): number {
    let count = 0
    for(let i = 0; i < uiNotificationEntities.length; i++) {
        if(NotificationComponent.get(uiNotificationEntities[i]).active && !NotificationComponent.get(uiNotificationEntities[i]).cleaning) {
            count++
        }
    }
    return count
}
function checkMaxActiveNotifications() {
    if(getActiveCount() >= MAX_VISIBLE_NOTIFICATIONS) {
        hideCakeNotificationUI(getOldestActiveIndex())
    }
}

function updateAllNotificationPositions() {

    for(let index = 0; index < uiNotificationEntities.length; index++) {
        updateNotificationPosition(index)
    }
}
function updateNotificationPosition(index: number) {
    let position = 0
    let duplicated = 0
    for (let i = 0; i < uiNotificationEntities.length; i++) {
        if(
            i !== index && 
            NotificationComponent.get(uiNotificationEntities[i]).visible 
        ) {
            if(NotificationComponent.get(uiNotificationEntities[i]).createdAt < NotificationComponent.get(uiNotificationEntities[index]).createdAt) {
                position++;
            }
            else if(i < index && NotificationComponent.get(uiNotificationEntities[i]).createdAt == NotificationComponent.get(uiNotificationEntities[index]).createdAt) {
                duplicated++;
            }
        }
    }
    uiNotificationPositionIndex[index] = position + duplicated
}

export function isVisible() {
    return bIsVisible
}
export function isNotificationVisible(index: number): boolean {
    if(!uiNotificationEntities[index]) return false
    return NotificationComponent.get(uiNotificationEntities[index]).visible
}

export function getNotificationText1(index: number): string {
    if(!uiNotificationEntities[index]) return ''
    return NotificationComponent.get(uiNotificationEntities[index]).text1
}
export function getNotificationText2(index: number): string {
    if(!uiNotificationEntities[index]) return ''
    return NotificationComponent.get(uiNotificationEntities[index]).text2
}

export function getNotificationPositionX(index: number): number {
    if(!uiNotificationEntities[index]) return 0
    return Transform.get(uiNotificationEntities[index]).position.x
}

export function calculateTextWidth(text: string): number {
    return Math.max(text.length * 14, 56)
}
export function getNotificationPositionIndex(index: number): number {
    if(!uiNotificationEntities[index]) return 0
    return uiNotificationPositionIndex[index]
}