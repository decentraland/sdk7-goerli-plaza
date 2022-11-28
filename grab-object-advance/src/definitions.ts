enum CustomComponentIds {
  BoxBody = 2022,
  Marker = 2023
}

export const BoxBody = engine.defineComponent(
  {
    boxBodyId: Schemas.Number
  },
  CustomComponentIds.BoxBody
)

export const Marker = engine.defineComponent(
  {
    mouseConstraintId: Schemas.Number,
    isPointerPressed: Schemas.Boolean,
    isEKeyPressed: Schemas.Boolean,
    markerDistance: Schemas.Number
  },
  CustomComponentIds.Marker
)

export const JointBodyID = 1

// Marker
export const markerMaterial: PBMaterial_PbrMaterial = {
  albedoColor: Color3.create(5, 2.5, 1)
}

export const markerPullMaterial: PBMaterial_PbrMaterial = {
  albedoColor: Color3.create(5, 1, 3.5)
}
