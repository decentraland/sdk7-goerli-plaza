import { InputAction, MeshCollider, MeshRenderer, NftShape, Transform, engine, pointerEventsSystem } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { openNftDialog } from "~system/RestrictedActions"

export function displayNFTUI(contractAd : string , TokenID : string) : void {
  openNftDialog({
    urn : "urn:decentraland:ethereum:erc721:" + contractAd + ":" + TokenID
  })
  console.log("Displaying UI")
}


export function MakeNFTFrame(contractAd : string, TokenID : string, positionx: number,positiony: number, positionz: number , scalex : number , scaley : number , scalez : number , rotationx : number  , rotationy : number , rotationz : number ) : void {

  const nft = engine.addEntity()

  const interaction = engine.addEntity()

  MeshCollider.setBox(interaction)

  const shape = NftShape.create(nft,{ 
    urn : "urn:decentraland:ethereum:erc721:"+ contractAd + ":" + TokenID
   })

  Transform.create(nft , {
    position : Vector3.create(positionx,positiony,positionz),
    scale : Vector3.create(scalex,scaley,scalez),
    rotation : Quaternion.fromEulerDegrees(rotationx,rotationy,rotationz)
  })

  Transform.create(interaction, {
    position : Vector3.create(positionx,positiony,positionz),
    scale : Vector3.create(scalex,scaley,scalez),
    rotation : Quaternion.fromEulerDegrees(rotationx,rotationy,rotationz)
  })

  console.log("Shape Created")

  
}


export function createFullNFT(contractAd : string, TokenID : string, positionx: number,positiony: number, positionz: number , scalex : number , scaley : number , scalez : number , rotationx : number  , rotationy : number , rotationz : number ): void {

  const nft = engine.addEntity()

  const interaction = engine.addEntity()

  MeshCollider.setBox(interaction)

  const shape = NftShape.create(nft,{ 
    urn : "urn:decentraland:ethereum:erc721:"+ contractAd + ":" + TokenID
   })

  Transform.create(nft , {
    position : Vector3.create(positionx,positiony,positionz),
    scale : Vector3.create(scalex,scaley,scalez),
    rotation : Quaternion.fromEulerDegrees(rotationx,rotationy,rotationz)
  })

  Transform.create(interaction, {
    position : Vector3.create(positionx,positiony,positionz),
    scale : Vector3.create(scalex,scaley,scalez),
    rotation : Quaternion.fromEulerDegrees(rotationx,rotationy,rotationz)
  })

  pointerEventsSystem.onPointerDown({
    entity : interaction,
    opts : {
      button : InputAction.IA_POINTER,
      hoverText : "Click Here"
    }
  }, 
  function(){
    const urn2 = "urn:decentraland:ethereum:erc721:" + contractAd + ":" + TokenID

    console.log(urn2)

    openNftDialog({
      urn : "urn:decentraland:ethereum:erc721:" + contractAd + ":" + TokenID
    })
  }
  )
  

}



