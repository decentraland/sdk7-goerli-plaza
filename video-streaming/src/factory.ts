import {
  Entity,
  engine,
  Transform,
  MeshRenderer,
  MeshCollider,
  GltfContainer,
  TransformType
} from '@dcl/sdk/ecs'

// Cube factory
export function createGLTF(transform: Partial<TransformType>, src: string): Entity {
  const meshEntity = engine.addEntity()
  Transform.create(meshEntity, transform)

  // set gltf
  GltfContainer.create(meshEntity, { src })

  return meshEntity
}
