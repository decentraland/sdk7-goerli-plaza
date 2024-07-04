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
  MakeNFTFrame('0x22c1f6050e56d2876009903609a2cc3fef83b415', '15726', 8, 1, 8, 1, 1, 1, 0, 0, 0)

  // Shortcut to make an NFT picture frame that is also clickable and includes a UI
  createFullNFT('0x41a322b28d0ff354040e2cbc676f0320d8c8850d', '3734', 10, 1, 10, 1, 1, 1, 0, 0, 0)

  // Manually create an NFT picture frame that is also clickable and includes a UI
  const manualNFT = engine.addEntity()
  Transform.create(manualNFT, {
    position: Vector3.create(5, 1, 5)
  })
  NftShape.create(manualNFT, {
    urn: 'urn:decentraland:matic:erc721:0xd27a967ee4f66226d49a18d4f9fd98f4aa0b26df:9567',
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
