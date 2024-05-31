import * as utils from '@dcl-sdk/utils'
import { AudioSource, EasingFunction, GltfContainer, Transform, Tween, engine } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

export class Door {
    public door = engine.addEntity()
    closedState: Vector3
    openState: Vector3

    constructor(
        position: Vector3,
        rotation: Quaternion,
        model: string,
        shift: Vector3,
        speed?: number
    ) {
        if (speed === undefined) {
            speed = 1000
        }
        Transform.createOrReplace(this.door, {
            position: position,
            rotation: rotation
        })
        GltfContainer.create(this.door, { src: model })
        this.closedState = position
        this.openState = Vector3.create(
            position.x + shift.x,
            position.y + shift.y,
            position.z + shift.z
        )

        // Add toggle actions to door
        utils.toggles.addToggle(this.door, utils.ToggleState.Off, (value) => {
            if (value == utils.ToggleState.On) {
                // open
                Tween.createOrReplace(this.door, {
                    mode: Tween.Mode.Move({
                        start: this.closedState,
                        end: this.openState
                    }),
                    duration: speed,
                    easingFunction: EasingFunction.EF_EASEINSINE
                })
            } else {
                // close
                Tween.createOrReplace(this.door, {
                    mode: Tween.Mode.Move({
                        start: this.openState,
                        end: this.closedState
                    }),
                    duration: speed,
                    easingFunction: EasingFunction.EF_EASEINSINE,
                })
            }
        })

    }

    open() {
        utils.toggles.set(this.door, utils.ToggleState.On)
        // Create AudioSource component
        AudioSource.createOrReplace(this.door, {
            audioClipUrl: 'sounds/open.mp3',
            loop: false,
            playing: true,
        })
    }

    close() {
        utils.toggles.set(this.door, utils.ToggleState.Off)
        AudioSource.createOrReplace(this.door, {
            audioClipUrl: 'sounds/close.mp3',
            loop: false,
            playing: true,
        })
    }
}