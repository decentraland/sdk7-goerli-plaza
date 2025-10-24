
import { Animator, AudioSource, GltfContainer, InputAction, PBGltfContainer, Transform, TransformTypeWithOptionals, VisibilityComponent, engine, pointerEventsSystem } from '@dcl/sdk/ecs'
import { ClaimConfigInstType } from './claiming/claimConfig'
import { claimToken } from './claiming/claim'
import * as utils from '@dcl-sdk/utils'
import { CONFIG } from '../config'


export function createDispenser(
    campaign: ClaimConfigInstType, 
    campaign_key: string, 
    dispTransform: TransformTypeWithOptionals, 
    model: string, 
    buttonModel: string, 
    buttonClip: string,
    balloonsModel: string,
    bUseBaloons: boolean = false
) {
    const dispenserBase = engine.addEntity()
    GltfContainer.create(dispenserBase, {
        src: model
    })
    Transform.create(dispenserBase, {
        ...dispTransform
    })

    const dispenserButton = engine.addEntity()
    GltfContainer.create(dispenserButton, {
        src: buttonModel
    })
    Transform.create(dispenserButton, {
        ...dispTransform
    })

    Animator.create(dispenserButton, {
        states: [
            {
                clip: buttonClip,
                loop: false,
                playing: false
            }
        ]
    })

    const baloons = engine.addEntity()
    if(bUseBaloons) {
        GltfContainer.create(baloons, {
            src: balloonsModel
        })
        Transform.create(baloons, {
            parent: dispenserBase,
            position: {x: 0, y: 1.2, z: 0}
        })
        Animator.create(baloons, {
            states: [
                {
                    clip: 'armature_psAction',
                    loop: false,
                    playing: false
                }
            ]
        })
        VisibilityComponent.create(baloons, {
            visible: false
        })
    }

    // const wewarable = engine.addEntity()
    // GltfContainer.create(wewarable, wearableModel)
    // Transform.create(wewarable, wearableTransform)
    // Transform.getMutable(wewarable).parent = dispenserBase

    const clickSound = engine.addEntity()
    Transform.create(clickSound, {parent: engine.CameraEntity})
    AudioSource.create(clickSound, {
        audioClipUrl: 'sounds/dispenser/click.mp3',
        playing: false,
        loop: false
    })

    const clickFailSound = engine.addEntity()
    Transform.create(clickFailSound, {parent: engine.CameraEntity})
    AudioSource.create(clickFailSound, {
        audioClipUrl: 'sounds/dispenser/click_fail.mp3',
        playing: false,
        loop: false
    })
    
    let canClick = true
    const clickDelayMs = 4000
    pointerEventsSystem.onPointerDown(
        {
            entity: dispenserButton,
            opts: {
                button: InputAction.IA_POINTER,
                hoverText: CONFIG.CONFIG_CLAIM_TESTING_ENABLED ? 'Claim ' + campaign.refId : 'Claim',
                maxDistance: 5
            }
        },
        function () {
            if(!canClick) {
                AudioSource.getMutable(clickFailSound).playing = true
                return
            }
            AudioSource.getMutable(clickSound).playing = true
            if(bUseBaloons) {
                VisibilityComponent.getMutable(baloons).visible = true
                Animator.playSingleAnimation(baloons, 'armature_psAction', true)
            }

            canClick = false
            utils.timers.setTimeout(() => {
                canClick = true
            }, clickDelayMs)
            
            Animator.playSingleAnimation(dispenserButton, buttonClip, true)

            utils.timers.setTimeout(() => {
                claimToken(campaign, campaign_key)
            }, 500)

            
        }
    )

    return dispenserBase
}