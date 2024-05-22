import { Coords } from '@dcl/sdk/ecs'
import { Sprite } from './mocked-data/atlasSprites'

export function getUvs(sprite: Sprite): number[] {
  const A: Coords = {
    x: sprite.x / sprite.atlasSize.x,
    y: 1 - (sprite.y + sprite.h) / sprite.atlasSize.y
  }
  const B: Coords = {
    x: sprite.x / sprite.atlasSize.x,
    y: 1 - sprite.y / sprite.atlasSize.y
  }
  const C: Coords = {
    x: (sprite.x + sprite.w) / sprite.atlasSize.x,
    y: 1 - sprite.y / sprite.atlasSize.y
  }
  const D: Coords = {
    x: (sprite.x + sprite.w) / sprite.atlasSize.x,
    y: 1 - (sprite.y + sprite.h) / sprite.atlasSize.y
  }

  const finalUvs: number[] = [A.x, A.y, B.x, B.y, C.x, C.y, D.x, D.y]
  return finalUvs
}
