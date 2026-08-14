import { engine, InputAction, inputSystem, PointerEventType, Schemas, Transform } from "@dcl/sdk/ecs";
import { Quaternion, Vector3 } from "@dcl/sdk/math";

export const PlayerState = engine.defineComponent('player-state-component', {    
    isPlayerInteractingWithMenus:Schemas.Boolean,
    isPlayerInteractingWithObjects:Schemas.Boolean,
    inventory:Schemas.Array(Schemas.Entity),
    backpackRoot:Schemas.Entity,
    lastUsedObject:Schemas.Entity,
    isTutorialActive:Schemas.Boolean,
    isHandFull:Schemas.Boolean,
    lastCameraMode:Schemas.Number,
    isPlayerMoving:Schemas.Boolean,
    isPlayerMovingForward:Schemas.Boolean,
    isPlayerMovingBackward:Schemas.Boolean,
    isPlayerMovingLeft:Schemas.Boolean,
    isPlayerMovingRight:Schemas.Boolean,
})

export function initPlayerState(){

    let backpackRoot = engine.addEntity()
    Transform.create(backpackRoot, {
        position: Vector3.create(0, 1.4, -0.3),
        rotation: Quaternion.fromEulerDegrees(0, 0, 0),
        scale: Vector3.create(1, 1, 1),
        parent: engine.PlayerEntity
    })
    PlayerState.createOrReplace(engine.PlayerEntity, {
        isPlayerInteractingWithMenus:false,
        isPlayerInteractingWithObjects:false,
        inventory:[],
        backpackRoot:backpackRoot,
        lastUsedObject:undefined,
        isTutorialActive:false,
        isHandFull:false,
        lastCameraMode:-1,
        isPlayerMoving:false,
        isPlayerMovingForward:false,
        isPlayerMovingBackward:false,
        isPlayerMovingLeft:false,
        isPlayerMovingRight:false
    })

    engine.addSystem((dt:number)=>{

         
       let playerState = PlayerState.getMutable(engine.PlayerEntity)
        
        if(inputSystem.getInputCommand(InputAction.IA_BACKWARD, PointerEventType.PET_DOWN)){
            playerState.isPlayerMovingBackward = true
        }
        if(inputSystem.getInputCommand(InputAction.IA_BACKWARD, PointerEventType.PET_UP)){
            playerState.isPlayerMovingBackward = false
        }

        if(inputSystem.getInputCommand(InputAction.IA_FORWARD, PointerEventType.PET_DOWN)){
            playerState.isPlayerMovingForward = true
        }
        if(inputSystem.getInputCommand(InputAction.IA_FORWARD, PointerEventType.PET_UP)){
            playerState.isPlayerMovingForward = false
        }

        if(inputSystem.getInputCommand(InputAction.IA_LEFT, PointerEventType.PET_DOWN)){
            playerState.isPlayerMovingLeft = true
        }
        if(inputSystem.getInputCommand(InputAction.IA_LEFT, PointerEventType.PET_UP)){
            playerState.isPlayerMovingLeft = false
        }

        if(inputSystem.getInputCommand(InputAction.IA_RIGHT, PointerEventType.PET_DOWN)){
            playerState.isPlayerMovingRight = true
        }
        if(inputSystem.getInputCommand(InputAction.IA_RIGHT, PointerEventType.PET_UP)){
            playerState.isPlayerMovingRight = false
        }

        let isMoving = playerState.isPlayerMovingForward || playerState.isPlayerMovingBackward || playerState.isPlayerMovingLeft || playerState.isPlayerMovingRight
        setPlayerMoving(isMoving)
    })
}

export function isPlayerInteractingWithMenus():boolean{
    return PlayerState.get(engine.PlayerEntity).isPlayerInteractingWithMenus
}

export function isPlayerInteractingWithObjects():boolean{
    return PlayerState.get(engine.PlayerEntity).isPlayerInteractingWithObjects
}

export function isPlayerInTutorial():boolean{
    return PlayerState.get(engine.PlayerEntity).isTutorialActive
}

export function isPlayerMoving():boolean{
    return PlayerState.get(engine.PlayerEntity).isPlayerMoving
}

export function setPlayerMoving(isMoving:boolean){
    PlayerState.getMutable(engine.PlayerEntity).isPlayerMoving = isMoving
}

export function setHandFull(isFull:boolean){
    PlayerState.getMutable(engine.PlayerEntity).isHandFull = isFull
}

export function isHandFull():boolean{
    return PlayerState.get(engine.PlayerEntity).isHandFull
}