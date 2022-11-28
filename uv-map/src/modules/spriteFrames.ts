import { Sprite } from '../definitions'

export default function updateSpriteFrameSystem(dt: number) {
  for (const [entity] of engine.getEntitiesWith(Sprite, MeshRenderer)) {
    const sprite = Sprite.getMutable(entity)
    sprite.t += dt
    if (sprite.t > sprite.interval) {
      sprite.t -= sprite.interval

      const frameSizeX = 1 / sprite.rows
      const frameSizeY = 1 / sprite.columns
      sprite.faceMappingsX += frameSizeX
      if (sprite.faceMappingsX >= 1) {
        sprite.faceMappingsX = 0
        sprite.faceMappingsY += frameSizeY
        if (sprite.faceMappingsY >= 1) {
          sprite.faceMappingsY = 0
        }
      }

      const mutableMesh = MeshRenderer.getMutable(entity)
      if (mutableMesh.mesh?.$case === 'plane') {
        mutableMesh.mesh.plane.uvs = [
          sprite.faceMappingsX,
          sprite.faceMappingsY,
          sprite.faceMappingsX + frameSizeX,
          sprite.faceMappingsY,
          sprite.faceMappingsX + frameSizeX,
          sprite.faceMappingsY + frameSizeY,
          sprite.faceMappingsX,
          sprite.faceMappingsY + frameSizeY,
          sprite.faceMappingsX,
          sprite.faceMappingsY,
          sprite.faceMappingsX + frameSizeX,
          sprite.faceMappingsY,
          sprite.faceMappingsX + frameSizeX,
          sprite.faceMappingsY + frameSizeY,
          sprite.faceMappingsX,
          sprite.faceMappingsY + frameSizeY
        ]
      }
    }
  }
}
