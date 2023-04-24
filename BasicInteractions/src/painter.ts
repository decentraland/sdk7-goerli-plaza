import { engine, Material, PBMaterial_PbrMaterial, Schemas } from '@dcl/sdk/ecs'
import { Color3 } from '@dcl/sdk/math'

export const PainterComponent = engine.defineComponent('PainterComponent', {
  t: Schemas.Number
})

const greenMaterial: PBMaterial_PbrMaterial = {
  albedoColor: { a: 1, r: 0, g: 1, b: 0 }
}

const lightGreenMaterial: PBMaterial_PbrMaterial = {
  albedoColor: { a: 1, r: 0, g: 1, b: 1 }
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
    if (materialReadonly?.material?.$case === 'pbr') {
      if (
        materialReadonly === null ||
        !equalColor(materialReadonly.material.pbr.albedoColor, greenMaterial.albedoColor)
      ) {
        Material.setPbrMaterial(entity, { ...greenMaterial })
      }
    } else {
      Material.setPbrMaterial(entity, { ...greenMaterial })
    }

    if (value.t > 1) {
      Material.setPbrMaterial(entity, { ...lightGreenMaterial })
      PainterComponent.deleteFrom(entity)
    }
  }
})
