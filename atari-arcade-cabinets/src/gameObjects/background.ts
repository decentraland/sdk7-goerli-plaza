import { Entity, Material, MeshRenderer, Transform, TransformType, engine } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'

export function createBackground(transform: Partial<TransformType>, parent: Entity): void {
  const background: Entity = engine.addEntity()
  Transform.create(background, transform)
  const mutableTransform = Transform.getMutable(background)
  mutableTransform.parent = parent
  Material.setPbrMaterial(background, {
    albedoColor: Color4.Black(),
    roughness: 0.9
  })
  MeshRenderer.create(background, { mesh: { $case: 'box', box: { uvs: [] } } })
}
