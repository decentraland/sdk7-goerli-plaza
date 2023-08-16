import {
  Entity,
  Transform,
  NftFrameType,
  NftShape,
  TransformComponent,
  TransformType,
  PBNftShape,
  engine
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'
import { scene1active } from './subSceneSetup'

export type NFTdata = {
  room: number
  id: number
  position: TransformType
  contract: string
  tokenId: string
}

export const nftCollection: NFTdata[] = [
  {
    room: 1,
    id: 1,
    position: {
      position: Vector3.create(4, 2, 30),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
    tokenId: '224'
  },
  {
    room: 1,
    id: 2,
    position: {
      position: Vector3.create(2, 2, 26),
      rotation: Quaternion.fromEulerDegrees(0, -90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
    tokenId: '223'
  },
  {
    room: 1,
    id: 3,
    position: {
      position: Vector3.create(6.3, 2, 26),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
    tokenId: '218'
  },
  {
    room: 2,
    id: 4,
    position: {
      position: Vector3.create(4 + 12, 2, 30),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
    tokenId: '100'
  },
  {
    room: 2,
    id: 5,
    position: {
      position: Vector3.create(2 + 12, 2, 26),
      rotation: Quaternion.fromEulerDegrees(0, -90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
    tokenId: '101'
  },
  {
    room: 2,
    id: 6,
    position: {
      position: Vector3.create(6.3 + 12, 2, 26),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
    tokenId: '102'
  },
  {
    room: 3,
    id: 7,
    position: {
      position: Vector3.create(4 + 22, 2, 30),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
    tokenId: '110'
  },
  {
    room: 3,
    id: 8,
    position: {
      position: Vector3.create(2 + 22, 2, 26),
      rotation: Quaternion.fromEulerDegrees(0, -90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
    tokenId: '111'
  },
  {
    room: 3,
    id: 9,
    position: {
      position: Vector3.create(6.3 + 22, 2, 26),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
    tokenId: '112'
  },
  {
    room: 4,
    id: 10,
    position: {
      position: Vector3.create(4, 2, 22 - 18),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
    tokenId: '113'
  },
  {
    room: 4,
    id: 11,
    position: {
      position: Vector3.create(1.7, 2, 26 - 18),
      rotation: Quaternion.fromEulerDegrees(0, -90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
    tokenId: '114'
  },
  {
    room: 4,
    id: 12,
    position: {
      position: Vector3.create(6.3, 2, 26 - 18),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
    tokenId: '115'
  },
  {
    room: 5,
    id: 13,
    position: {
      position: Vector3.create(4 + 12, 2, 22 - 18),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
    tokenId: '98'
  },
  {
    room: 5,
    id: 14,
    position: {
      position: Vector3.create(1.7 + 12, 2, 26 - 18),
      rotation: Quaternion.fromEulerDegrees(0, -90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
    tokenId: '87'
  },
  {
    room: 5,
    id: 15,
    position: {
      position: Vector3.create(6.3 + 12, 2, 26 - 18),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
    tokenId: '66'
  },
  {
    room: 6,
    id: 16,
    position: {
      position: Vector3.create(4 + 22, 2, 22 - 18),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
    tokenId: '3'
  },
  {
    room: 6,
    id: 17,
    position: {
      position: Vector3.create(1.7 + 22, 2, 26 - 18),
      rotation: Quaternion.fromEulerDegrees(0, -90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
    tokenId: '4'
  },
  {
    room: 6,
    id: 18,
    position: {
      position: Vector3.create(6.3 + 22, 2, 26 - 18),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
    tokenId: '8'
  },
  //start krypto kitties

  {
    room: 7,
    id: 16,
    position: {
      position: Vector3.create(4 + 22, 2, 22 - 18),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
    tokenId: '1631847'
  },
  {
    room: 7,
    id: 17,
    position: {
      position: Vector3.create(1.7 + 22, 2, 26 - 18),
      rotation: Quaternion.fromEulerDegrees(0, -90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
    tokenId: '1681447'
  },
  {
    room: 7,
    id: 18,
    position: {
      position: Vector3.create(6.3 + 22, 2, 26 - 18),
      rotation: Quaternion.fromEulerDegrees(0, 90, 0),
      scale: Vector3.create(2.5, 2.5, 2.5)
    },
    contract: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
    tokenId: '1681847'
  }
]

export function createPainting(
  parent: Entity | undefined,
  id: number,
  position: TransformType,
  contract: string,
  tokenId: string
) {
  if (scene1active) {
    const address: string = 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:1681847'
    const entity = engine.addEntity()

    const nftShape = NftShape.create(entity, {
      urn: address,
      color: Color4.Black(),
      style: NftFrameType.NFT_GOLD_CARVED
    })

    Transform.create(entity, { position: position.position, rotation: position.rotation, scale: position.scale })
    if (parent !== undefined)
      Transform.create(entity, {
        position: position.position,
        parent: parent
      })
    //engine.addEntity(entity)
    return entity
  } else {
    const address: string = 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:1631847'
    const entity = engine.addEntity()

    const nftShape = NftShape.create(entity, {
      urn: address,
      color: Color4.Black(),
      style: NftFrameType.NFT_GOLD_CARVED
    })

    Transform.create(entity, { position: position.position, rotation: position.rotation, scale: position.scale })
    if (parent !== undefined)
      Transform.create(entity, {
        position: position.position,
        parent: parent
      })
    //engine.addEntity(entity)
    return entity
  }
}

export function removePaintings(entity: Entity) {
  engine.removeEntity(entity)
}
