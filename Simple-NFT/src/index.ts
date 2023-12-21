import {
  InputAction,
  MeshCollider,
  MeshRenderer,
  NftFrameType,
  NftShape,
  Transform,
  engine,
  pointerEventsSystem
} from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { MakeNFTFrame, createFullNFT, displayNFTUI } from './Resources/nftUI'
import { setupUi } from './ui'

export function main() {
  setupUi()

  // Shortcut to make an NFT picture frame
  MakeNFTFrame('0x07ccfd0fbada4ac3c22ecd38037ca5e5c0ad8cfa', '48', 8, 1, 8, 1, 1, 1, 0, 0, 0)

  // Shortcut to make an NFT picture frame that is also clickable and includes a UI
  createFullNFT('0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2', '4068', 10, 1, 10, 1, 1, 1, 0, 0, 0)

  // Manually create an NFT picture frame that is also clickable and includes a UI
  const manualNFT = engine.addEntity()
  Transform.create(manualNFT, {
    position: Vector3.create(5, 1, 5)
  })
  NftShape.create(manualNFT, {
    urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:229795',
    color: Color4.Red(),
    style: NftFrameType.NFT_GOLD_CARVED
  })
  pointerEventsSystem.onPointerDown(
    {
      entity: manualNFT,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Click Here'
      }
    },
    function () {
      displayNFTUI('0x06012c8cf97bead5deae237070f9587f8e7a266d', '229795')
    }
  )
}
