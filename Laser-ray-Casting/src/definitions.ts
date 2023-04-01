import { PBMaterial_PbrMaterial, engine, Schemas, Transform } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'

// Configuration constants
export const boxesCount = 10
export const speed = 1
export const rayDistance = 28

// There are 4 types of 'direction' we may use with the Raycast component,
// by changing 'raycastMode' you can try out those different types
export const enum RaycastModeType {
  LOCAL_DIRECTION,
  GLOBAL_DIRECTION,
  TARGET_ENTITY,
  GLOBAL_TARGET
}
export let raycastMode = RaycastModeType.LOCAL_DIRECTION

// Only used if raycastMode is TARGET_ENTITY or GLOBAL_TARGET
export const rayTargetEntity = engine.addEntity()
export const rayTargetTransform = Transform.create(rayTargetEntity, {
  position: Vector3.create(8, 1, 20)
})

export const defaultMaterial: PBMaterial_PbrMaterial = {
  metallic: 0,
  roughness: 1,
  albedoColor: Color4.create(0.2, 0.1, 1)
}
export const hitMaterial: PBMaterial_PbrMaterial = {
  metallic: 1,
  roughness: 0.5,
  albedoColor: Color4.create(1, 1, 30)
}
export const hitMaterial2: PBMaterial_PbrMaterial = {
  metallic: 1,
  roughness: 0.5,
  albedoColor: Color4.create(0.2, 1, 0.2)
}
export const rayMaterial: PBMaterial_PbrMaterial = {
  metallic: 1,
  roughness: 0.5,
  albedoColor: Color4.create(30, 1, 1)
}

export const Ray = engine.defineComponent('Ray',
  {
    power: Schemas.Int,
    timestamp: Schemas.Int
  }
)

export const MovingCube = engine.defineComponent('MovingCube', {})

export const RayMesh = engine.defineComponent('RayMesh', {})
