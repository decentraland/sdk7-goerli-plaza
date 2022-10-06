export function createMesh(
  position: Vector3.ReadonlyVector3,
  text: string = '',
  scale: number = 1.0,
  sphere = false
): Entity {
  const meshEntity = engine.addEntity()
  Transform.create(meshEntity, { position, scale: Vector3.scale(Vector3.One(), scale) })

  if (sphere) {
    MeshRenderer.create(meshEntity, { sphere: {} })
    MeshCollider.create(meshEntity, { sphere: {} })
  } else {
    MeshRenderer.create(meshEntity, { box: { uvs: [] } })
    MeshCollider.create(meshEntity, { box: {} })
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
  Billboard.create(label)

  TextShape.create(label, {
    text,
    fontSize: 2,
    font: 'SansSerif'
  })
}
