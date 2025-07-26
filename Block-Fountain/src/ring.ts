import { Entity, engine, Transform, GltfContainer, Animator } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

export class Ring {
  private ringEntity: Entity
  animation1: string
  animation2: string
  animation3: string

  constructor(
    entity: Entity,
    animation1: string,
    animation2: string,
    animation3: string
  ) {
    // Use the provided entity
    this.ringEntity = entity

    // Initialize animation names
    this.animation1 = animation1
    this.animation2 = animation2
    this.animation3 = animation3
  }

  public play1(): void {
    // Play the first animation
    Animator.playSingleAnimation(this.ringEntity, this.animation1)
    console.log('Playing Animation 1')
  }
  public play2(): void {
    // Play the second animation
    Animator.playSingleAnimation(this.ringEntity, this.animation2)
    console.log('Playing Animation 2')
  }
  public play3(): void {
    // Play the third animation
    Animator.playSingleAnimation(this.ringEntity, this.animation3)
    console.log('Playing Animation 3')
  }
}
