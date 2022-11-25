//-------------------------------------------------------
// Configuration constants
export const boxesCount = 10
export const speed = 1
export const rayDistance = 20

export const defaultMaterial: PBMaterial_PbrMaterial = {
  metallic: 0,
  roughness: 1,
  albedoColor: Color3.create(0.2, 0.1, 1)
}
export const hitMaterial: PBMaterial_PbrMaterial = {
  metallic: 1,
  roughness: 0.5,
  albedoColor: Color3.create(1, 1, 30)
}
export const hitMaterial2: PBMaterial_PbrMaterial = {
  metallic: 1,
  roughness: 0.5,
  albedoColor: Color3.create(0.2, 1, 0.2)
}
export const rayMaterial: PBMaterial_PbrMaterial = {
  metallic: 1,
  roughness: 0.5,
  albedoColor: Color3.create(30, 1, 1)
}

export enum CustomComponentIds {
  Ray = 12001,
  MovingCube = 12002
}

export const Ray = engine.defineComponent(
  {
    power: Schemas.Int,
    timestamp: Schemas.Int
  },
  CustomComponentIds.Ray
)

export const MovingCube = engine.defineComponent({}, CustomComponentIds.MovingCube)
