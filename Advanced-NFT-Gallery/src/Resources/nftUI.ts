import { InputAction, MeshCollider, MeshRenderer, NftShape, PointerEventType, Transform, engine, inputSystem, pointerEventsSystem } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { openNftDialog } from '~system/RestrictedActions'

export function displayNFTUI(contractAd: string, TokenID: string): void {
  openNftDialog({
    urn: 'urn:decentraland:ethereum:erc721:' + contractAd + ':' + TokenID
  })
  console.log('Displaying UI')
}
