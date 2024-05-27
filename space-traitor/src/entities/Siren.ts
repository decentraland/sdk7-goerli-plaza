import { Entity, Animator, Transform, GltfContainer, TransformComponent, TransformType, engine, Name } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { syncEntity, parentEntity } from '@dcl/sdk/network'
import { playAnimation } from "dcl-npc-toolkit"

export class Siren {
  entity: Entity
  constructor(parentedEntity: Entity, position: Vector3,
    rotation: Quaternion,) {
    this.entity = engine.addEntity()
    Transform.createOrReplace(this.entity, {
        parent: parentedEntity,
    })
    Transform.getMutable(this.entity).position.x = position.x
    Transform.getMutable(this.entity).position.y = position.y
    Transform.getMutable(this.entity).position.z = position.z

    Transform.getMutable(this.entity).rotation.x = rotation.x
    Transform.getMutable(this.entity).rotation.y = rotation.y
    Transform.getMutable(this.entity).rotation.z = rotation.z
    Transform.getMutable(this.entity).rotation.w = rotation.w


    Animator.create(this.entity, {
      states: [{
        clip: 'deactivate',
        loop: true,
        weight: 0.02,
        speed: 1.7
      },
      {
        clip: 'activate',
        loop: true,
        weight: 0.02,
        speed: 1.7
      }
      ]
    })

    GltfContainer.create(this.entity, { src: 'models/Siren.glb' })
  }

  toggle(value: boolean) {
    if (value === true) {
      Animator.stopAllAnimations(this.entity, true)
      Animator.getClip(this.entity, 'activate').playing = true 
    } else {
      Animator.stopAllAnimations(this.entity, true)
      Animator.getClip(this.entity, 'deactivate').playing = true
    }

  }
}