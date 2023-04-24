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

export const smokeMaterial: PBMaterial_PbrMaterial = {
  texture: Material.Texture.Common({
    src: 'textures/smoke-puff2.png'
  }),
  // TODO: this is not working as ecs6 is
  // alphaTexture: {
  //   tex: {
  //     $case: 'texture',
  //     texture: {
  //       src: 'textures/smoke-puff2.png'
  //     }
  //   }
  // },
  metallic: 0,
  roughness: 1
  // TODO: set the alpha mode uncomment next line
  // transparencyMode: MaterialTransparencyMode.MTM_ALPHA_BLEND
}
