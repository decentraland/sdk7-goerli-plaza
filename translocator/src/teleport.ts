import { Transform, engine, Entity, GltfContainer, Animator, AvatarAttach, AvatarAnchorPointType } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

export class Teleport {
  entity: Entity

  constructor(modelPath: string) {
    this.entity = engine.addEntity()
    GltfContainer.create(this.entity, {
      src: modelPath
    })
    Transform.create(this.entity, {
      position: Vector3.create(0, -0.5, 0),
      parent: engine.PlayerEntity
    })

    Animator.create(this.entity, {
      states: [
        {
          clip: 'Teleport',
          playing: false,
          loop: false
        }
      ]
    })
  }

  playAnimation() {
    Animator.playSingleAnimation(this.entity, 'Teleport')
  }
}
