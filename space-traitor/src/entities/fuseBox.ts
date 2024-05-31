import { Animator, AudioSource, Entity, GltfContainer, InputAction, MeshCollider, PointerEventType, PointerEvents, Schemas, Transform, engine, inputSystem } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { Room } from "colyseus.js"

export enum CableColors {
    Blue,
    Green,
    Red,
}
const CableBox = engine.defineComponent(
    "org.decentraland.CableBox",
    {
        redCableCut: Schemas.Boolean,
        greenCableCut: Schemas.Boolean,
        blueCableCut: Schemas.Boolean,
        doorOpen: Schemas.Boolean,
    }
)


export class FuseBox {
    public fusebox = engine.addEntity()
    id: number
    redCable: Entity
    blueCable: Entity
    greenCable: Entity
    public room: Room
    constructor(
        id: number,
        position: Vector3,
        rotation: Quaternion,
        room: Room
    ) {
        this.id = id
        this.room = room
        Transform.create(this.fusebox, {
            position: position,
            rotation: rotation
        })
        CableBox.create(this.fusebox, {
            redCableCut: false,
            greenCableCut: false,
            blueCableCut: false,
            doorOpen: false,
        })
        Animator.create(this.fusebox, {
            states: [{
                clip: 'open',
                playing: false,
                loop: false,
            },
            {
                clip: 'close',
                playing: false,
                loop: false,
            }
            ]
        })
        GltfContainer.create(this.fusebox, { src: 'models/Cable_Box.glb' })
        PointerEvents.create(this.fusebox, {
            pointerEvents: [
                {
                    eventType: PointerEventType.PET_DOWN,
                    eventInfo: {
                        button: InputAction.IA_POINTER,
                        showFeedback: true,
                        hoverText: 'Open/Close',
                        maxDistance: 4
                    }
                }
            ]
        })
        let boxState = CableBox.getMutable(this.fusebox)
        engine.addSystem(() => {
            if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN, this.fusebox)) {
                let data: SceneMessageFuseChange
                if (boxState.doorOpen) {
                    data = {
                        msg: 'fuseChange',
                        id: this.id,
                        doorOpen: false,
                    }
                    boxState.doorOpen = false
                    Animator.playSingleAnimation(this.fusebox, 'close')
                } else {
                    data = {
                        msg: 'fuseChange',
                        id: this.id,
                        doorOpen: true,
                    }
                    boxState.doorOpen = true
                    Animator.playSingleAnimation(this.fusebox, 'open')
                }
                console.log('door open or close?' + boxState.doorOpen)
                room.send('client', data satisfies SceneMessageFuseChange)
            }
        })
        this.redCable = engine.addEntity()


        Transform.createOrReplace(this.redCable, {
            parent: this.fusebox,
        })
        Transform.getMutable(this.redCable).position.x = -0.21
        Transform.getMutable(this.redCable).position.y = 0.15
        Transform.getMutable(this.redCable).position.z = -0.25

        Animator.create(this.redCable, {
            states: [{
                clip: 'CableRedAction',
                playing: false,
                loop: false,
            }
            ]
        })
        GltfContainer.create(this.redCable, { src: 'models/RedCable.glb' })
        PointerEvents.create(this.redCable, {
            pointerEvents: [
                {
                    eventType: PointerEventType.PET_DOWN,
                    eventInfo: {
                        button: InputAction.IA_POINTER,
                        showFeedback: true,
                        hoverText: 'Cut Red',
                        maxDistance: 4,
                    }
                }
            ]
        })

        engine.addSystem(() => {
            if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN, this.redCable)) {
                if (!boxState.doorOpen || boxState.redCableCut) return
                Animator.playSingleAnimation(this.redCable, 'CableRedAction')
                room.send('client', {
                    msg: 'fuseChange',
                    id: this.id,
                    redCut: true,
                } satisfies SceneMessageFuseChange)
            }
        })


        this.greenCable = engine.addEntity()
        Transform.createOrReplace(this.greenCable, {
            parent: this.fusebox,
        })
        Transform.getMutable(this.greenCable).position.x = 0
        Transform.getMutable(this.greenCable).position.y = 0.15
        Transform.getMutable(this.greenCable).position.z = -0.25


        Animator.create(this.greenCable, {
            states: [{
                clip: 'CableGreenAction',
                playing: false,
                loop: false,
            }
            ]
        })
        GltfContainer.create(this.greenCable, { src: 'models/GreenCable.glb' })
        PointerEvents.create(this.greenCable, {
            pointerEvents: [
                {
                    eventType: PointerEventType.PET_DOWN,
                    eventInfo: {
                        button: InputAction.IA_POINTER,
                        showFeedback: true,
                        hoverText: 'Cut Green',
                        maxDistance: 4,
                    }
                }
            ]
        })


        engine.addSystem(() => {
            if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN, this.greenCable)) {
                if (!boxState.doorOpen || boxState.greenCableCut) return
                Animator.playSingleAnimation(this.greenCable, 'CableGreenAction')
                room.send('client', {
                    msg: 'fuseChange',
                    id: this.id,
                    greenCut: true,
                } satisfies SceneMessageFuseChange)
            }
        })
        this.blueCable = engine.addEntity()
        Transform.createOrReplace(this.blueCable, {
            parent: this.fusebox,
        })
        Transform.getMutable(this.blueCable).position.x = 0.21
        Transform.getMutable(this.blueCable).position.y = 0.15
        Transform.getMutable(this.blueCable).position.z = -0.25

        Animator.create(this.blueCable, {
            states: [{
                clip: 'CableBlueAction',
                playing: false,
                loop: false,
            }
            ]
        })
        GltfContainer.create(this.blueCable, { src: 'models/BlueCable.glb' })
        PointerEvents.create(this.blueCable, {
            pointerEvents: [
                {
                    eventType: PointerEventType.PET_DOWN,
                    eventInfo: {
                        button: InputAction.IA_POINTER,
                        showFeedback: true,
                        hoverText: 'Cut Blue',
                        maxDistance: 4,
                    }
                }
            ]
        })

        engine.addSystem(() => {
            if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN, this.blueCable)) {
                if (!boxState.doorOpen || boxState.blueCableCut) return
                Animator.playSingleAnimation(this.blueCable, 'CableBlueAction')
                room.send('client', {
                    msg: 'fuseChange',
                    id: this.id,
                    blueCut: true,
                } satisfies SceneMessageFuseChange)
            }
        })

        Animator.stopAllAnimations(this.redCable, true)
        Animator.stopAllAnimations(this.greenCable, true)
        Animator.stopAllAnimations(this.blueCable, true)

        CableBox.getMutable(this.fusebox).redCableCut = false
        CableBox.getMutable(this.fusebox).greenCableCut = false
        CableBox.getMutable(this.fusebox).blueCableCut = false
        CableBox.getMutable(this.fusebox).doorOpen = false

        MeshCollider.setSphere(this.redCable,)
        MeshCollider.setSphere(this.greenCable)
        MeshCollider.setSphere(this.blueCable)
        return
    }

    reset() {
        Animator.stopAllAnimations(this.redCable, true)
        Animator.stopAllAnimations(this.greenCable, true)
        Animator.stopAllAnimations(this.blueCable, true)
        Animator.stopAllAnimations(this.fusebox, true)

        CableBox.getMutable(this.fusebox).redCableCut = false
        CableBox.getMutable(this.fusebox).greenCableCut = false
        CableBox.getMutable(this.fusebox).blueCableCut = false
        CableBox.getMutable(this.fusebox).doorOpen = false
    }
}
export function toggleBox(entity: FuseBox, value: boolean, playSound = true) {

    let boxState = CableBox.getMutable(entity.fusebox)
    if (boxState.doorOpen === value) return

    if (playSound) {
        const audioClipUrl = value ? 'sounds/OpenChest.mp3' : 'sounds/CloseChest.mp3';
        AudioSource.createOrReplace(entity.fusebox, {
            audioClipUrl: audioClipUrl,
            loop: false,
            playing: true
        });
    }

    Animator.getMutable(entity.fusebox)
    Animator.createOrReplace(entity.fusebox, {
        states: [{
            clip: 'open',
            playing: true,
            loop: false,
        }, {
            clip: 'close',
            playing: true,
            loop: false,
        }

        ]
    })

    const clip = value ? 'open' : 'close'
    Animator.playSingleAnimation(entity.fusebox, clip)

    boxState.doorOpen = value
    console.log("THE METHOD WAS RUN FULLY")
}

export function toggleCable(
    entity: FuseBox,
    value: boolean,
    color: CableColors
) {
    let boxState = CableBox.getMutable(entity.fusebox)
    let redCableClip = Animator.getMutable(entity.redCable).states
    let greenCableClip = Animator.getMutable(entity.greenCable).states
    let blueCableClip = Animator.getMutable(entity.blueCable).states

    switch (color) {
        case CableColors.Red:
            redCableClip
            boxState.redCableCut = value
            if (value == true) {
                Animator.playSingleAnimation(entity.redCable, 'CableRedAction')
            } else {
                Animator.stopAllAnimations(entity.redCable, true)
                Animator.stopAllAnimations(entity.greenCable, true)
                Animator.stopAllAnimations(entity.blueCable, true)
            }
            break

        case CableColors.Green:
            greenCableClip
            boxState.greenCableCut = value
            if (value == true) {
                Animator.playSingleAnimation(entity.greenCable, 'CableGreenAction')
            } else {
                Animator.stopAllAnimations(entity.redCable, true)
                Animator.stopAllAnimations(entity.greenCable, true)
                Animator.stopAllAnimations(entity.blueCable, true)
            }
            break

        case CableColors.Blue:
            blueCableClip
            boxState.blueCableCut = value
            if (value == true) {
                Animator.playSingleAnimation(entity.blueCable, 'CableBlueAction')
            } else {
                Animator.stopAllAnimations(entity.redCable, true)
                Animator.stopAllAnimations(entity.greenCable, true)
                Animator.stopAllAnimations(entity.blueCable, true)
            }
            break
    }
}