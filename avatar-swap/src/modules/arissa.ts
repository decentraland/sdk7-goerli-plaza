import { engine, Entity, GltfContainer, Transform, Animator } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

export function createArissaCharacter(): Entity {
  const parentEntity = engine.addEntity()
  const entity = engine.addEntity()

  GltfContainer.create(entity, {
    src: 'models/arissa.glb'
  })
  Transform.create(entity, {
    position: Vector3.create(0, 1.75, 0),
    scale: Vector3.create(0, 0, 0),
    parent: parentEntity
  })
  Animator.create(entity, {
    states: [
      {
        name: 'Running',
        clip: 'Running',
        loop: true
      },
      {
        name: 'Idle',
        clip: 'Idle',
        loop: true
      }
    ]
  })

  return entity
}
