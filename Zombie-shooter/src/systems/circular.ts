const { BoxShape, Transform } = engine.baseComponents

export function circularSystem(dt: number) {
  const entitiesWithBoxShapes = engine.getEntitiesWith(BoxShape, Transform)
  for (const [entity, _boxShape, _transform] of entitiesWithBoxShapes) {
    const mutableTransform = Transform.getMutable(entity)

    mutableTransform.rotation = Quaternion.multiply(
      mutableTransform.rotation,
      Quaternion.angleAxis(dt * 10, Vector3.Up())
    )
  }
}
