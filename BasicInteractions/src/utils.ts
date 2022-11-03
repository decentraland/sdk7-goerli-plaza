

export function createMesh(
  position: Vector3.ReadonlyVector3,
  text: string = '',
  scale: number = 1.0,
  sphere = false
): Entity {
  const meshEntity = engine.addEntity()
  Transform.create(meshEntity, { position, scale: Vector3.scale(Vector3.One(), scale) })

  if (sphere) {
    MeshRenderer.create(meshEntity, { mesh: {$case:"sphere", sphere: {}}  })
    MeshCollider.create(meshEntity, { mesh: {$case:"sphere", sphere: {}}  })
  } else {
    MeshRenderer.create(meshEntity, { mesh: {$case:"box", box: { uvs:[]}}  })
    MeshCollider.create(meshEntity, { mesh: {$case:"box", box: { }}  })
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
    font: Font.F_SANS_SERIF
  })
}



