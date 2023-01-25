import { engine, Schemas, PBMaterial_PbrMaterial } from "@dcl/sdk/ecs"
import { Color4 } from "@dcl/sdk/math"



export const BoxBody = engine.defineComponent(
  "BoxBody",
  {
    boxBodyId: Schemas.Number
  }
)

export const Marker = engine.defineComponent(
  "Marker",
  {
    mouseConstraintId: Schemas.Number,
    isPointerPressed: Schemas.Boolean,
    isEKeyPressed: Schemas.Boolean,
    markerDistance: Schemas.Number
  }
)

export const JointBodyID = 1

// Marker
export const markerMaterial: PBMaterial_PbrMaterial = {
  albedoColor: Color4.create(5, 2.5, 1, 1)
}

export const markerPullMaterial: PBMaterial_PbrMaterial = {
  albedoColor: Color4.create(5, 1, 3.5, 1)
}
