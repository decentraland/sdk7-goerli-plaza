
import { EasingFunction, engine, Entity, InputAction, inputSystem, PointerEventType, Schemas, Transform, Tween, tweenSystem, UiCanvasInformation } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { rotateUVs, RotatorSystem, SpinnerComponent } from './rotatorSystem'
import { scaleFactor, UiScaleSystem } from './uiScaleSystem'
import { openExternalUrl } from '~system/RestrictedActions'


export enum ClaimingUiType {
    NONE,
    WAITING,
    ERROR,
    CAMPAIGN_NOT_STARTED,
    CAMPAIGN_ENDED,
    ALREADY_CLAIM,
    SUCCESS
}

let dispenserUiVisible: boolean = false
export let activeUiType: ClaimingUiType = ClaimingUiType.NONE
let thumbnail: string | null = null
let errorText: string = ''
let notStartedTitleText: string = ''
let notStartedDescText: string = ''
let buttonSystemAdded = false

let dispenserUiEntity: Entity
let waitingSpinner: Entity

export function initDispenserUi(){
    waitingSpinner = engine.addEntity()
    SpinnerComponent.create(waitingSpinner, {
        angle: 0,
        speed: 250
    })

    dispenserUiEntity = engine.addEntity()
    Transform.create(dispenserUiEntity, { scale: Vector3.create(0, 0, 0) })
    Tween.createOrReplace(dispenserUiEntity, {
        mode: Tween.Mode.Scale({
            start: Vector3.create(0, 0, 0),
            end: Vector3.create(1, 1, 1)
        }),
        duration: 200,
        easingFunction: EasingFunction.EF_EASEINSINE,
    })

    engine.addSystem(RotatorSystem)
    engine.addSystem(UiScaleSystem)
}

export function createDispenserUi(){
    let windowScale = Transform.getMutable(dispenserUiEntity).scale
    return (
        <UiEntity key={"ui-container"}
            uiTransform={{
                display: dispenserUiVisible ? 'flex' : 'none',
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                positionType: 'absolute',
                overflow: 'hidden'
            }}
            uiBackground={{
                // color: Color4.create(1, 0, 0, 0)
            }}
        >
            <UiEntity key={"ui-background"}
                uiTransform={{
                    display: dispenserUiVisible ? 'flex' : 'none',
                    width: 512 * windowScale.x * scaleFactor,
                    height: 512 * windowScale.y * scaleFactor,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    positionType: 'absolute',
                }}
                uiBackground={{
                    texture: { 
                        src: 'images/claim/MVFW_Background.png' 
                    },
                    textureMode: 'stretch'
                }}
            >

                <UiEntity key={"ui-error"}
                    uiTransform={{
                        display: (activeUiType === ClaimingUiType.ERROR) ? 'flex' : 'none',
                        width: 640 * 0.8 * 0.8 * windowScale.x * scaleFactor,
                        height: 510 * 0.8 * 0.8 * windowScale.x * scaleFactor,
                        justifyContent: 'center',
                        alignContent: 'center',
                        margin:{top: 20 * windowScale.x * scaleFactor},
                        positionType: 'absolute'
                    }}
                    //uiBackground={{
                    //    color: Color4.create(0, 1, 0, 0.1)
                    //}}
                    uiText={{
                        value: errorText,
                        fontSize: 26 * windowScale.x * scaleFactor,
                        textAlign: 'bottom-center'
                        // color: Color4.Blue()
                    }}
                >
                </UiEntity>
                <UiEntity key={"ui-not-active"}
                    uiTransform={{
                        display: (activeUiType === ClaimingUiType.CAMPAIGN_NOT_STARTED || activeUiType === ClaimingUiType.CAMPAIGN_ENDED) ? 'flex' : 'none',
                        width: 512 * 0.8 * windowScale.x * scaleFactor,
                        height: 512 * 0.8 * windowScale.x * scaleFactor,
                        justifyContent: 'center',
                        alignContent: 'center',
                        margin:{top: 20 * windowScale.x * scaleFactor},
                        positionType: 'absolute',
                        position: {
                            //bottom: 0 * windowScale.x * scaleFactor
                        }
                    }}
                    //uiBackground={{
                    //    color: Color4.create(0, 1, 0, 0.1)
                    //}}
                    
                >
                    <UiEntity key={"ui-not-active-text-one"}
                        uiTransform={{
                            display: 'flex',
                            width: '100%',
                            height: 40 * windowScale.x * scaleFactor,
                            positionType: 'absolute',
                            position: {
                                top: 40 * windowScale.x * scaleFactor
                            }
                        }}
                        uiBackground={{
                            //color: Color4.create(0, 1, 0, 0.5)
                        }}
                        uiText={{
                            value: notStartedTitleText,
                            fontSize: 34 * windowScale.x * scaleFactor
                        }}
                    />
                    <UiEntity key={"ui-not-active-frame"}
                        uiTransform={{
                            display: 'flex',
                            width: 345 * windowScale.x * scaleFactor,
                            height: 177 * windowScale.x * scaleFactor,
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignSelf: 'center',
                            margin:{top: 20 * windowScale.x * scaleFactor},
                            positionType: 'absolute',
                        }}
                        uiBackground={{
                            texture: { src: 'images/claim/frame.png' },
                            textureMode: 'nine-slices'
                        }}
                    >
                        <UiEntity key={"ui-not-active-text"}
                            uiTransform={{
                                display: 'flex',
                                width: '95%',
                                height: '100%',
                                alignSelf: 'center',
                                positionType: 'absolute',
                            }}
                            uiText={{
                                value: notStartedDescText,
                                fontSize: 18 * windowScale.x * scaleFactor,
                                textAlign: 'middle-center',

                                // color: Color4.Blue()
                            }}
                        />
                    </UiEntity>
                    
                    <UiEntity key={"ui-ok-button"}
                        uiTransform={{
                            display: 'flex',
                            width: 230 * windowScale.x * scaleFactor,
                            height: 74 * windowScale.x * scaleFactor,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignSelf: 'center',
                            positionType: 'absolute',
                            position: {bottom: -0 * windowScale.x * scaleFactor}
                        }}
                        uiBackground={{
                            //color: Color4.create(0, 1, 0, 0.1),
                            texture: { src: 'images/claim/ok_button.png' },
                            textureMode: 'stretch'
                        }}
                    >
                        <UiEntity key={"ui-ok-button"}
                            uiTransform={{
                                display: 'flex',
                                width: "100%",
                                height: 55 * windowScale.x * scaleFactor,
                                positionType: 'absolute',
                                position: {
                                    top: 5 * windowScale.x * scaleFactor,
                                    left: 10 * windowScale.x * scaleFactor
                                }
                            }}
                            //uiBackground={{
                            //    color: Color4.create(0, 1, 0, 1)
                            //}}
                            uiText={{
                                value: '<b>OK</b>',
                                textAlign: 'middle-center',
                                fontSize: 28 * windowScale.x * scaleFactor
                            }}
                            onMouseDown={() => {
                                hideDispenserUi()
                            }}
                        />
                    </UiEntity>
                </UiEntity>

                <UiEntity key={"ui-waiting"}
                    uiTransform={{
                        display: (activeUiType === ClaimingUiType.WAITING) ? 'flex' : 'none',
                        width: 512 * 0.8 * windowScale.x * scaleFactor,
                        height: 408 * 0.8 * windowScale.x * scaleFactor,
                        // alignContent: 'center',
                        justifyContent: 'center',
                        // alignItems: 'center'
                    }}
                    uiBackground={{
                        color: Color4.create(0, 1, 0, 0)
                    }}
                >
                    <UiEntity key={"ui-waiting-text"}
                        uiTransform={{
                            display: 'flex',
                            width: '100%',
                            height: 200 * windowScale.x * scaleFactor,
                            positionType: 'absolute',
                        }}
                        uiBackground={{
                            // color: Color4.create(0, 1, 0, 0.1)
                        }}
                        uiText={{
                            value: '<b>Preparing your wearable.</b>\nPlease wait and do not leave the scene.',
                            fontSize: 24 * windowScale.x * scaleFactor
                        }}
                        onMouseDown={() => {
                            hideDispenserUi()
                        }}
                    />
                    
                    <UiEntity key={"ui-waiting-spinner-loading"}
                        uiTransform={{
                            display: (activeUiType === ClaimingUiType.WAITING) ? 'flex' : 'none',
                            width: 128 * windowScale.x * scaleFactor,
                            height: 128 * windowScale.x * scaleFactor,
                            flexDirection: 'column',
                            alignContent: 'center',
                            alignItems: 'center',
                            positionType: 'absolute',
                            position: {bottom: 50 * windowScale.x * scaleFactor}
                        }}
                        uiBackground={{
                            // color: Color4.create(0, 1, 0, 0.1),
                            texture: { src: 'images/claim/loader_static_with_margin.png' },
                            textureMode: 'stretch',
                            uvs: waitingSpinner ? rotateUVs(SpinnerComponent.get(waitingSpinner).angle) : undefined
                        }}
                    ></UiEntity>

                </UiEntity>

                <UiEntity key={"ui-already-claimed"}
                    uiTransform={{
                        display: (activeUiType === ClaimingUiType.ALREADY_CLAIM) ? 'flex' : 'none',
                        width: 512 * 1 * windowScale.x * scaleFactor,
                        height: 512 * 0.8 * windowScale.x * scaleFactor,
                        justifyContent: 'center',
                        alignContent: 'center',
                        margin:{top: 20 * windowScale.x * scaleFactor},
                        positionType: 'absolute',
                    }}
                    //uiBackground={{
                    //    color: Color4.create(0, 1, 0, 0.1)
                    //}}
                >
                    <UiEntity key={"ui-already-claimed-text-one"}
                        uiTransform={{
                            display: 'flex',
                            width: '100%',
                            height: 40 * windowScale.x * scaleFactor,
                            positionType: 'absolute',
                            position: {
                                top: 40 * windowScale.x * scaleFactor
                            }
                        }}
                        uiText={{
                            value: '<b>Check your backpack!</b>',
                            fontSize: 34 * windowScale.x * scaleFactor
                        }}
                    />
                    
                    <UiEntity key={"ui-frame-image"}
                        uiTransform={{
                            display: 'flex',
                            width: 345 * windowScale.x * scaleFactor,
                            height: 177 * windowScale.x * scaleFactor,
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignSelf: 'center',
                            margin:{top: 20 * windowScale.x * scaleFactor},
                            positionType: 'absolute',
                        }}
                        uiBackground={{
                            texture: { src: 'images/claim/frame.png' },
                            textureMode: 'nine-slices'
                        }}
                    >
                        <UiEntity key={"ui-already-claimed-icon"}
                            uiTransform={{
                                display: 'flex',
                                width: 48 * windowScale.x * scaleFactor,
                                height: 59 * windowScale.x * scaleFactor,
                                positionType: 'absolute',
                                position: {top: 24 * windowScale.x * scaleFactor}
                            }}
                            uiBackground={{
                                texture: { src: 'images/claim/backpack_icon.png' },
                                textureMode: 'stretch'
                            }}
                        />
                        <UiEntity key={"ui-already-claimed-text-two"}
                            uiTransform={{
                                display: 'flex',
                                width: '100%',
                                height: 20 * windowScale.x * scaleFactor,
                                positionType: 'absolute',
                                position: {bottom: 40 * windowScale.x * scaleFactor}
                            }}
                            uiText={{
                                value: '<b>You already claimed this \nWearable!</b>',
                                fontSize: 20 * windowScale.x * scaleFactor
                            }}
                        />
                    </UiEntity>

                    <UiEntity key={"ui-ok-button"}
                        uiTransform={{
                            display: 'flex',
                            width: 230 * windowScale.x * scaleFactor,
                            height: 74 * windowScale.x * scaleFactor,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignSelf: 'center',
                            positionType: 'absolute',
                            position: {bottom: -0 * windowScale.x * scaleFactor}
                        }}
                        uiBackground={{
                            texture: { src: 'images/claim/ok_button_empty.png' },
                            textureMode: 'stretch'
                        }}
                    >
                        <UiEntity key={"ui-ok-button"}
                            uiTransform={{
                                display: 'flex',
                                width: "100%",
                                height: 55 * windowScale.x * scaleFactor,
                                positionType: 'absolute',
                                position: {
                                    top: 5 * windowScale.x * scaleFactor
                                }
                            }}
                            uiBackground={{
                                color: Color4.create(0, 1, 0, 0)
                            }}
                            uiText={{
                                value: '<b>CHECK STATUS</b>',
                                fontSize: 16 * windowScale.x * scaleFactor,
                            }}
                            onMouseDown={() => {
                                openExternalUrl({ url: 'https://decentraland.org/rewards' })
                            }}
                        />
                    </UiEntity>
                    
                </UiEntity>

                <UiEntity key={"ui-success"}
                    uiTransform={{
                        display: (activeUiType === ClaimingUiType.SUCCESS) ? 'flex' : 'none',
                        width: 640 * 0.8 * 0.8 * windowScale.x * scaleFactor,
                        height: 510 * 0.8 * 0.89 * windowScale.x * scaleFactor,
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignContent: 'center',
                        margin:{top: 20 * windowScale.x * scaleFactor},
                        positionType: 'absolute'
                    }}
                    uiBackground={{
                        //color: Color4.create(0, 0, 1, 0.1)
                    }}
                >
                    <UiEntity key={"ui-success-text-one"}
                        uiTransform={{
                            display: 'flex',
                            width: '100%',
                            height: 40 * windowScale.x * scaleFactor,
                            positionType: 'absolute',
                            position: {top: 0 * windowScale.x * scaleFactor}
                        }}
                        uiBackground={{
                            //color: Color4.create(0, 1, 0, 0.5)
                        }}
                        uiText={{
                            value: '<b>Wearable Incoming!</b>',
                            fontSize: 35 * windowScale.x * scaleFactor
                        }}
                    />
                    <UiEntity key={"ui-success-text-two"}
                        uiTransform={{
                            display: 'flex',
                            width: '100%',
                            height: 20 * windowScale.x * scaleFactor,
                            positionType: 'absolute',
                            position: {top: 40 * windowScale.x * scaleFactor}
                        }}
                        uiBackground={{
                            //color: Color4.create(0, 0, 1, 0.5)
                        }}
                        uiText={{
                            value: 'It will arrive in your backpack in a few minutes.',
                            fontSize: 16 * windowScale.x * scaleFactor
                        }}
                    />

                    <UiEntity key={"ui-wearable-image"}
                        uiTransform={{
                            display: thumbnail ? 'flex' : 'none',
                            width: 512 * 0.5 * windowScale.x * scaleFactor,
                            height: 512 * 0.5 * windowScale.x * scaleFactor,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignSelf: 'center',
                            positionType: 'absolute',
                            position: {top: 70 * windowScale.x * scaleFactor}
                        }}
                        uiBackground={{
                            // color: Color4.create(0, 1, 0, 0.1)
                            texture: { src: thumbnail ?? '' },
                            textureMode: 'stretch'
                        }}
                    ></UiEntity>

                    <UiEntity key={"ui-ok-button"}
                        uiTransform={{
                            display: 'flex',
                            width: 230 * windowScale.x * scaleFactor,
                            height: 74 * windowScale.x * scaleFactor,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignSelf: 'center',
                            positionType: 'absolute',
                            position: {bottom: -40 * windowScale.x * scaleFactor}
                        }}
                        uiBackground={{
                            //color: Color4.create(0, 1, 0, 0.1),
                            texture: { src: 'images/claim/ok_button.png' },
                            textureMode: 'stretch'
                        }}
                    >
                        <UiEntity key={"ui-ok-button"}
                            uiTransform={{
                                display: 'flex',
                                width: "100%",
                                height: 55 * windowScale.x * scaleFactor,
                                positionType: 'absolute',
                                position: {
                                    top: 5 * windowScale.x * scaleFactor,
                                    left: 10 * windowScale.x * scaleFactor
                                }
                            }}
                            //uiBackground={{
                            //    color: Color4.create(0, 1, 0, 1)
                            //}}
                            uiText={{
                                value: '<b>OK</b>',
                                textAlign: 'middle-center',
                                fontSize: 28 * windowScale.x * scaleFactor
                            }}
                            onMouseDown={() => {
                                hideDispenserUi()
                            }}
                        />
                    </UiEntity>
                </UiEntity>

                <UiEntity key={"ui-close"}
                    uiTransform={{
                        display: 'flex',
                        width: 32 * windowScale.x * scaleFactor,
                        height: 32 * windowScale.x * scaleFactor,
                        positionType: 'absolute',
                        position: {right: 0, top: 0},
                        margin: {top: 12 * windowScale.x * scaleFactor, right: 12 * windowScale.x * scaleFactor}
                    }}
                    uiBackground={{
                        //color: Color4.create(1, 1, 1, 1),
                        texture: { src: 'images/claim/close_button.png' },
                        textureMode: 'stretch'
                    }}
                    onMouseDown={() => {
                        hideDispenserUi()
                    }}
                >
                </UiEntity>
            </UiEntity>

        </UiEntity>
    )
}

export function alreadyClaimedUi(){
    activeUiType = ClaimingUiType.ALREADY_CLAIM
    if(!dispenserUiVisible) {
        dispenserUiVisible = true
        // tween scaling?
    }
    showDispenserUi()
}

export function errorUi(_errorText: string, bOverrideAllText: boolean = false){
    if(bOverrideAllText) {
        errorText = _errorText
    }
    else {
        errorText = '<b>There is an error:</b>\n\n' + '<i>' + _errorText.replace('_', ' ') + '</i>' 
    }
    activeUiType = ClaimingUiType.ERROR
    if(!dispenserUiVisible) {

        dispenserUiVisible = true
        // tween scaling?
    }
    showDispenserUi()
}

export function notStartedUi(startDate: Date){
    
    notStartedTitleText = '<b>You\'re a bit early!</b>'
    notStartedDescText = '<b>Claim this Wearable '+
        '<color=#FE9F5A>' +
        startDate.toLocaleString('en-US', { month: 'long', day: 'numeric' })+
        ((startDate.getDate() == 1)? 'st' : (startDate.getDate() == 2)? 'nd' : (startDate.getDate() == 3)? 'rd' : 'th')+'</color> \nstarting at '+
        '<color=#FE9F5A>'+
        startDate.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })+'</color></b>'
    
    activeUiType = ClaimingUiType.CAMPAIGN_NOT_STARTED
    if(!dispenserUiVisible) {

        dispenserUiVisible = true
        // tween scaling?
    }
    showDispenserUi()
    addButtonESystem()
}

export function endedUi(endDate: Date){
    notStartedTitleText = '<b>You just missed it!</b>'
    notStartedDescText = '<b>This giveaway ended on \n'+
        '<color=#FE9F5A>'+
        endDate.toLocaleString('en-US', { month: 'long', day: 'numeric' })+
        ((endDate.getDate() == 1)? 'st' : (endDate.getDate() == 2)? 'nd' : (endDate.getDate() == 3)? 'rd' : 'th')+' '+
        endDate.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })+
        '</color>'+
        '\n\nYou can check the marketplace to see if it\'s available for sale.</b>'
    
    activeUiType = ClaimingUiType.CAMPAIGN_ENDED
    if(!dispenserUiVisible) {

        dispenserUiVisible = true
        // tween scaling?
    }
    showDispenserUi()
    addButtonESystem()
}

export function waitingUi(){
    activeUiType = ClaimingUiType.WAITING
    if(!dispenserUiVisible) {
        dispenserUiVisible = true
        // tween scaling?
    }
    showDispenserUi()
}

export function successUi(_thumbnail: string, wearableName: string){
    thumbnail = _thumbnail
    activeUiType = ClaimingUiType.SUCCESS
    if(!dispenserUiVisible) {
        dispenserUiVisible = true
        // tween scaling?
    }
    showDispenserUi()

    addButtonESystem()
}

function addButtonESystem(){
    if(buttonSystemAdded) return;
    buttonSystemAdded = true
    
    engine.addSystem(() => {
        if(activeUiType !== ClaimingUiType.SUCCESS && activeUiType !== ClaimingUiType.CAMPAIGN_NOT_STARTED && activeUiType !== ClaimingUiType.CAMPAIGN_ENDED) return

        if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)) {
            hideDispenserUi()
            removeButtonSystem()
        }
    }, undefined, 'ui-keyboard-input-system')
}
function removeButtonSystem(){
    if(!buttonSystemAdded) return

    buttonSystemAdded = false
    engine.removeSystem('ui-keyboard-input-system')
}

function showDispenserUi(){
    Tween.deleteFrom(dispenserUiEntity)
    engine.removeSystem('hide-dispenser-ui-system')
    engine.removeSystem('show-dispenser-ui-system')

    Tween.createOrReplace(dispenserUiEntity, {
        mode: Tween.Mode.Scale({
            start: Transform.get(dispenserUiEntity).scale,
            end: Vector3.create(1, 1, 1)
        }),
        duration: 150,
        easingFunction: EasingFunction.EF_EASEINSINE,
    })

    engine.addSystem(() => {
        const tweenCompleted = tweenSystem.tweenCompleted(dispenserUiEntity)
        if (tweenCompleted) {
            engine.removeSystem('show-dispenser-ui-system')
        }
    }, undefined, 'show-dispenser-ui-system')
}


function hideDispenserUi(){
    Tween.deleteFrom(dispenserUiEntity)
    engine.removeSystem('hide-dispenser-ui-system')
    engine.removeSystem('show-dispenser-ui-system')
    removeButtonSystem()

    if(dispenserUiVisible) {
        Tween.createOrReplace(dispenserUiEntity, {
            mode: Tween.Mode.Scale({
                start: Vector3.create(1, 1, 1),
                end: Vector3.create(0, 0, 0)
            }),
            duration: 150,
            easingFunction: EasingFunction.EF_EASEINSINE,
        })

        engine.addSystem(() => {
            const tweenCompleted = tweenSystem.tweenCompleted(dispenserUiEntity)
            if (tweenCompleted) {
                dispenserUiVisible = false
                activeUiType = ClaimingUiType.NONE
                engine.removeSystem('hide-dispenser-ui-system')
            }
        }, undefined, 'hide-dispenser-ui-system')
    }
}
