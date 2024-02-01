import { Entity, Transform, engine } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'
import { Callback } from '@dcl/sdk/react-ecs'
import { UIAnimator } from './UIAnimation'

// Use IAction to define action for scaling

export class MoveScaleAction implements utils.actions.IAction {
  hasFinished: boolean = false
  entityScale: Entity
  entityTransform: Entity
  animator: UIAnimator
  scaleTarget: Vector3
  positionTarget: Vector3
  duration: number = 1
  interpolationType: utils.InterpolationType = utils.InterpolationType.EASEINQUAD

  constructor(
    // entityScale: Entity,
    // entityTransform: Entity,
    uiAnimator: UIAnimator,
    nextPosX: number,
    nextPosY: number,
    nextScaleX: number,
    nextScaleY: number,
    duration: number,
    interpolationType?: utils.InterpolationType
  ) {
    this.animator = uiAnimator
    this.entityScale = uiAnimator.scaleEntity
    this.entityTransform = uiAnimator.posEntity
    this.scaleTarget = Vector3.create(nextScaleX, nextScaleY, 0)
    this.positionTarget = Vector3.create(nextPosX, nextPosY, 0)

    this.duration = duration

    if (interpolationType) {
      this.interpolationType = interpolationType
    }
  }

  // Method when action starts
  onStart(): void {
    const transformScale = Transform.get(this.entityScale)
    const transformPosition = Transform.get(this.entityTransform)
    console.log('CICA')
    console.log('Position: ' + transformPosition.position.x + ' , ' + transformPosition.position.y)
    console.log('Scale   : ' + transformScale.scale.x + ' , ' + transformScale.scale.y)
    this.hasFinished = false

    utils.tweens.stopScaling(this.entityScale)
    utils.tweens.stopTranslation(this.entityTransform)

    utils.tweens.startScaling(
      this.entityScale,
      transformScale.scale,
      this.scaleTarget,
      this.duration,
      this.interpolationType,
      () => {
        this.hasFinished = true
      }
    )

    utils.tweens.startTranslation(
      this.entityTransform,
      transformPosition.position,
      this.positionTarget,
      this.duration,
      this.interpolationType,
      () => {
        this.hasFinished = true
      }
    )
    //this.hasFinished = true
  }
  // Method to run on every frame
  update(dt: number): void {}
  // Method to run at the end
  onFinish(): void {}
}

// Use IAction to define action for scaling
export class CallbackAction implements utils.actions.IAction {
  hasFinished: boolean = false
  callback: Callback

  constructor(callback: Callback) {
    this.callback = callback
  }

  // Method when action starts
  onStart(): void {
    this.callback()
    this.hasFinished = true
  }
  // Method to run on every frame
  update(dt: number): void {}
  // Method to run at the end
  onFinish(): void {}
}
