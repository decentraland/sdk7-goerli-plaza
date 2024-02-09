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
import { displayNFTUI } from './Resources/nftUI'
import { setupUi } from './ui'
import { HoverInfo, hoverUISystem } from './Resources/hover-UI'

export function main() {
  setupUi()


  const manualNFT = engine.addEntity()
  Transform.create(manualNFT, {
    position: Vector3.create(5, 1, 5)
  })
  MeshRenderer.setPlane(manualNFT,)
  // NftShape.create(manualNFT, {
  //   urn: 'urn:decentraland:ethereum:erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:229795',
  //   color: Color4.Red(),
  //   style: NftFrameType.NFT_GOLD_CARVED
  // })
  // pointerEventsSystem.onPointerDown(
  //   {
  //     entity: manualNFT,
  //     opts: {
  //       button: InputAction.IA_POINTER,
  //       hoverText: 'Click Here'
  //     }
  //   },
  //   function () {
  //     displayNFTUI('0x06012c8cf97bead5deae237070f9587f8e7a266d', '229795')
  //   }
  // )
  MeshCollider.setPlane(manualNFT)

  HoverInfo.create(manualNFT, { title: "NFT Title" })

  engine.addSystem(hoverUISystem)
}
