import { engine, EasingFunction, Transform, Tween } from "@dcl/sdk/ecs";
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4, Vector3 } from "@dcl/sdk/math";

export let isShowDebugVisible = false

let currentShow = 'none'
let nextShow = 'none'
let previousShow = 'none'
let lastDownloadedSchedule = 'none'
let isVideoLinkActive = false
let videoPlayerState = 'none'
let errorRetryCounter = 0

export function setShowDebugVisible(newIsShowDebugVisible: boolean){
    isShowDebugVisible = newIsShowDebugVisible
}

export function updateUiShowInformation(newCurrentShow: string, newNextShow: string, newPreviousShow: string){
    currentShow = newCurrentShow
    nextShow = newNextShow
    previousShow = newPreviousShow
}

export function updateUiLastDownloadedSchedule(newLastDownloadedSchedule: string){
    lastDownloadedSchedule = newLastDownloadedSchedule
}

export function updateUiIsVideoLinkActive(newIsVideoLinkActive: boolean){
    isVideoLinkActive = newIsVideoLinkActive
}

export function updateUiVideoPlayerState(newVideoPlayerState: string){
    videoPlayerState = newVideoPlayerState
}

export function incrementErrorRetryCounter(){
    errorRetryCounter++
}

export function createShowDebugUi(){
    return (
        <UiEntity key={"ui-show-debug-container"}
            uiTransform={{
                display: isShowDebugVisible ? 'flex' : 'none',
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                positionType: 'absolute',
                overflow: 'hidden'
            }}
            uiBackground={{
                color: Color4.create(1, 0, 0, 0)
            }}
        >
            
            <UiEntity key={"ui-show-debug-background"}
                uiTransform={{
                    display: 'flex',
                    width: 400, //* windowScale.x * scaleFactor,
                    height: 200, //* windowScale.y * scaleFactor,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    positionType: 'absolute',
                    position: {bottom: 50, right: 20}
                }}
                uiBackground={{
                    // color: Color4.create(0, 0, 0, 0.5)
                }}
            >
                <UiEntity key={"ui-show-debug-text"}
                    uiTransform={{
                        display: 'flex',
                        width: 'auto', //* windowScale.x * scaleFactor,
                        height: 'auto', //* windowScale.y * scaleFactor,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        positionType: 'absolute',
                        // position: {bottom: 0}
                    }}
                    uiBackground={{
                        color: Color4.create(0, 0, 0, 0.5)
                        // texture: { src: 'images/claim/GenericWearablePopUp.png' },
                        // textureMode: 'stretch'
                    }}
                    uiText={{
                        value: `current show: ${currentShow}\nnext show: ${nextShow}\nprevious show: ${previousShow}\nlast downloaded schedule: ${lastDownloadedSchedule}\nisVideoLinkActive: ${isVideoLinkActive}\nvideoPlayerState: ${videoPlayerState}\nerror retry counter: ${errorRetryCounter}`,
                        textWrap: 'nowrap',
                        textAlign: 'bottom-right',
                        // font: 'monospace',
                        fontSize: 16,
                        color: Color4.create(1, 1, 1, 1)
                    }}
                />
                
            </UiEntity>

        </UiEntity>
    )
}


