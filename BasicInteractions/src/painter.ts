export const PainterComponent = engine.defineComponent(
  {
    t: Schemas.Number
  },
  2022
)

const greenMaterial: PBMaterial = {
  albedoColor: { r: 0, g: 1, b: 0 }
}

const lightGreenMaterial: PBMaterial = {
  albedoColor: { r: 0, g: 1, b: 1 }
}

function equalColor(a?: Color3, b?: Color3) {
  if (a && b) {
    return a.r === b.r && a.g === b.g && a.b === b.b
  } else if (a || b) {
    return false
  }
  return true
}

engine.addSystem((dt: number) => {
  for (const [entity] of engine.getEntitiesWith(PainterComponent)) {
    const value = PainterComponent.getMutable(entity)
    value.t += dt

    const materialReadonly = Material.getOrNull(entity)
    if (materialReadonly === null || !equalColor(materialReadonly.albedoColor, greenMaterial.albedoColor)) {
      Material.createOrReplace(entity, { ...greenMaterial })
    }

    if (value.t > 1) {
      Material.createOrReplace(entity, { ...lightGreenMaterial })
      PainterComponent.deleteFrom(entity)
    }
  }
})
