import { Entity, engine, Transform, MeshRenderer, MeshCollider, Billboard, TextShape, Font } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

export function createMesh(
  position: Vector3.ReadonlyVector3,
  text: string = '',
  scale: number = 1.0,
  sphere = false
): Entity {
  const meshEntity = engine.addEntity()
  Transform.create(meshEntity, {
    position,
    scale: Vector3.scale(Vector3.One(), scale)
  })

  if (sphere) {
    MeshRenderer.setSphere(meshEntity)
    MeshCollider.setSphere(meshEntity)
  } else {
    MeshRenderer.setBox(meshEntity)
    MeshCollider.setBox(meshEntity)
  }

  if (text) {
    addLabel(text, meshEntity)
  }

  return meshEntity
}

export function addLabel(text: string, parent: Entity) {
  const label = engine.addEntity()
  Transform.create(label, {
    position: Vector3.create(0, 1.5, 0),
    parent
  })
  // TODO: oppositeDirection bug?
  Billboard.create(label)

  TextShape.create(label, {
    text,
    fontSize: 2,
    font: Font.F_SANS_SERIF
  })
}
