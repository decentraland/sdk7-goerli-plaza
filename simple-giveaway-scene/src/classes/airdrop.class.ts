import { engine, Transform, GltfContainer, AudioSource, Entity, Tween, EasingFunction, raycastSystem, InputAction, pointerEventsSystem, PointerEventType, PointerEvents, inputSystem } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"
import * as utils from '@dcl-sdk/utils'
import { gameController } from "../controllers/game.controller"
import { ClaimConfigInstType } from "../config/claim.config"

type dropArea = {
    SW: Vector3
    NE: Vector3
}

let DROP_HEIGHT = 15

let stageDropArea: dropArea = {
    SW: Vector3.create(3, 0, 3),
    NE: Vector3.create(9, 0, 9)
}
export class airdropWearable {
    public crate = engine.addEntity()
    private model : string
    private parachuteModel: string
    private gameController: gameController
    private campaign : ClaimConfigInstType
    private campaign_key: string

    constructor(gameController: gameController,model: string, parachuteModel: string,campaign: ClaimConfigInstType, campaign_key: string) {
        this.gameController = gameController
        this.model = model
        this.parachuteModel = parachuteModel
        this.campaign  = campaign
        this.campaign_key = campaign_key
    }
    randomCrateSpawn() {
        let xDiff = stageDropArea.NE.x - stageDropArea.SW.x
        let zDiff = stageDropArea.NE.z - stageDropArea.SW.z

        let finalX = Math.random() * xDiff + stageDropArea.SW.x
        let finalZ = Math.random() * zDiff + stageDropArea.SW.z
        this.spawnCrate(
            this.model,
            this.parachuteModel,
            Vector3.create(finalX, DROP_HEIGHT, finalZ),
            this.campaign,
            this.campaign_key
        )
    }
    spawnCrate(
        model: string,
        parachuteModel: string,
        position: Vector3,
        campaign: ClaimConfigInstType,
        campaign_key: string
    ) {
        Transform.create(this.crate, {
            position: position
        })

        GltfContainer.create(this.crate, {
            src: model
        })

        let parachute = engine.addEntity()

        Transform.create(parachute, {
            position: Vector3.create(0, 1, 0),
            parent: this.crate
        })

        GltfContainer.create(parachute, {
            src: parachuteModel
        })
        PointerEvents.create(this.crate, {
            pointerEvents: [
                {
                    eventType: PointerEventType.PET_DOWN,
                    eventInfo: {
                        button: InputAction.IA_POINTER,
                        showFeedback: true,
                        hoverText:"Claim"
                    }
                }
            ]
        })
        engine.addSystem(() => {
            if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN, this.crate)) {
                this.gameController.claim.claimToken()
                Tween.createOrReplace(this.crate, {
                    mode: Tween.Mode.Scale({
                      start: Vector3.One(),
                      end: Vector3.Zero()
                    }),
                    duration: 1000,
                    easingFunction: EasingFunction.EF_EASEINBOUNCE
                  })
                
                  utils.timers.setTimeout(() => {
                    engine.removeEntity(this.crate)
                  }, 1000)
            }
        })
        this.dropCrate(this.crate, parachute, 5000)
    }
    dropCrate(crate: Entity, parachute: Entity, speed?: number) { 
        const cratePosition = Transform.get(crate).position
        raycastSystem.registerLocalDirectionRaycast(
            {
                entity: crate,
                opts: { direction: Vector3.Down(), maxDistance: 30 }
            },
            function (raycastResult) {
                console.log('hit ground at ... ', raycastResult.hits[0])
                let endPos = Vector3.Zero()
                if (raycastResult.hits && raycastResult.hits[0] && raycastResult.hits[0].position) {
                    endPos = raycastResult.hits[0].position
                } else {
                    endPos = Vector3.clone(cratePosition)
                    endPos.y = 0
                }
                Tween.create(crate, {
                    mode: Tween.Mode.Move({
                        start: cratePosition,
                        end: endPos
                    }),
                    duration: speed ? speed : 5000,
                    easingFunction: EasingFunction.EF_EASEINSINE
                })
                utils.timers.setTimeout(
                    () => {
                        Tween.create(parachute, {
                            mode: Tween.Mode.Scale({
                                start: Vector3.One(),
                                end: Vector3.Zero()
                            }),
                            duration: 1000,
                            easingFunction: EasingFunction.EF_EASEINSINE
                        })
                    },
                    speed ? speed : 5000
                )
            }
        )

    }
}