import { Entity, engine, Transform, MeshRenderer, MeshCollider } from '@dcl/sdk/ecs'

// Cube factory
export function createCube(x: number, y: number, z: number): Entity {
  const meshEntity = engine.addEntity()
  Transform.create(meshEntity, { position: { x, y, z } })

  // set how the cube looks and collides
  MeshRenderer.setBox(meshEntity)
  MeshCollider.setBox(meshEntity)

  return meshEntity
}
