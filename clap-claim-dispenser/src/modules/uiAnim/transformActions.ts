import { Entity, Transform } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"
import * as utils from '@dcl-sdk/utils'
import { Callback } from "@dcl/sdk/react-ecs"

// Use IAction to define action for scaling
export class MoveScaleAction implements utils.actions.IAction {
    hasFinished: boolean = false
    entity: Entity
    scale: Vector3
    position: Vector3
    duration: number = 1
    interpolationType:utils.InterpolationType = utils.InterpolationType.EASEINQUAD
  
    constructor(entity: Entity, nextPosX: number, nextPosY: number, nextScaleX: number, nextScaleY: number, duration: number, interpolationType?:utils.InterpolationType) {
      this.entity = entity
      this.scale = Vector3.create(nextScaleX, nextScaleY, 0)
      this.position = Vector3.create(nextPosX, nextPosY, 0)
      this.duration = duration

      if(interpolationType){
        this.interpolationType = interpolationType
      }
    }
  
    // Method when action starts
    onStart(): void {
      const transform = Transform.get(this.entity)
      this.hasFinished = false
  
      utils.tweens.startScaling(
        this.entity,
        transform.scale,
        this.scale,
        this.duration,
        this.interpolationType,
        () => {
          this.hasFinished = true
        }
      )

      utils.tweens.startTranslation(
        this.entity,
        transform.position,
        this.position,
        this.duration,
        this.interpolationType,
        () => {
          this.hasFinished = true
        }
      )
    }
    // Method to run on every frame
    update(dt: number): void {}
    // Method to run at the end
    onFinish(): void {}
  }

// Use IAction to define action for scaling
export class CallbackAction implements utils.actions.IAction {
    hasFinished: boolean = false  
    callback:Callback  

    constructor(callback:Callback) { 
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

  // Use IAction to define action for translation
class MoveAction implements utils.actions.IAction {
    hasFinished: boolean = false
    entity: Entity
    position: Vector3
  
    constructor(entity: Entity, position: Vector3) {
      this.entity = entity
      this.position = position
    }
  
    onStart(): void {
      const transform = Transform.get(this.entity)
  
      utils.tweens.startTranslation(
        this.entity,
        transform.position,
        this.position,
        4,
        utils.InterpolationType.LINEAR,
        () => {
          this.hasFinished = true
        }
      )
    }
  
    update(dt: number): void {}
  
    onFinish(): void {}
  }
