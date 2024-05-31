import { GltfContainer, Transform, engine } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { Room } from "colyseus.js"
import { movePlayerTo } from "~system/RestrictedActions"
import { GameController } from "../game.controller"
import { Button } from "./Button"
import { Equipment } from "./equipment"

type EquiptmentData = {
    position: Vector3
    rotation: Quaternion
    scale?: Vector3
    startBroken: boolean
}

let equiptMentList: EquiptmentData[] = [
    {
        position: Vector3.create(15.2, 1, 19),
        startBroken: true,
        rotation: {
            x: 0,
            y: 0,
            z: 0,
            w: 0
        }
    },
    {
        position: Vector3.create(24, 1, 7.2),
        rotation: Quaternion.fromEulerDegrees(0, 270, 0),
        startBroken: true,
    },
    {
        position: Vector3.create(12, 1, 33),
        rotation: Quaternion.fromEulerDegrees(0, 90, 0),
        startBroken: true,
    },
    {
        position: Vector3.create(36.4, 1, 31.2),
        rotation: Quaternion.fromEulerDegrees(0, 270, 0),
        startBroken: true,
    },
    {
        position: Vector3.create(25, 1, 12),
        rotation: Quaternion.fromEulerDegrees(0, 180, 0),
        startBroken: true,
    },
    {
        position: Vector3.create(35, 1, 0.9),
        rotation: Quaternion.fromEulerDegrees(0, 90, 0),
        startBroken: true,
    },
    {
        position: Vector3.create(21.5, 5.3, 8.9),
        rotation: Quaternion.fromEulerDegrees(0, 90, 0),
        startBroken: true,
    },
    {
        position: Vector3.create(36.4, 1, 39.4),
        rotation: Quaternion.fromEulerDegrees(0, 270, 0),
        startBroken: true,
    },
]


export class SpaceShip {
    public toFix: Equipment[] = []
    public active: boolean = false
    public timeLeft: number = 0
    public room: Room
    public gameController: GameController
    constructor(room: Room, gameController: GameController) {
        this.room = room
        this.gameController = gameController
        for (let i = 0; i < equiptMentList.length; i++) {
            let eq = new Equipment(
                i,
                equiptMentList[i].position,
                equiptMentList[i].rotation,
                (state) => {
                    let data: SceneMessageEquiptmentChange = {
                        msg: 'equiptmentChange',
                        id: i,
                        broken: state,
                    }
                    room.send('client', data satisfies SceneMessageEquiptmentChange)
                },
                equiptMentList[i].startBroken,
                this.gameController
            )
            console.log('equipment created', i, equiptMentList.length)
            this.toFix.push(eq)
        }

        let buttonPedestal = engine.addEntity()
        Transform.createOrReplace(buttonPedestal, {
            position: Vector3.create(24, 0, 18),
            rotation: Quaternion.fromEulerDegrees(0, 90, 0),
            scale: Vector3.create(1.5, 1.5, 1.5),
        })
        GltfContainer.createOrReplace(buttonPedestal, { src: 'models/Pedestal.glb' })

        let panicButton = new Button('models/Danger_SciFi_Button.glb',
            () => {
                room.send('client', { msg: 'startvote' } satisfies SceneMessageStartVote)
            },
            'Emergency Meeting',
            Vector3.create(24, 1.5, 18.1),
            Quaternion.fromEulerDegrees(0, 90, 30),
            Vector3.create(1.5, 1.5, 1.5)
        )
        return
    }

    reactToSingleChanges(change: SceneMessageEquiptmentChange): void {
        console.log('reacting to single change ', change)
        this.toFix[change.id].alterState(change.broken)
    }


    resetShip(): void {
        movePlayerTo({
            newRelativePosition: Vector3.create(1, 0, 1),
            cameraTarget: Vector3.create(8, 1, 8)
        })
        for (let i = 0; i < this.toFix.length; i++) {
            this.toFix[i].reset()
        }
    }
}

export let playerIsTraitor: boolean = false
export let playerIsAlive: boolean = true

export function setPlayerIsTraitor(value: boolean) {
    playerIsTraitor = value
}

export function setPlayerIsAlive(value: boolean) {
    playerIsAlive = value
}