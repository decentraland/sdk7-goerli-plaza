import { NftFrameType, NftShape, Transform, engine } from '@dcl/ecs'
import { Color3, Quaternion, Vector3 } from '@dcl/ecs-math'
import { MeshCollider, Entity } from '@dcl/sdk/ecs'
import { openNftDialog } from '~system/RestrictedActions'
import { classicFrame } from './nftFrames'
import { artPositions } from './artData'

/// need to export a function into arthover onpointer down
// function should be able to cover current pointer eventss present in nfts

let urn6 = 'urn:decentraland:matic:erc721:0x7552589075e94b41819ddfef622f07160b5b813c:32'
let urn7 = 'urn:decentraland:matic:erc721:0x2d58a44d6c0a355de25761fb33a1f6269a97e2c5:1855'
let urn3 = 'urn:decentraland:ethereum:erc721:0x41a322b28d0ff354040e2cbc676f0320d8c8850d:3734'
let urn8 = 'urn:decentraland:matic:erc721:0xe89758f01d76e1f76bc900f6749f56e1e5edc7fc:896'
let urn11 = 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:1540722'
let urn12 = 'urn:decentraland:matic:erc721:0xd27a967ee4f66226d49a18d4f9fd98f4aa0b26df:9567'
let urn13 = 'urn:decentraland:ethereum:erc721:0x22c1f6050e56d2876009903609a2cc3fef83b415:13726'
let urn16 = 'urn:decentraland:matic:erc721:0x0520501f5fec9ada8198b40524ce1decac303ca7:9886'
let urn17 = 'urn:decentraland:ethereum:erc721:0x7e6027a6a84fc1f6db6782c523efe62c923e46ff:26435179062837234498192774682918990336524160459589740286407496683957895479890'
let urn18 = 'urn:decentraland:ethereum:erc721:0x22c1f6050e56d2876009903609a2cc3fef83b415:15726'
let urn19 = 'urn:decentraland:ethereum:erc721:0x22c1f6050e56d2876009903609a2cc3fef83b415:13655'
let urn20 = 'urn:decentraland:ethereum:erc721:0x22c1f6050e56d2876009903609a2cc3fef83b415:11975'
let urn21 =
  'urn:decentraland:ethereum:erc721:0x495f947276749ce646f68ac8c248420045cb7b5e:51297453693788132298669809830038636826071347270421607062891710071363946414095'
let urn22 = 'urn:decentraland:ethereum:erc721:0x22c1f6050e56d2876009903609a2cc3fef83b415:12673'
let urn23 = 'urn:decentraland:ethereum:erc721:0x22c1f6050e56d2876009903609a2cc3fef83b415:13493'
let urn24 = 'urn:decentraland:ethereum:erc721:0x22c1f6050e56d2876009903609a2cc3fef83b415:13294'

interface NFTdata {
  room: number // location >> room 1 = ground floor; room 2 = first floor + mezzanine; room 3: rooftop area
  id: number
  position: Vector3
  rotation: Vector3
  scale: Vector3
  urn: string
  frame: NftFrameType
  color: Color3
  hoverText: string
}

export const NFTdata: NFTdata[] = [
  {
    room: 1,
    id: 0,
    position: artPositions[0].position,
    rotation: artPositions[0].rotation,
    scale: artPositions[0].scale,
    urn: 'urn:decentraland:ethereum:erc721:0xecf7ef42b57ee37a959bf507183c5dd6bf182081:100', // Example with urn path
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 1,
    id: 2,
    position: artPositions[2].position,
    rotation: artPositions[2].rotation,
    scale: artPositions[2].scale,
    urn: urn3, // Example with urns declared above
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },

  {
    room: 2,
    id: 5,
    position: artPositions[5].position,
    rotation: artPositions[5].rotation,
    scale: artPositions[5].scale,
    urn: urn6,
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 6,
    position: artPositions[6].position,
    rotation: artPositions[6].rotation,
    scale: artPositions[6].scale,
    urn: urn7,
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 7,
    position: artPositions[7].position,
    rotation: artPositions[7].rotation,
    scale: artPositions[7].scale,
    urn: urn8,
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 10,
    position: artPositions[10].position,
    rotation: artPositions[10].rotation,
    scale: artPositions[10].scale,
    urn: urn11,
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 11,
    position: artPositions[11].position,
    rotation: artPositions[11].rotation,
    scale: Vector3.create(4, 4, 4),
    urn: urn12,
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 12,
    position: artPositions[12].position,
    rotation: artPositions[12].rotation,
    scale: artPositions[12].scale,
    urn: urn13,
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 15,
    position: artPositions[15].position,
    rotation: artPositions[15].rotation,
    scale: artPositions[15].scale,
    urn: urn16,
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 16,
    position: artPositions[16].position,
    rotation: artPositions[16].rotation,
    scale: artPositions[16].scale,
    urn: urn17,
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 17,
    position: artPositions[17].position,
    rotation: artPositions[17].rotation,
    scale: artPositions[17].scale,
    urn: urn18,
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 18,
    position: artPositions[18].position,
    rotation: artPositions[18].rotation,
    scale: artPositions[18].scale,
    urn: urn19,
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 19,
    position: artPositions[19].position,
    rotation: artPositions[19].rotation,
    scale: artPositions[19].scale,
    urn: urn20,
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 20,
    position: artPositions[20].position,
    rotation: artPositions[20].rotation,
    scale: artPositions[20].scale,
    urn: urn21,
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 21,
    position: artPositions[21].position,
    rotation: artPositions[21].rotation,
    scale: artPositions[21].scale,
    urn: urn22,
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 22,
    position: artPositions[22].position,
    rotation: artPositions[22].rotation,
    scale: artPositions[22].scale,
    urn: urn23,
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  },
  {
    room: 2,
    id: 23,
    position: artPositions[23].position,
    rotation: artPositions[23].rotation,
    scale: artPositions[23].scale,
    urn: urn24,
    frame: classicFrame,
    color: Color3.Yellow(),
    hoverText: 'Click'
  }
]

for (const data of NFTdata) {
  createNFT(data)
}

export function createNFT(data: NFTdata) {
  const { id, room, position, rotation, scale, urn, frame, color, hoverText } = data
  const entity = engine.addEntity()

  Transform.create(entity, {
    position: position,
    rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z),
    scale: scale
  })

  MeshCollider.setPlane(entity)

  NftShape.create(entity, {
    urn: urn,
    color: color,
    style: frame
  })

  return entity
}

export function removeNFTs(entity: Entity) {
  engine.removeEntity(entity)
}

export function openNFTlink(id: number) {
  let urn = NFTdata.find((nft) => nft.id === id)?.urn
  if (urn) {
    openNftDialog({ urn: urn })
  }

}
