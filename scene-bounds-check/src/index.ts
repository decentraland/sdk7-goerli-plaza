import {
  AudioSource,
  AvatarShape,
  engine,
  GltfContainer,
  InputAction,
  MeshCollider,
  MeshRenderer,
  NftShape,
  PointerEventType,
  PointerEvents,
  TextShape,
  Transform,
  VisibilityComponent
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { createCube } from './factory'
import { createMovingPlatform, platformsMovementSystem, setAsMovingPlatform } from './movingPlatform'

export function main() {
  // PARENTING BOUNDS TESTING
  const grandParentEntity = createCube(4, 7, 2)
  const parentEntity = createCube(2, -2, 0)
  const childEntity1 = createCube(-2, -2, 0)
  const childEntity2 = createCube(2, -2, 0)

  Transform.getMutable(parentEntity).parent = grandParentEntity
  Transform.getMutable(childEntity1).parent = parentEntity
  Transform.getMutable(childEntity2).parent = parentEntity
  setAsMovingPlatform(grandParentEntity, [Vector3.create(2, 7, 2), Vector3.create(-6, 7, 2)], 30)

  // MOVING OBJECTS TESTING
  createMovingPlatform(
    'models/movingPlatform.glb',
    [
      Vector3.create(2, 1.5, 8),
      Vector3.create(2, 1.5, 6),
      Vector3.create(-2, 1.5, 6),
      Vector3.create(-2, 1.5, 4),
      Vector3.create(2, 1.5, 4)
    ],
    5
  )

  createMovingPlatform('models/movingPlatform.glb', [Vector3.create(20, 1.5, 6), Vector3.create(20, 1.5, 4)], 5)

  const boxEntity = engine.addEntity()
  MeshRenderer.setBox(boxEntity)
  VisibilityComponent.create(boxEntity, {
    visible: false
  })
  setAsMovingPlatform(
    boxEntity,
    [
      Vector3.create(14, 1.5, 8),
      Vector3.create(14, 1.5, 6),
      Vector3.create(18, 1.5, 6),
      Vector3.create(18, 1.5, 4),
      Vector3.create(14, 1.5, 4)
    ],
    5
  )

  const boxColliderEntity = engine.addEntity()
  MeshCollider.setBox(boxColliderEntity)
  setAsMovingPlatform(
    boxColliderEntity,
    [
      Vector3.create(2, 1.5, 14),
      Vector3.create(2, 1.5, 18),
      Vector3.create(4, 1.5, 18),
      Vector3.create(4, 1.5, 14),
      Vector3.create(6, 1.5, 14)
    ],
    9
  )

  // NFT SHAPE
  const nftShapeEntity = engine.addEntity()
  NftShape.create(nftShapeEntity, {
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:558536'
  })
  setAsMovingPlatform(nftShapeEntity, [Vector3.create(8, 1.5, -24), Vector3.create(40, 1.5, -24)], 180)

  // IRREGULAR SHAPED MESH + POINTER HOVER FEEDBACK
  const irregularMeshEntity = engine.addEntity()
  GltfContainer.create(irregularMeshEntity, {
    src: 'models/irregular.glb'
  })
  Transform.create(irregularMeshEntity, {
    position: Vector3.create(16, 1, -16),
    rotation: Quaternion.fromEulerDegrees(0, -90, 0)
  })
  PointerEvents.create(irregularMeshEntity, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_POINTER,
          hoverText: 'POINTER HOVER!'
        }
      }
    ]
  })
  setAsMovingPlatform(irregularMeshEntity, [Vector3.create(16, 1, -16), Vector3.create(16, 1, -8)], 15)

  // AVATAR SHAPE
  const avatarEntity = engine.addEntity()
  Transform.create(avatarEntity, {
    position: Vector3.create(16, 0, -14)
  })
  const femaleBodyShapeId = 'urn:decentraland:off-chain:base-avatars:BaseFemale'
  const maleBodyShapeId = 'urn:decentraland:off-chain:base-avatars:BaseMale'
  AvatarShape.create(avatarEntity, {
    id: 'avatar-shape',
    name: 'avatar-shape',
    bodyShape: femaleBodyShapeId,
    wearables: [
      'urn:decentraland:off-chain:base-avatars:eyebrows_00',
      'urn:decentraland:off-chain:base-avatars:mouth_00',
      'urn:decentraland:off-chain:base-avatars:eyes_00',
      'urn:decentraland:matic:collections-v2:0xd07a56f7198ae6e4e3d6738bd8c4b81d21bf0403:12',
      'urn:decentraland:matic:collections-v2:0xd07a56f7198ae6e4e3d6738bd8c4b81d21bf0403:2',
      'urn:decentraland:matic:collections-v2:0xd07a56f7198ae6e4e3d6738bd8c4b81d21bf0403:7',
      'urn:decentraland:ethereum:collections-v1:xmas_2019:santa_facial_hair',
      'urn:decentraland:matic:collections-v2:0x4334a820f556a54845a35f8aad5986aecdf07d43:1',
      'urn:decentraland:ethereum:collections-v1:sugarclub_yumi:yumi_retro_shades_eyewear',
      'urn:decentraland:matic:collections-v2:0x4334a820f556a54845a35f8aad5986aecdf07d43:0'
    ],
    emotes: []
  })

  setAsMovingPlatform(
    avatarEntity,
    [Vector3.create(14, 0, -15), Vector3.create(14, 0, -17), Vector3.create(17, 0, -17), Vector3.create(17, 0, -15)],
    10
  )

  let avatarUpdateTimer = 10
  engine.addSystem((deltaTime: number) => {
    avatarUpdateTimer -= deltaTime

    if (avatarUpdateTimer <= 0) {
      avatarUpdateTimer = 10

      const component = AvatarShape.getMutable(avatarEntity)
      if (component.bodyShape == femaleBodyShapeId) component.bodyShape = maleBodyShapeId
      else component.bodyShape = femaleBodyShapeId
    }
  })

  // GIGANTIC MESHES
  // const giganticMesh = createCube(8, 8, 8)
  // Transform.getMutable(giganticMesh).scale = Vector3.scale(Vector3.One(), 1000000000)

  // AUDIO SOURCES
  const audioSourceEntity = engine.addEntity()
  MeshRenderer.setBox(audioSourceEntity)
  Transform.create(audioSourceEntity, {
    scale: Vector3.create(0.1, 0.1, 0.1)
  })
  AudioSource.create(audioSourceEntity, {
    playing: true,
    volume: 1,
    loop: true,
    audioClipUrl: 'audio/brahms-melody.mp3'
  })
  setAsMovingPlatform(audioSourceEntity, [Vector3.create(24, 1, -31), Vector3.create(24, 1, -33)], 10)

  // TEXT SHAPE
  const textShapeEntity = engine.addEntity(true)
  TextShape.create(textShapeEntity, {
    text: 'IA IA CTHULHU FHTAGN!',
    fontSize: 2
  })
  setAsMovingPlatform(textShapeEntity, [Vector3.create(30.5, 1, -16), Vector3.create(32.5, 1, -16)], 5)

  // HEIGHT CHECK...
  const highEntity = engine.addEntity()
  MeshRenderer.setBox(highEntity)
  Transform.create(highEntity, {
    scale: Vector3.create(5, 1, 5)
  })
  setAsMovingPlatform(highEntity, [Vector3.create(8, 45, -8), Vector3.create(8, 46, -8)], 2)
}

let timer = 6
const outsiderParent = createCube(18, 7, 6)
const outsiderParentChild = createCube(13, 3, 2)

function timedParentingSystem(deltaTime: number) {
  timer -= deltaTime
  if (timer <= 0) {
    timer = 6
    const transform = Transform.getMutable(outsiderParentChild)
    if (transform.parent == outsiderParent) {
      transform.parent = undefined
    } else {
      transform.parent = outsiderParent
    }
  }
}

engine.addSystem(timedParentingSystem)
engine.addSystem(platformsMovementSystem)
