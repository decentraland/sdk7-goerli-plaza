import * as utils from '@dcl-sdk/utils'
import { SceneItem, SceneItemDef } from './sceneItem'
import { Quaternion, Vector3 } from '@dcl/ecs-math'
import { Transform } from '@dcl/ecs'

export class Portal extends SceneItem {
    //entity:Entity
    static defaultCloseSpeedSeconds: number = .2
    playerCanEnter: boolean = false

    // triggerBox = new utils.TriggerBoxShape(
    //     Vector3.create(2, 5, 2)
    // )

    constructor(name: string, portalDef: SceneItemDef) {
        const visible = {
            //position: Vector3.create(55.03883743286133, .465, 32.57284927368164),//centred but close to street
            //position: Vector3.create(50.5, .65, 36.57284927368164),//centred closer to tree
            position: Vector3.create(9, 0, 2), //in front of elf
            //rotation: new Quaternion(0, 0, 0, 1),//tree
            rotation: Quaternion.Zero(),//elf
            scale: Vector3.create(1, 1, 1),
            test: 0
        }

        const hidden = {
            //position: Vector3.create(55.03883743286133, .465, 32.57284927368164),//centred but close to street
            //position: Vector3.create(50.5, 0, 36.57284927368164),//centred closer to tree
            position: Vector3.create(9, 0, 2), //in front of elf
            //rotation: new Quaternion(0, 0, 0, 1),//tree
            rotation: Quaternion.Zero(),//elf 
            scale: Vector3.One(),
            test: 0
            //scale: Vector3.create(.01, .01, .01)
        }
        super(name, hidden, visible, portalDef)
    }

    enablePlayerCanEnter(callback?: () => void) {
        console.log(this.name, "enablePlayerCanEnter")
        if (this.playerCanEnter) {
            console.log(this.name, "this.playerCanEnter already set")
            return
        }
        this.playerCanEnter = true

        const host = this

        if (utils.triggers.getTriggeredByMask(this.entity)) {
            console.log(this.name, "enablePlayerCanEnter", "already has component")
            utils.triggers.enableTrigger(this.entity, true)
        } else {
            console.log(this.name, "enablePlayerCanEnter", "adding component", Transform.get(this.entity).position, utils.triggers.getTriggeredByMask(this.entity), this.entity, this.entity.valueOf())
            //this.entity.addComponentOrReplace(new SphereShape())
            utils.triggers.addTrigger(
                this.entity,
                utils.NO_LAYERS,
                utils.LAYER_1,
                [{ type: 'box' }],
                () => {
                    console.log(host.name, 'triggered!', "playerCanEnter", host.playerCanEnter, host.entity.valueOf())
                    if (host.playerCanEnter) {
                        if (callback !== undefined) callback()
                    } else {
                        console.log(host.name, 'triggered! not enabled')
                    }
                }
            )
            console.log(this.name, "enablePlayerCanEnter", "post add component", utils.triggers.getTriggeredByMask(this.entity), this.entity, utils.triggers.isTriggerEnabled(this.entity), this.entity.valueOf())
        }
    }

    disablePlayerCanEnter() {
        if (!this.playerCanEnter) {
            console.log(this.name, "this.playerCanEnter already disabled")
            return
        }
        this.playerCanEnter = false

        if (utils.triggers.isTriggerEnabled(this.entity)) {
            //bugs all around
            utils.triggers.enableTrigger(this.entity, false)
            //bug cannot add to entity again :( wont trigger ???
            //this.entity.removeComponent(utils.TriggerComponent)//will let enabled/disabled work for now
        }
    }

    hide(force?: boolean, duration?: number, returnToIdle?: boolean, onClose?: () => void) {
        console.log(this.name, "hide")
        const closeWrapper = () => {
            console.log("closeWrapper called")
            if (onClose) onClose()
            //if(this.entity.hasComponent(GLTFShape))this.entity.getComponent(GLTFShape).visible = false
            //if(this.entity.alive) engine.removeEntity(this.entity)
        }
        super.hide(force, duration, false, closeWrapper)
    }

    close(force?: boolean, duration?: number, returnToIdle?: boolean, onClose?: () => void) {
        console.log(this.name, "vanish.close")
        //debugger
        this.hide(force, duration, returnToIdle, onClose)
        this.disablePlayerCanEnter()
        //close portal

        /*this.entity.addComponentOrReplace(
          new utils.ScaleTransformComponent( this.entity.getComponent(Transform).scale,Vector3.Zero(),duration,()=>{
            if(onPortalCloseCallback!==undefined) onPortalCloseCallback()
          } )
        )*/
    }

    showAtEndOfSegment(pos: Vector3) {
        console.log(this.name, "showAtEndOfSegment", Transform.get(this.entity).position)
        this.placeAtEndOfSegment(pos)
        this.show()
    }

    showAtStartOfSegment(pos: Vector3) {
        console.log(this.name, "showAtStartOfSegment", Transform.get(this.entity).position)
        this.placeAtEndOfSegment(pos)
        this.show()
    }
}