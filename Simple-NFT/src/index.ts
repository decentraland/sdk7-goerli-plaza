import { InputAction, MeshCollider, MeshRenderer, Transform, engine, pointerEventsSystem } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";
import { MakeNFTFrame, createFullNFT, displayNFTUI } from "./Resources/nftUI";

const cube = engine.addEntity()
Transform.create(cube , {
    position : Vector3.create(5,1,5)
})
MeshRenderer.setBox(cube)
MeshCollider.setBox(cube)

pointerEventsSystem.onPointerDown(
    {
        entity : cube ,
        opts : {
            button : InputAction.IA_POINTER,
            hoverText : "Click Here"
        }
    }, 
    function () {
        displayNFTUI("0x07ccfd0fbada4ac3c22ecd38037ca5e5c0ad8cfa","48")
    }
)

MakeNFTFrame("0x07ccfd0fbada4ac3c22ecd38037ca5e5c0ad8cfa","48",8,1,8,1,1,1,0,0,0)
createFullNFT("0x07ccfd0fbada4ac3c22ecd38037ca5e5c0ad8cfa","48",10,1,10,1,1,1,0,0,0)
