import { engine, Transform, MeshRenderer, MeshCollider } from '@dcl/sdk/ecs'

export function createCone() {
  const cone = engine.addEntity()

  Transform.create(cone, {
    position: { x: 3, y: 1, z: 3 }
  })

  MeshRenderer.setCylinder(cone, 1, 0)
  MeshCollider.setCylinder(cone, 1, 0)

  return cone
}
