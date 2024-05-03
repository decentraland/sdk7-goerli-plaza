import { Entity, Material, MeshRenderer, Schemas, Transform, TransformType, engine } from '@dcl/sdk/ecs'
import { Vector3, Color3, Color4 } from '@dcl/sdk/math'
import { WallFlag, CollisionFlag } from '../components/definitions'

export function createWall(transform: Partial<TransformType>, normal: Vector3, color: Color3, parent: Entity): void {
  const wall: Entity = engine.addEntity()
  WallFlag.createOrReplace(wall, { normal })
  CollisionFlag.createOrReplace(wall, {})

  Transform.create(wall, transform)
  const mutableTransform = Transform.getMutable(wall)
  mutableTransform.parent = parent

  MeshRenderer.create(wall, { mesh: { $case: 'box', box: { uvs: [] } } })
  Material.setPbrMaterial(wall, { albedoColor: Color4.fromColor3(color) })
}
