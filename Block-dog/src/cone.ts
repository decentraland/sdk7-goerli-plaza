const { Transform: TransformC, CylinderShape } = engine.baseComponents

export function createCone() {
  const cone = engine.addEntity()

  TransformC.create(cone, {
    position: { x: 3, y: 1, z: 3 },
    scale: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: 0, z: 0, w: 1 }
  })

  CylinderShape.create(cone, {
    withCollisions: true,
    isPointerBlocker: true,
    visible: true,
    radiusTop: 0,
    radiusBottom: 1
  })
  return cone
}
