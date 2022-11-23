export const SmokeParticle = engine.defineComponent(
  {
    velocity: Schemas.Vector3,
    visible: Schemas.Boolean
  },
  2022
)

export const SmokeSource = engine.defineComponent(
  {
    particleCount: Schemas.Number,
    smokeInterval: Schemas.Number,
    nextSmoke: Schemas.Number
  },
  2023
)

export const smokeMaterial: PBMaterial = {
  texture: {
    tex: {
      $case: 'texture',
      texture: {
        src: 'textures/smoke-puff2.png'
      }
    }
  },
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
