export type CircularSystemState = {
  t: number
}

const { BoxShape, Transform } = engine.baseComponents

export function circularSystem(dt: number, state: CircularSystemState) {
  state.t += 2 * Math.PI * dt

  const entitiesWithBoxShapes = engine.getEntitiesWith(BoxShape, Transform)
  for (const [entity, _boxShape, _transform] of entitiesWithBoxShapes) {
    const mutableTransform = Transform.getMutable(entity)
    mutableTransform.position.x = 8 + 2 * Math.cos(state.t)
    mutableTransform.position.z = 8 + 2 * Math.sin(state.t)
  }
}
