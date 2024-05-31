import { AudioSource, GltfContainer, InputAction, MeshCollider, PointerEventType, PointerEvents, Transform, engine, inputSystem } from "@dcl/sdk/ecs";
import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { openDialogWindow } from "dcl-npc-toolkit";
import { GameController } from "../game.controller";
import { Siren } from "./Siren";
import { playerIsTraitor } from "./SpaceShip";

let firstFix: boolean = true
export class Equipment {
    private equipment = engine.addEntity()
    broken: boolean = false
    id: number
    siren: Siren
    changeListener: (state: boolean) => void
    gameController: GameController
    constructor(
        id: number, position: Vector3, rotation: Quaternion,
        changeListener: (state: boolean) => void, startBroken: boolean,
        gameController: GameController) {
        this.gameController = gameController
        this.id = id
        this.changeListener = changeListener
        Transform.createOrReplace(this.equipment, { position: position, rotation: rotation })
        GltfContainer.createOrReplace(this.equipment, { src: 'models/TerminalWall.glb' })
        this.siren = new Siren(this.equipment,
            Vector3.create(0.5, 1.6, 0),
            Quaternion.fromEulerDegrees(0, 0, 90),
        )

        console.log('start broken' + startBroken)
        PointerEvents.createOrReplace(this.equipment, {
            pointerEvents: [
                {
                    eventType: PointerEventType.PET_DOWN,
                    eventInfo: {
                        button: InputAction.IA_POINTER,
                        showFeedback: true,
                        hoverText: playerIsTraitor ? 'Human stuff' : 'Fix',
                        maxDistance: 4,
                    }
                }
            ]
        })
        MeshCollider.setBox(this.equipment)

        
        this.changeListener(startBroken)
        engine.addSystem(() => {
            if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN, this.equipment)) {
                this.gameController.miniGameMachine.setOnWinCallback(() => {
                    console.log('on win call backkkk');
                    this.changeListener(false);
                    if (firstFix) {
                        firstFix = false;
                        openDialogWindow(this.gameController.ui.satelliteUI, this.gameController.dialogs.MissionControlTips, 'firstFix');
                    }
                });
                if (this.broken) {
                    if (playerIsTraitor) {
                        openDialogWindow(this.gameController.ui.robotUI, this.gameController.dialogs.EvilRobotTips, 1)
                        return
                    }
                    this.gameController.miniGameMachine.Start()
                    console.log('open minigame',this.id)
                } else {
                    console.log('Already fixed')
                }
            }
        })
    }
    alterState(isBroken: boolean) {
        this.broken = isBroken
        this.siren.toggle(this.broken)
        if (!isBroken) {
            AudioSource.createOrReplace(this.equipment, {
                audioClipUrl: 'sounds/console.mp3',
                loop: false,
                playing: true,
            })
            AudioSource.playSound(this.equipment, 'sounds/console.mp3')
        }
    }

    reset() {
        this.alterState(true)
    }
}