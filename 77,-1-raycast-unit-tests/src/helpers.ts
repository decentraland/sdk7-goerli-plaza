import { engine, Entity, Transform, TransformTypeWithOptionals } from '@dcl/sdk/ecs'

export function createChainedEntities(
  transforms: Omit<TransformTypeWithOptionals, 'parent'>[],
  parent: Entity = engine.RootEntity
): Entity {
  return transforms.reduce((parent, transform) => {
    const entity = engine.addEntity()
    Transform.create(entity, { ...transform, parent })
    return entity
  }, parent)
}
