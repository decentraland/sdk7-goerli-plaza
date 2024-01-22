import { engine, Schemas, PBMaterial_PbrMaterial, Material } from '@dcl/sdk/ecs'

export const SmokeParticle = engine.defineComponent('SmokeParticle', {
  velocity: Schemas.Vector3,
  visible: Schemas.Boolean
})

export const SmokeSource = engine.defineComponent('SmokeSource', {
  particleCount: Schemas.Number,
  smokeInterval: Schemas.Number,
  nextSmoke: Schemas.Number
})

export const smokeTexture = Material.Texture.Common({
  src: 'assets/textures/smoke-puff.png'
})
