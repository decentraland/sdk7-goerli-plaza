import * as utils from '@dcl-sdk/utils'
import { SceneItem } from './sceneItem'
import { Entity, Transform, engine, PBAnimationState, MeshRenderer, pointerEventsSystem, InputAction } from '@dcl/ecs'
import { Quaternion, Vector3 } from '@dcl/ecs-math'
import { turn } from '../utils/utils'
import { KeepFloatingComponent, keepFloatingComponentDefault } from '../utils/keepFloatingComponent'
import { TransformConstructorArgs } from '../utils/utils'


const GIFT_SHAPE = 'models/Loot.glb'
/*
const entityTest= new Entity()
entityTest.addComponent(GIFT_SHAPE)
entityTest.addComponent(new Transform({
  position: new Vector3(2,1,2)
}))
engine.addEntity(entityTest)*/

export class GrandGiftBox extends SceneItem {
    giftboxOpen: PBAnimationState
    giftboxIdle: PBAnimationState
    opened: boolean = false
    redeemable: boolean = false
    claimTokenReady: boolean = false
    claimInformedPending: boolean = false
    glasses: Entity
    glassesCollider: Entity
    glassesSound: Entity
    triumphClip = 'sounds/openBox.mp3'
    starIdleClip = 'sounds/star-idle.mp3'
    floatUp: boolean = true
    //claimSound = new AudioClip('sounds/achievement_04.mp3')

    constructor(
        name: string,
        transformHiddenArgs: TransformConstructorArgs,
        transformShowArgs: TransformConstructorArgs,
        parent?: Entity
    ) {
        super(name, transformHiddenArgs, transformShowArgs, {
            shape: GIFT_SHAPE,
            //show:{name:"Loot_Spawn",duration:10}, 
            idle: { name: "Loot_Loop", duration: -1, autoStart: true },
            close: undefined
        }, parent)

        this.giftboxOpen = this.openAnimation
        this.giftboxIdle = this.idleAnimation
        //giftBox.addComponent(new BoxShape())

        this.glasses = engine.addEntity()
        Transform.create(this.glasses, {
            position: Vector3.create(0, -6, 0),
            scale: Vector3.create(4, 4, 4),
            parent: this.entity
        })

        //make glasses clickable
        let cube = this.glassesCollider = engine.addEntity()
        const smaller = .04
        Transform.create(cube, {
            position: Vector3.create(0, 1.85, 0),
            scale: Vector3.create(.2 - smaller, .2 - smaller, .2 - smaller),
            parent: this.glasses
        })
        MeshRenderer.setBox(cube)
        //make visible if for some reason loot not showing
        //cube.addComponent(RESOURCES.materials.transparent)

        this.glassesSound = engine.addEntity()
        Transform.create(this.glassesSound, {
            parent: this.glasses
        })
        //this.glasses.addComponent(new BoxShape())
    }

    showOpened() {
        const host = this.entity

        this.giftboxOpen.speed = 10 //get to end fast
        this.giftboxOpen.shouldReset = false
        this.giftboxOpen.playing = true

        this.redeemable = false
        this.opened = true
        debugger
        pointerEventsSystem.removeOnPointerDown(host)
    }

    hide(force?: boolean, duration: number = .2, returnToIdle?: boolean) {
        this.redeemable = false

        super.hide(force, duration, returnToIdle)
        // engine.removeSystem(this.update)
        if (!this.visible) {
            console.log(this.name, " already hidden")
            return
        }
    }

    //override to keep level
    lookAt(vec: Vector3) {
        const t = Transform.getMutable(this.entity)
        turn(this.entity, vec)
        const rot = t.rotation
        console.log("lookAt", rot, Quaternion.toEulerAngles(rot))
        t.rotation = Quaternion.fromEulerDegrees(0, Quaternion.toEulerAngles(rot).y, 0)
    }

    show() {
        const host = this

        this.redeemable = true

        if (!this.visible) {
            this.lookAt(Transform.get(engine.CameraEntity).position)
        }
        super.show(.5)

        // Rotating
        utils.perpetualMotions.startRotation(this.entity, Quaternion.fromEulerDegrees(0, -8, 0))

        // Floating
        utils.tweens.stopTranslation(this.entity)
        this.switchFloat()
        // const keepf = keepFloatingComponentDefault
        // keepf.amplitude = 0.05
        // keepf.speed = 3
        // keepf.defaultY = 0
        // KeepFloatingComponent.createOrReplace(this.entity, keepf)

        // engine.addSystem(this.update)
        // let showWearable = false
        this.addOnClickClaim()
    }

    switchFloat() {
        const pos = Transform.get(this.entity).position
        const startPos = Vector3.create(pos.x, this.floatUp ? 0 : 1, pos.z)
        const endPos = Vector3.create(pos.x, this.floatUp ? 1 : 0, pos.z)
        utils.tweens.startTranslation(this.entity, startPos, endPos, 1, utils.InterpolationType.EASEOUTQUAD, () => {
            this.floatUp = !this.floatUp
            this.switchFloat()
        })
    }

    showClaimPrompt() {
        const METHOD_NAME = "showClaimPrompt"
        console.log(METHOD_NAME, "ENTRY", "this.claimTokenReady", "this.claimInformedPending", this.claimTokenReady)
        const host = this

        if (this.claimTokenReady) {

            host.opened = true
        }
    }

    addOnClickClaim() {
        // const host = this
        pointerEventsSystem.onPointerDown(
            {
                entity: this.glassesCollider,
                opts: {
                    button: InputAction.IA_PRIMARY,
                    hoverText: 'Open'
                }
            },
            () => {
                const TEST_SUCCESS = true
                //isClaimJsonSuccess() ||
                if (TEST_SUCCESS) {
                    this.showClaimPrompt()
                }
            }
        )
    }

    // update(dt: number): void {
    //     // Update keep floating component
    //     const keepFloat = KeepFloatingComponent.getMutable(this.entity)
    //     if (keepFloat) {
    //         keepFloat.elapsed += dt * ((1 / keepFloat.speed) * Math.PI) * 2
    //     }
    // }
}