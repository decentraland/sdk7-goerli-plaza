import { Entity, Material, MeshRenderer, Transform, TransformType, engine } from '@dcl/sdk/ecs'
import { Color3, Color4 } from '@dcl/sdk/math'
import { BrickFlag, CollisionFlag, GameElementsFlag } from '../components/definitions'
import { Games } from '../gameLogic/sharedConstants'

export function createBrick(transform: Partial<TransformType>, color: Color3, parent: Entity, game: Games): void {
  const brick: Entity = engine.addEntity()
  Transform.create(brick, transform)
  const transformMutable = Transform.getMutable(brick)
  transformMutable.parent = parent
  MeshRenderer.create(brick, { mesh: { $case: 'box', box: { uvs: [] } } })
  Material.setPbrMaterial(brick, {
    albedoColor: Color4.fromColor3(color),
    emissiveColor: color,
    emissiveIntensity: 0.95
  })

  BrickFlag.create(brick, {})
  CollisionFlag.create(brick, {})
  GameElementsFlag.create(brick, { game })
}
