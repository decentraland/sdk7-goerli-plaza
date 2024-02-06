import { Color4 } from '@dcl/sdk/math'
import { MY_COLOR, setMyColor } from './systems'
import { generateHexColor } from './utils'
import { myProfile, parentEntity, syncEntity } from '@dcl/sdk/network'
import {
  AvatarAnchorPointType,
  AvatarAttach,
  Entity,
  Material,
  MeshRenderer,
  PBAvatarAttach,
  TextShape,
  Transform,
  engine
} from '@dcl/sdk/ecs'
import { PlayerIdentityData } from '@dcl/sdk/ecs'
import { onEnterScene, onLeaveScene } from '@dcl/sdk/src/players'

export function createMarker(player: string) {
  const color = Color4.fromHexString(generateHexColor(Number(player)))

  const markerParent = engine.addEntity()
  AvatarAttach.create(markerParent, { avatarId: player, anchorPointId: AvatarAnchorPointType.AAPT_POSITION })

  const marker = engine.addEntity()
  Transform.create(marker, {
    scale: { x: 0.25, y: 0.5, z: 0.25 },
    position: { x: 0, y: 3, z: 0 },
    parent: markerParent
  })
  MeshRenderer.setCylinder(marker, 0, 1)
  Material.setPbrMaterial(marker, { albedoColor: color })

  // const idText = engine.addEntity()
  // Transform.create(idText, {
  //   position: { x: 0, y: 1, z: 0 },
  //   scale: { x: 0.25, y: 0.25, z: 0.25 },
  //   parent: marker
  // })

  // TextShape.create(idText, { text: player, textColor: color })
}

export function markAllPlayers() {
  // add markers to all players on load
  for (const [entity, data] of engine.getEntitiesWith(PlayerIdentityData, Transform)) {
    if (!data) return
    console.log('Player marker added: ', data.address)
    createMarker(data.address)
  }

  // add markers to all players that come in later
  onEnterScene((player) => {
    console.log('ENTERED SCENE', player)
    createMarker(player.userId)
  })
}
