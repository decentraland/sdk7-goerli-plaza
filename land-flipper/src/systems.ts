import { engine, Transform, Material, Entity, AudioSource } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import { Tile } from './components'
import { generateHexColor } from './utils'
import { myProfile } from '@dcl/sdk/network'

let MY_COLOR: Color4
export function colorTiles(dt: number) {
  MY_COLOR = MY_COLOR ?? Color4.fromHexString(generateHexColor(myProfile.networkId))
  const PlayerPos = Transform.get(engine.PlayerEntity).position

  for (const [entity, _tile, _transform, _material] of engine.getEntitiesWith(Tile, Transform, Material)) {
    const pos = Transform.get(entity).position

    if (Math.abs(pos.x - PlayerPos.x) < 1.4 && Math.abs(pos.z - PlayerPos.z) < 1.4) {
      const materialColor = (_material.material?.$case === 'pbr' && _material.material.pbr.albedoColor) ?? undefined
      if (
        materialColor &&
        materialColor.a === MY_COLOR.a &&
        materialColor.b === MY_COLOR.b &&
        materialColor.g === MY_COLOR.g &&
        materialColor.r === MY_COLOR.r
      ) {
        continue
      }
      changeTileColor(entity, MY_COLOR)
    }
  }
}

export function changeTileColor(tile: Entity, color: Color4 | undefined) {
  Material.setPbrMaterial(tile, { albedoColor: color })
  AudioSource.getMutable(tile).playing = true
}

export function resetAllTiles() {
  const tileEntities = engine.getEntitiesWith(Tile, Transform, Material)
  for (const [entity, _tile, _transform] of tileEntities) {
    changeTileColor(entity, undefined)
  }
}
