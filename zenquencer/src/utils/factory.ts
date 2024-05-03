import { Entity, GltfContainer, Transform, engine } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { syncEntity } from '@dcl/sdk/network'
import { StoneStatus } from '../components'
import resources from '../resources'

export function createStone(pos: { beat: number, note: number }, noteSrc: string, parent: Entity, id: number) {
  let seqOffset = Vector3.create(127.5 - 120, 0.3, 222 - 225)


  const entity = engine.addEntity()

  // Used to track the colors
  StoneStatus.create(entity, { stoneOn: false })

  GltfContainer.create(entity, {
    src: resources.zenquencer.models.stone
  })
  Transform.create(entity, {
    parent,
    position: Vector3.create(
      seqOffset.x - pos.beat,
      seqOffset.y,
      seqOffset.z + pos.note
    ),
    scale: Vector3.One(),
    rotation: Quaternion.fromEulerDegrees(180, 0, 0)
  })
  syncEntity(entity, [StoneStatus.componentId], id)

  return entity
}
