import { Entity, Transform, VisibilityComponent, engine, GltfContainer, Animator, PBAnimationState, TextShape } from '@dcl/ecs'
import { Vector3 } from '@dcl/ecs-math'
import { CONFIG } from '../config'
import { NpcAnimationNameDef } from '../registry'
import { turn } from '../utils/utils'
import { TransformConstructorArgs } from '../utils/utils'
import * as utils from '@dcl-sdk/utils'

export type SceneItemDef = {
    shape: string
    show?: NpcAnimationNameDef
    close?: NpcAnimationNameDef
    idle?: NpcAnimationNameDef
}

const VAULT = Vector3.create(2, CONFIG.sizeY, 2)

export class SceneItem {
    entity: Entity
    name: string
    transformHidden: TransformConstructorArgs
    transformVisible: TransformConstructorArgs
    lastKnownPos!: Vector3
    visible: boolean = false
    itemDef: SceneItemDef

    endAnimTimerId: number = -1
    intervalAnimTimerId: number = -1
    endAnimTimer: Entity
    intervalAnimTimer: Entity

    //public idleAnim: AnimationState | null = null
    public lastPlayedAnim: PBAnimationState | null = null

    openAnimation!: PBAnimationState
    idleAnimation!: PBAnimationState
    closeAnimation!: PBAnimationState

    shapeHolder: Entity
    debugHolder: Entity

    constructor(
        name: string,
        transformHiddenArgs: TransformConstructorArgs,
        transformShowArgs: TransformConstructorArgs,
        itemDef: SceneItemDef,
        parent?: Entity
    ) {
        this.entity = engine.addEntity() // TODO: add name to entity
        VisibilityComponent.create(this.entity, { visible: true })
        this.itemDef = itemDef
        //if (parent !== null && parent !== undefined) this.setParent(parent)
        this.name = name

        this.transformHidden = transformHiddenArgs
        this.transformVisible = transformShowArgs

        Transform.createOrReplace(this.entity, transformHiddenArgs)

        if (parent !== null && parent !== undefined) Transform.getMutable(this.entity).parent = parent

        this.endAnimTimer = engine.addEntity()

        this.intervalAnimTimer = engine.addEntity()

        const shapeHolder = this.shapeHolder = engine.addEntity() // new Entity(this.name + "." + "shape")
        Transform.create(shapeHolder, { position: Vector3.Zero() })
        Transform.getMutable(shapeHolder).parent = this.entity

        const debugHolder = this.debugHolder = engine.addEntity() // new Entity(this.name + "." + "debug")
        Transform.create(debugHolder, { position: Vector3.create(0, 1, 0) })

        if (CONFIG.DEBUG_2D_PANEL_ENABLED) {//switch to 3d flag if exists?2d vs 3d debug flags
            TextShape.create(debugHolder, {
                text: this.name,
                fontSize: 10
            })
            Transform.getMutable(debugHolder).parent = this.entity
        }

        if (this.itemDef.shape !== undefined) {
            GltfContainer.create(shapeHolder, {
                src: this.itemDef.shape
            })

            Animator.create(shapeHolder)
            const animator = Animator.getMutable(shapeHolder)

            if (this.itemDef.idle !== undefined) {
                const idleAnim = {
                    clip: this.itemDef.idle.name,
                    playing: false,
                    loop: true
                }

                animator.states.push(idleAnim)
                this.idleAnimation = Animator.getClip(shapeHolder, itemDef.idle?.name || '')
            }

            if (this.itemDef.show !== undefined) {
                const openAnim = {
                    clip: this.itemDef.show.name,
                    playing: false,
                    loop: false
                }
                animator.states.push(openAnim)
                this.openAnimation = Animator.getClip(shapeHolder, itemDef.show?.name || '')

                if (this.itemDef.show.autoStart !== undefined && this.itemDef.show.autoStart == true) {
                    this.openAnimation.playing = true
                    this.openAnimation.playing = false
                }
            }

            if (this.itemDef.close !== undefined) {
                const closeAnim = {
                    clip: this.itemDef.close.name,
                    playing: false,
                    loop: false
                }
                animator.states.push(closeAnim)
                this.closeAnimation = Animator.getClip(shapeHolder, itemDef.close?.name || '')
            }

            if (this.itemDef.idle !== undefined && this.itemDef.idle.autoStart !== undefined && this.itemDef.idle.autoStart == true) {
                this.idleAnimation.playing = true
            }
        }
    }

    placeAtEndOfSegment(pos: Vector3) {
        const thisTransform = Transform.getMutable(this.entity)
        console.log("showAnimation.placeAtEndOfSegment from", thisTransform.position, "to", pos)
        const oldHeight = thisTransform.position.y
        thisTransform.position = Vector3.clone(pos)
        thisTransform.position.y = oldHeight

        const vY = this.transformVisible.position.y
        const hY = this.transformHidden.position.y

        this.transformVisible.position = Vector3.create(pos.x, vY, pos.z)
        this.transformHidden.position = Vector3.create(pos.x, hY, pos.z)

        this.lastKnownPos = Vector3.clone(thisTransform.position)
    }

    lookAt(vec: Vector3) {
        turn(this.entity, vec)
    }

    show(duration: number = 1, onOpen?: () => void) {
        //console.log("play.show",this.entity.getComponent(Transform).position)
        if (this.visible) {
            //console.log(this.name," already visible","transform",this.entity.getComponent(Transform),"alive",this.entity.alive,"visible",this.shapeHolder.getComponent(GLTFShape).visible)
            return
        }

        VisibilityComponent.getMutable(this.entity).visible = true
        this.visible = true

        console.log(this.name, "show.called", this.transformHidden.scale,
            this.transformVisible.scale,
            duration,)

        this.showAnimation(duration, onOpen)
    }

    playIdleAnimation() {
        console.log("play.playIdleAnimation")
        // if (this.lastPlayedAnim) {
        //   this.lastPlayedAnim.stop()
        // } 

        VisibilityComponent.getMutable(this.entity).visible = true

        if (this.openAnimation !== undefined) {
            this.openAnimation.playing = false
        }
        if (this.idleAnimation !== undefined) {
            this.idleAnimation.playing = true
            this.lastPlayedAnim = this.idleAnimation
        }
        console.log("play.playIdleAnimation", Transform.get(this.entity).position)
    }

    showAnimation(duration: number = 1, onOpen?: () => void) {
        if (this.openAnimation === undefined) {
            if (this.lastKnownPos !== undefined) Vector3.copyFrom(this.lastKnownPos, Transform.getMutable(this.entity).position)
            const thisTransform = Transform.get(this.entity)
            console.log("showAnimation starting from", thisTransform.position, "to", this.transformVisible.position)
            utils.tweens.startScaling(
                this.entity,
                thisTransform.scale,
                this.transformVisible.scale || thisTransform.scale,
                duration,
                utils.InterpolationType.EASEOUTEXPO
            )
            utils.tweens.startTranslation(
                this.entity,
                thisTransform.position,
                this.transformVisible.position || thisTransform.position,
                duration,
                utils.InterpolationType.EASEOUTEBOUNCE
            )
        } else {
            if (this.itemDef.show !== undefined) {
                this.playAnimation(this.itemDef.show.name, true, this.itemDef.show.duration, undefined, undefined, true)
            } else {
                //this.openAnimation.reset()
                //engine.removeEntity(this.entity)
            }
        }
    }
    /**
     * 
     * @param animationName 
     * @param noLoop 
     * @param duration 
     * @param speed 
     * @param interval 
     * @param resetAnim (optional defaults:true) resets the animation before playing. if it was paused dont reset 
     *  makes sense to  only finish out the animation if anim loop=false and did not get to the end before next play 
     *  it will only finish  out the rest of the loop which could be .01 seconds or 5 seconds
     */
    playAnimation(
        animationName: string,
        noLoop?: boolean,
        duration?: number,
        speed?: number,
        interval?: number,
        resetAnim?: boolean,
        weight?: number,
        returnToIdle?: boolean,
        onDurationEnd?: () => void
    ) {
        console.log(this.name, "play.playAnimation called", "animationName", animationName, "noLoop", noLoop, "duration", duration, "resetAnim", resetAnim, "returnToIdle", returnToIdle)
        // if (this.lastPlayedAnim) {
        //   this.lastPlayedAnim.stop()
        // }

        utils.timers.clearInterval(this.endAnimTimerId)
        utils.timers.clearInterval(this.intervalAnimTimerId)

        if (GltfContainer.get(this.shapeHolder)) {
            VisibilityComponent.getMutable(this.entity).visible = true
        } else if (!GltfContainer.get(this.shapeHolder)) {
            console.log(this.name, "play.playAnimation WARN", "has no GLTFShape", "noLoop", noLoop, "duration", duration, "resetAnim", resetAnim)
        }

        const animator = Animator.get(this.shapeHolder)

        let newAnim = Animator.getClip(this.shapeHolder, animationName)
        if (weight) newAnim.weight = weight

        //console.log("resetting ",newAnim)
        const resetAnimation = resetAnim === undefined || resetAnim
        if (resetAnimation) {
            //console.log("resetting ",newAnim)
            newAnim.shouldReset = true
            newAnim.playing = false
        }

        if (speed) {
            newAnim.speed = speed
        } else {
            newAnim.speed = 1
        }

        if (noLoop) {
            newAnim.loop = false
        } else {
            newAnim.loop = true
        }
        if (noLoop) {
            if (interval && duration) {
                playOnceAndIdle(this, newAnim, duration, resetAnimation, returnToIdle, onDurationEnd)
                this.intervalAnimTimerId = utils.timers.setInterval(() => {
                    playOnceAndIdle(this, newAnim, duration, undefined, returnToIdle, onDurationEnd)

                }, interval * 1000)
            } else if (duration) {
                // play once & idle
                playOnceAndIdle(this, newAnim, duration, resetAnimation, returnToIdle, onDurationEnd)
            } else {
                // play once and stay on last frame
                newAnim.loop = false
                //console.log("playAnimation playing and not calling reset ",newAnim)
                newAnim.shouldReset = resetAnimation
                newAnim.playing = true
                this.lastPlayedAnim = newAnim
            }
        } else {
            newAnim.loop = true
            //   newAnim.stop()
            //console.log("playing with reset ",newAnim)
            newAnim.shouldReset = resetAnimation
            newAnim.playing = true

            handlePlayDuration(this, newAnim, duration, returnToIdle, onDurationEnd)

            this.lastPlayedAnim = newAnim
        }
    }
    /**
     * 
     * @param ent 
     * @param anim 
     * @param duration 
     * @param resetAnim (optional defaults:true)  resets the animation before playing. if it was paused dont reset makes sense to 
     *  only finish out the animation if anim loop=false and did not get to the end before next play it will only finish 
     *  out the rest of the loop which could be .01 seconds or 5 seconds
     */

    hide(force?: boolean, duration: number = 1, returnToIdle?: boolean, onClose?: () => void) {
        console.log(this.name, " hide ENTRY")
        const _force = force === undefined || (force !== undefined && force == true)
        if (!_force && !this.visible) {
            console.log(this.name, " already hidden")
            return
        }

        VisibilityComponent.getMutable(this.entity).visible = false
        this.visible = false

        this.hideAnimation(duration, returnToIdle, onClose)
    }

    hideAnimation(duration: number = 1, returnToIdle?: boolean, onClose?: () => void) {
        console.log(this.name, " hideAnimation ENTRY")

        const thisTransform = Transform.get(this.entity)
        this.lastKnownPos = Vector3.clone(thisTransform.position)
        if (this.openAnimation === undefined) {
            utils.tweens.startScaling(
                this.entity,
                thisTransform.scale,
                this.transformHidden.scale,
                duration,
                utils.InterpolationType.EASEINEXPO,
                () => {
                    if (onClose !== undefined) onClose()
                }
            )
            utils.tweens.startTranslation(
                this.entity,
                thisTransform.position,
                this.transformHidden.position,
                duration,
                utils.InterpolationType.LINEAR,
                () => {
                    console.log("reached", this.transformHidden.position)
                    //this.shapeHolder.getComponent(Transform).position.y = -1
                    //broke portals
                    //this.entity.getComponent(Transform).position.copyFrom(VAULT)//cannot make negative, so move far away
                }
            )
        } else {
            if (this.itemDef.close !== undefined) {
                console.log("hideAnimation.closeWrapper.this.openAnimation.reset()")
                this.openAnimation.shouldReset = true

                let newAnim = Animator.getClip(this.shapeHolder, this.itemDef.close.name)
                if (!newAnim.playing && (this.lastPlayedAnim === undefined || this.lastPlayedAnim !== newAnim)) {
                    console.log(this.name, " hideAnimation.play", this.itemDef.close.name, this.lastPlayedAnim?.clip)
                    this.playAnimation(this.itemDef.close.name, true, this.itemDef.close.duration, undefined, undefined, true, undefined, returnToIdle, onClose)
                } else {
                    console.log(this.name, " hideAnimation.play.already.playing", this.itemDef.close.name, this.lastPlayedAnim?.clip)
                }
            } else {
                if (this.openAnimation !== undefined) {
                    this.openAnimation.playing = false
                }
                // VisibilityComponent.getMutable(this.entity).visible = false
            }
        }
    }
}

function playOnceAndIdle(
    ent: SceneItem,
    anim: PBAnimationState,
    duration: number,
    resetAnim?: boolean,
    returnToIdle?: boolean,
    onDurationEnd?: () => void
) {
    //   if (ent.lastPlayedAnim) {
    //     ent.lastPlayedAnim.stop()
    //   }

    //anim.looping = false
    console.log("play.playOnceAndIdle called ", anim)
    if (resetAnim) anim.playing = false
    anim.shouldReset = resetAnim
    anim.playing = true
    ent.lastPlayedAnim = anim
    handlePlayDuration(ent, anim, duration, returnToIdle, onDurationEnd)
}

function handlePlayDuration(ent: SceneItem, anim: PBAnimationState, duration?: number, returnToIdle?: boolean, onDurationEnd?: () => void) {
    console.log("play.handlePlayDuration called ", anim)
    if (duration) {
        ent.endAnimTimerId = utils.timers.setTimeout(() => {
            anim.playing = false //do not call stop as it resets the animation, let on play do that if they want it
            if (onDurationEnd !== undefined) onDurationEnd()
            if ((returnToIdle === undefined || (returnToIdle !== undefined && returnToIdle === true)) && ent.idleAnimation) {
                ent.idleAnimation.playing = true
                ent.lastPlayedAnim = ent.idleAnimation
            }
        }, duration * 1000)
    }
}