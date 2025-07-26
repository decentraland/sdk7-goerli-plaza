import { Material, MaterialTransparencyMode, PBMaterial_PbrMaterial } from '@dcl/sdk/ecs'

// Defining the raindrop material
export const raindropMaterial = {
  texture: Material.Texture.Common({
    src: 'assets/scene/Images/drop.png'
  }),
  transparencyMode: MaterialTransparencyMode.MTM_ALPHA_BLEND,
  roughness: 0.5
}

// Snowflake material array
export const flakeMaterial: PBMaterial_PbrMaterial[] = []

// Generate snowflake variations
for (let i = 1; i < 5; i++) {
  const material = {
    texture: Material.Texture.Common({
      src: 'assets/scene/Images/flake' + i + '.png'
    }),
    transparencyMode: MaterialTransparencyMode.MTM_ALPHA_BLEND,
    roughness: 0.5
  }
  // Add material to array
  flakeMaterial.push(material)
}
