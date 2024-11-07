/**
 * Component to rotate entity indefinitely until stop is called
 * @public
 */

import { Schemas, TransformType, engine } from "@dcl/sdk/ecs"


export const keepFloatingComponentDefault = {
    finished: false,
    elapsed: 0,
    speed: 1,
    amplitude: 5,
    defaultY: 1
}

export const KeepFloatingComponent = engine.defineComponent(
    "keepFloatingComponent", {
    // onFinishCallback?: () => void

    //private rotationVelocity: Quaternion
    //private rotation: Quaternion
    finished: Schemas.Boolean,
    elapsed: Schemas.Number,
    speed: Schemas.Number,
    amplitude: Schemas.Number,
    defaultY: Schemas.Number

    /**
     *
     * @param _amplitude
     * @param _speed - how fast to do one full float (up then down) per second
     * @param _defaultY - where to start
     * @param onFinishCallback
     */
    // constructor(
    //     _amplitude: number,
    //     _speed: number,
    //     _defaultY?: number,
    //     onFinishCallback?: () => void
    // ) {
    //     this.amplitude = _amplitude
    //     this.defaultY = _defaultY ? _defaultY : 0
    //     this.speed = _speed

    //     this.onFinishCallback = onFinishCallback

    //     this.finished = false

    //     engine.addSystem(this.update)
    // }

    // update(dt: number): void {
    //     //const transform = obj.getComponent(Transform)
    //     //const floatInfo = obj.getComponent(KeepFloatingComponent)

    //     this.elapsed += dt * ((1 / this.speed) * Math.PI) * 2
    //     /*
    //      this.rotation = Quaternion.Slerp(
    //        Quaternion.Identity,
    //        this.rotationVelocity,
    //        dt
    //      )*/
    // }

    // hasFinished(): boolean {
    //     return this.finished
    // }

    // assignValueToTransform(transform: TransformType): void {
    //     transform.position.y =
    //         this.defaultY + Math.sin(this.elapsed) * this.amplitude
    // }

    // stop() {
    //     this.finished = true
    // }
}
)