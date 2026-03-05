import { AvatarAnchorPointType, AvatarAttach, Billboard, BillboardMode, ColliderLayer, EasingFunction, engine, Entity, GltfContainer, InputAction, inputSystem, MeshCollider, MeshRenderer, PlayerIdentityData, PointerEvents, pointerEventsSystem, PointerEventType, RaycastQueryType, raycastSystem, Schemas, Transform, Tween, TweenSequence, VisibilityComponent } from "@dcl/sdk/ecs"
import { Color4, Quaternion, Vector3 } from "@dcl/sdk/math"
import { audioPlayer } from "../../audioPlayer"
import { MessageBus } from "@dcl/sdk/message-bus"
import { movePlayerTo, triggerEmote, triggerSceneEmote } from "~system/RestrictedActions"
import { isHandFull, isPlayerMoving, setHandFull } from "../../../playerState"
import { hideCakeControlsUI, showCakeControlsUI } from "./ui/cakeControls"
import { hideCakeNotificationListUI, requestCakeNotification, showCakeNotificationListUI } from "./ui/cakeNotification"
import { showCakeSplashUI } from "./ui/cakeSplash"
import { PlayerDataService } from "../../playerDataService"
//import { ConfettiManager } from "../confetti/confettiPopper"
import { timers } from "@dcl-sdk/utils"

const cakeFolder = "assets/scene/cake/"
const CAKE_POSITION = Vector3.create(8, -0.5, 8)
const CAKE_RADIUS = 3.6
const CAKE_PICKUP_RADIUS = 1.5
const MAX_PLAYER_COUNT = 150
const MAX_BLAST_COUNT = 32
const AMMO_DEFAULT = 1


const CakeProjectileComponent = engine.defineComponent('CakeProjectileComponent', {
    active: Schemas.Boolean,
    startPosition: Schemas.Vector3,
    targetPosition: Schemas.Vector3,    
    lifetime: Schemas.Number,
    elapsed: Schemas.Number,
    movePivot: Schemas.Entity,
    rotationPivot: Schemas.Entity,
})

const CakeColliderComponent = engine.defineComponent('CakeColliderComponent', {
    playerId: Schemas.String,
    rootEntity: Schemas.Entity,
})

export interface CakeProjectileSchema {
    targetPlayerId : string,
    playerId: string,
    isExploding: boolean,
    explosionRotation: Quaternion
}

export interface CakeAttachedSchema {
    playerId: string
}



var playerHasCake: boolean = false
var cooldownTimer: number = 0
const cooldownDuration: number = 0.2

export class CakeManager {
    private static instance: CakeManager
    private isActive: boolean = false
    cakeTable: Entity
    cakeBaseEntity: Entity
    cakeMidEntity: Entity
    cakeTopEntity: Entity
    cakeNumberEntity: Entity
    cakeProjectileEntities: Entity[] = []   
    cakeColliderEntities: Entity[] = []
    explosionEntities: Entity[] = []
    cakeSliceEntity: Entity = engine.addEntity()
    wasCakeClicked: boolean = false
    blastEntities: Entity[] = []  
    sceneMessageBus = new MessageBus()
    playerAmmo: number = 0
    playerCake: Entity
    uiPositionEntity: Entity
    
    

    static getInstance(): CakeManager {
        if (!CakeManager.instance) {
            CakeManager.instance = new CakeManager()
        }
        return CakeManager.instance
    }

    private constructor() {
        //init confetti system
        this.playerCake = engine.addEntity()
        this.cakeTable = engine.addEntity()
        this.cakeBaseEntity = engine.addEntity()
        this.cakeMidEntity = engine.addEntity()
        this.cakeTopEntity = engine.addEntity()
        this.cakeNumberEntity = engine.addEntity()
        this.cakeSliceEntity = engine.addEntity()
        this.uiPositionEntity = engine.addEntity()
        Transform.create(this.uiPositionEntity, {
            position: Vector3.create(0, 100, 0)
        })
        ///this.initCake()
        engine.addSystem(cakeSystem)
        this.sceneMessageBus.on('throw-cake', (data: CakeProjectileSchema) => {

            if(!this.isActive){
                return
            }
            console.log('throwing cake from player ' + data.playerId + ' to player ' + data.targetPlayerId)

            let startPosition = Vector3.create(8, 0, 8)
            let targetPosition = Vector3.create(10, 4, 3)
            let isExploding = false

            let playerGrp = engine.getEntitiesWith(PlayerIdentityData,Transform)

            for(const [player,playerTransform] of playerGrp){
                if(PlayerIdentityData.get(player).address === data.playerId){
                    console.log('start position found: ' + Transform.get(player).position.x + "," + Transform.get(player).position.y + "," + Transform.get(player).position.z)                   
                    startPosition = Transform.get(player).position
                    //startPosition.y += 1.8
                    
                }
                else if(PlayerIdentityData.get(player).address === data.targetPlayerId){
                    console.log('target position found: ' + Transform.get(player).position.x + "," + Transform.get(player).position.y + "," + Transform.get(player).position.z)                   
                    targetPosition = Transform.get(player).position
                    //targetPosition.y += 1.8
                    
                }
            }

            
            isExploding = false

            console.log('start position: ' + startPosition.x + "," +startPosition.y + "," + startPosition.z + ' target position: ' + targetPosition.x + "," + targetPosition.y + "," + targetPosition.z)
          //  }
            this.throwCake(startPosition, targetPosition, isExploding, data.explosionRotation)

            this.showCakeNotification(data.playerId, data.targetPlayerId)
            if(PlayerIdentityData.get(engine.PlayerEntity).address === data.targetPlayerId){
                showCakeSplashUI()
            }
        })  
        
    }

    public enable(){
        if(this.isActive){
            return
        }
        this.isActive = true
        this.addCake(CAKE_POSITION)
        playerHasCake = false
        this.wasCakeClicked = false
        this.playerAmmo = 0        
        this.loadCakeAssets()
        showCakeNotificationListUI()
    }

    public disable(){
        if(!this.isActive){
            return
        }
        this.isActive = false
        if(playerHasCake){
            this.hideAllUi()
            
        }
        playerHasCake = false
        this.wasCakeClicked = false
        setHandFull(false)
        this.playerAmmo = 0        
        engine.removeEntity(this.cakeTable)
        engine.removeEntity(this.cakeBaseEntity)
        engine.removeEntity(this.cakeMidEntity)
        engine.removeEntity(this.cakeTopEntity)
        engine.removeEntity(this.cakeNumberEntity)
        engine.removeEntity(this.cakeSliceEntity)

        timers.setTimeout(() => {
            while(this.cakeColliderEntities.length > 0){
                let cakeCollider = this.cakeColliderEntities.shift()
                if(cakeCollider){
                    engine.removeEntity(cakeCollider)
                }
            }            
            while(this.blastEntities.length > 0){
                let blast = this.blastEntities.shift()
                if(blast){
                    engine.removeEntity(blast)
                }
            }
            while(this.explosionEntities.length > 0){
                let explosion = this.explosionEntities.shift()
                if(explosion){
                    engine.removeEntity(explosion)
                }
            }
        }, 500)
       
    }

    public getTargetPosition(playerId: string):Vector3{
        let playerGrp = engine.getEntitiesWith(PlayerIdentityData,Transform)
        for(const [player,playerTransform] of playerGrp){
            if(PlayerIdentityData.get(player).address === playerId){
                return Transform.get(player).position
            }
        }
        return Vector3.create(56, 4, 40)
    }

    public turnOffCakeColliders(){
        let colliderGrp = engine.getEntitiesWith(CakeColliderComponent,Transform)
        for(const [collider,colliderTransform] of colliderGrp){
            MeshCollider.getMutable(collider).collisionMask = ColliderLayer.CL_NONE
        }
    }

    public turnOnCakeColliders(){
        let colliderGrp = engine.getEntitiesWith(CakeColliderComponent,Transform)
        for(const [collider,colliderTransform] of colliderGrp){
            MeshCollider.getMutable(collider).collisionMask = ColliderLayer.CL_POINTER
        }
    }

    public addCake(position: Vector3){
        this.cakeTable = engine.addEntity()
        Transform.create(this.cakeTable, {
            position: position,
            rotation: Quaternion.fromEulerDegrees(0, -90, 0),
            scale: Vector3.create(2, 2, 2)
        })    
       // MeshCollider.setBox(this.cakeTable)
        GltfContainer.create(this.cakeTable, {
            src: cakeFolder + "cake_table.glb",
            invisibleMeshesCollisionMask: ColliderLayer.CL_POINTER
        })
    
        pointerEventsSystem.onPointerDown(
            {
                entity: this.cakeTable,
                opts: { button: InputAction.IA_POINTER, hoverText: 'GRAB CAKE', showFeedback: true, maxDistance: CAKE_PICKUP_RADIUS },
            },
            function () {
                console.log('picked a cake')
                CakeManager.getInstance().pickupCake()
            }
        )   

        this.cakeBaseEntity = engine.addEntity()
        Transform.create(this.cakeBaseEntity, {
            position: Vector3.create(0, 0, 0),
            rotation: Quaternion.create(0, 0, 0, 1),
            scale: Vector3.create(1, 1, 1),
            parent: this.cakeTable
        })
        GltfContainer.create(this.cakeBaseEntity, {
            src: cakeFolder + "cake_base.glb"
        })
        Tween.setRotateContinuous(this.cakeBaseEntity, Quaternion.fromEulerDegrees(0, 1, 0), 10)

        this.cakeMidEntity = engine.addEntity()
        Transform.create(this.cakeMidEntity, {
            position: Vector3.create(0, 0, 0),
            rotation: Quaternion.create(0, 0, 0, 1),
            scale: Vector3.create(1, 1, 1),
            parent: this.cakeTable
        })
        GltfContainer.create(this.cakeMidEntity, {
            src: cakeFolder + "cake_mid.glb"
        })
        Tween.setRotateContinuous(this.cakeMidEntity, Quaternion.fromEulerDegrees(0, 1, 0), -8)

        this.cakeTopEntity = engine.addEntity()
        Transform.create(this.cakeTopEntity, {
            position: Vector3.create(0, 0, 0),
            rotation: Quaternion.create(0, 0, 0, 1),
            scale: Vector3.create(1, 1, 1),
            parent: this.cakeTable
        })
        GltfContainer.create(this.cakeTopEntity, {
            src: cakeFolder + "cake_top.glb"
        })
        Tween.setRotateContinuous(this.cakeTopEntity, Quaternion.fromEulerDegrees(0, 1, 0), 9)

        this.cakeNumberEntity = engine.addEntity()
        Transform.create(this.cakeNumberEntity, {
            position: Vector3.create(0, 0, 0),
            rotation: Quaternion.create(0, 0, 0, 1),
            scale: Vector3.create(1, 1, 1),
            parent: this.cakeTable
        })
        GltfContainer.create(this.cakeNumberEntity, {
            src: cakeFolder + "cake_number6.glb"
        })
        Tween.setRotateContinuous(this.cakeNumberEntity, Quaternion.fromEulerDegrees(0, 1, 0), -7)
        
    }

    public addCakeCollider():Entity{

        let colliderRoot = engine.addEntity()
        Transform.create(colliderRoot, {
            position: Vector3.create(0, 0, 0),
            rotation: Quaternion.create(0, 0, 0, 1),
            scale: Vector3.create(1, 1, 1)
        })
        let cakeCollider = engine.addEntity()
        Transform.create(cakeCollider, {
            position: Vector3.create(0, -1.0, 0),
            rotation: Quaternion.create(0, 0, 0, 1),
            scale: Vector3.create(0.75, 2, 0.75),
            parent: colliderRoot
        })  
        MeshCollider.setBox(cakeCollider, ColliderLayer.CL_POINTER)  
        
        return cakeCollider
    }

    public addCakeSlice():Entity{
       this.cakeSliceEntity = engine.addEntity()
        Transform.create(this.cakeSliceEntity, {
            position: Vector3.create(0, 0, 0),
            rotation: Quaternion.create(0, 0, 0, 1),
            scale: Vector3.create(1, 1, 1)
        })
        GltfContainer.create(this.cakeSliceEntity, {
            src: cakeFolder + "cake_slice.glb"
        })
        VisibilityComponent.create(this.cakeSliceEntity, {
            visible: false
        })
        AvatarAttach.createOrReplace(this.cakeSliceEntity, {
            //avatarId: PlayerIdentityData.get(engine.PlayerEntity).address,
            anchorPointId: AvatarAnchorPointType.AAPT_RIGHT_HAND
        })
        return this.cakeSliceEntity
    }

    public loadCakeAssets() {        

      
        //init blast pool
        for (let i = 0; i < MAX_BLAST_COUNT; i++) {

            let movePivot = engine.addEntity()
            Transform.create(movePivot, {               
            })
            let blastEntity = engine.addEntity()
            Transform.create(blastEntity, {
                position: Vector3.create(0, 0, 0),
                rotation: Quaternion.create(0, 0, 0, 1),
                scale: Vector3.create(1, 1, 3),
                parent: movePivot
            })
            GltfContainer.create(blastEntity, {
                src: cakeFolder + "cake_blast.glb"
            })
            VisibilityComponent.create(blastEntity, {
                visible: false
            })
            this.blastEntities.push(blastEntity)
        }   

        //init explosion pool
        for (let i = 0; i < 10; i++) {
            let explosionEntity = engine.addEntity()
            Transform.create(explosionEntity, {
                position: Vector3.create(0, 0, 0),
                rotation: Quaternion.create(0, 0, 0, 1),
            })
            VisibilityComponent.create(explosionEntity, {
                visible: false
            })
            GltfContainer.create(explosionEntity, {
                src: cakeFolder + "cake_explosion.glb"
            })
            this.explosionEntities.push(explosionEntity)
        }
        
        //init cake colliders
        for(let i = 0; i < MAX_PLAYER_COUNT; i++){
            let cakeCollider = this.addCakeCollider()  
            this.cakeColliderEntities.push(cakeCollider)
        }
        this.addCakeSlice()
       
       
    }

    attachCakeColliders(){

        this.turnOnCakeColliders()
        let playerGrp = engine.getEntitiesWith(PlayerIdentityData,Transform)
        for(const [player,playerTransform] of playerGrp){


            //don't attach cake collider to self
            if(PlayerIdentityData.get(player).address === PlayerIdentityData.get(engine.PlayerEntity).address){
                continue
            }
            let cakeCollider = this.cakeColliderEntities.shift()
           
            
            if(cakeCollider){
                CakeColliderComponent.createOrReplace(cakeCollider, {
                    playerId: PlayerIdentityData.get(player).address,
                    
                }) 
                let root = Transform.get(cakeCollider).parent
                if(root){
                    AvatarAttach.createOrReplace(root, {
                            avatarId: PlayerIdentityData.get(player).address,
                            anchorPointId: AvatarAnchorPointType.AAPT_NAME_TAG
                        })
                    console.log('attaching cake collider to player ', PlayerIdentityData.get(player).address)
                   // Transform.getMutable(root).parent = player
                }
                console.log('added cake collider for player ', PlayerIdentityData.get(player).address)  
                pointerEventsSystem.onPointerDown(
                    {
                        entity: cakeCollider,
                        opts: { button: InputAction.IA_POINTER, hoverText: 'THROW CAKE', showFeedback: true, maxDistance: 32 },
                    },
                    function () {
                        console.log('throwing a cake')
                        cooldownTimer = cooldownDuration
                        if(playerHasCake){
                            if(CakeManager.getInstance().playerAmmo <= 0){
                                CakeManager.getInstance().hideCake()
                                return
                            } 
                            CakeManager.getInstance().consumeAmmo()
            
                            triggerEmote({ predefinedEmote: 'throw' })

                        
            
                        
                            audioPlayer.playSingleSound({audioClipUrl: "assets/sounds/throw_01.mp3", loop:false, volume: 0.8})
                            
                            if(!isPlayerMoving()){
                                movePlayerTo({
                                    newRelativePosition: Transform.get(engine.PlayerEntity).position,
                                    avatarTarget: CakeManager.getInstance().getTargetPosition(CakeColliderComponent.get(cakeCollider).playerId),
                                })
                            }
                            VisibilityComponent.getMutable(CakeManager.getInstance().cakeSliceEntity).visible = false
                            CakeManager.getInstance().sceneMessageBus.emit('throw-cake', {
                                targetPlayerId: CakeColliderComponent.get(cakeCollider).playerId,
                                playerId: PlayerIdentityData.get(engine.PlayerEntity).address,
                                    isExploding: false,
                                    explosionRotation: Quaternion.fromEulerDegrees(0, 0, 0)
                                })
                                      
                        }
                        
                    }) 
                    this.cakeColliderEntities.push(cakeCollider)
            }
        }
    }

    public getAmmo(){
        return this.playerAmmo
    }

    public getUiHeight():number{
        return Transform.get(this.uiPositionEntity).position.y
    }

    public hideAllUi(){
        hideCakeControlsUI()
        hideCakeNotificationListUI()
    }

    public pickupCake(){

        if(isHandFull()){
            console.log('hand is full')
            //ConfettiManager.getInstance().hidePopper()
        }
        if(playerHasCake || this.wasCakeClicked){
            return
        }
        setHandFull(true)

       
        this.attachCakeColliders()
        let teleportPosition = Vector3.add(CAKE_POSITION, Vector3.scale(Vector3.normalize(Vector3.subtract(Transform.get(engine.PlayerEntity).position, CAKE_POSITION)), CAKE_RADIUS))
        teleportPosition.y = Transform.get(engine.PlayerEntity).position.y
        movePlayerTo({
            newRelativePosition: teleportPosition,
            avatarTarget: CAKE_POSITION,            
            
        })
        this.wasCakeClicked = true        
           
        audioPlayer.playSingleSound({audioClipUrl: "assets/sounds/ammo_pickup.mp3", loop:false, volume: 0.3})
        triggerSceneEmote({ src: "assets/models/anims/PickUp_Anim_emote.glb", loop: false })
        
        //reload delay
        timers.setTimeout(() => {
            playerHasCake = true
            this.playerAmmo = AMMO_DEFAULT            
            showCakeControlsUI()            
        }, 500)
        timers.setTimeout(() => {
            VisibilityComponent.getMutable(this.cakeSliceEntity).visible = true
        }, 700)
    }

    public throwCake(startPos: Vector3,targetPosition: Vector3, isExploding: boolean = false, explosionRotation: Quaternion = Quaternion.fromEulerDegrees(0, 0, 0)) {       

        
        let startRotation = Quaternion.fromToRotation(Vector3.Forward(), Vector3.subtract(targetPosition, startPos))
        let targetPosHeightFix = Vector3.add(targetPosition, Vector3.create(0, 1.8, 0))
        let shootDistance = Vector3.distance(startPos, targetPosition)
        let shootDuration = shootDistance / 2
        let fallDistance = Vector3.distance(targetPosition, Vector3.create(targetPosition.x, -20, targetPosition.z))
        let fallDuration = fallDistance / 3      
        let rotDir = Math.random() > 0.5 ? 1 : -1
        let blast = this.blastEntities.shift()
        let explosion = this.explosionEntities.shift()

        

        if(explosion){

            timers.setTimeout(() => {
                if(explosion){
                    let randScale = 1+Math.random()*1
                    VisibilityComponent.getMutable(explosion).visible = true
                    Transform.getMutable(explosion).position = targetPosHeightFix
                    Transform.getMutable(explosion).rotation = Quaternion.multiply( startRotation, Quaternion.fromEulerDegrees(0, 0, Math.random() * 360))
                    Tween.createOrReplace(explosion,{
                        duration: 250,
                        easingFunction: EasingFunction.EF_EASEOUTSINE,
                        currentTime: 0,
                        playing: true,
                        mode: Tween.Mode.Scale({
                            start: Vector3.create(0.1, 0.1, 0.1),
                            end: Vector3.create(randScale,randScale,randScale)
                        })
                    })
                    TweenSequence.createOrReplace(explosion,{
                        sequence: [
                            // {
                            //     duration: 500,
                            //     easingFunction: EasingFunction.EF_EASEINEXPO,
                            //     currentTime: 0,
                            //     playing: true,
                            //     mode: Tween.Mode.Move({
                            //         start: targetPosHeightFix,
                            //         end: Vector3.create(targetPosHeightFix.x, targetPosHeightFix.y-0.3, targetPosHeightFix.z)
                            //     })
                            // },
                            {
                                duration: 10,
                                easingFunction: EasingFunction.EF_LINEAR,
                                currentTime: 0,
                                playing: true,
                                mode: Tween.Mode.Scale({
                                    start: Vector3.create(randScale, randScale, randScale),
                                    end: Vector3.create(0.001, 0.001, 0.001)
                                })
                            }
                        ]
                    })
                }
            }, shootDuration*75)
            this.explosionEntities.push(explosion)
        }

        if(blast){
            
            VisibilityComponent.getMutable(blast).visible = true

           
            Tween.createOrReplace(blast,{
                duration: shootDuration * 100,
                easingFunction: EasingFunction.EF_EASEOUTSINE,
                currentTime: 0,
                playing: true,
                mode: Tween.Mode.Rotate({
                    start: startRotation,
                    end: Quaternion.multiply( startRotation, Quaternion.fromEulerDegrees(0, 0, 180 * rotDir))
                })
            })
            let root = Transform.get(blast).parent
            if(root){
                Tween.createOrReplace(root,{
                    duration: shootDuration * 100,
                    easingFunction: EasingFunction.EF_EASEOUTCUBIC,
                    currentTime: 0,
                    playing: true,
                    mode: Tween.Mode.Move({
                        start:  Vector3.add(startPos, Vector3.create(0, 1.8, 0)),
                        end: targetPosHeightFix
                    })
                })
                timers.setTimeout(() => {
                    if(blast){
                        console.log('hiding blast')
                     VisibilityComponent.getMutable(blast).visible = false
                    }
                    
                }, shootDuration * 75)
                this.blastEntities.push(blast)
            }
        }

       
    }

    public consumeAmmo(){
        this.playerAmmo--
        if(this.playerAmmo <= 0){
            this.hideCake()
        }
    }

    public hideCake(){
        if(playerHasCake){          
            playerHasCake = false
            this.wasCakeClicked = false
           
            hideCakeControlsUI()

            timers.setTimeout(() => {
                if(!playerHasCake){
                    this.turnOffCakeColliders()
                    VisibilityComponent.getMutable(this.cakeSliceEntity).visible = false
                }
            }, 300)
            setHandFull(false)
        }            
    }

    public async showCakeNotification(playerId:string, targetPlayerId:string){
        const playerNamePromise = PlayerDataService.instance().asyncGetCreatorName(playerId)
        const targetPlayerNamePromise = PlayerDataService.instance().asyncGetCreatorName(targetPlayerId)

        const [playerName, targetPlayerName] = await Promise.all([playerNamePromise, targetPlayerNamePromise])
        if(playerName && targetPlayerName){
            requestCakeNotification(playerName, targetPlayerName, 5)
        }
    }
}

export function cakeSystem(dt: number) {

     
    if(inputSystem.getInputCommand(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN) && playerHasCake){
        CakeManager.getInstance().hideCake()
        return
    }   

    if(cooldownTimer > 0){
        cooldownTimer -= dt        
        return
    }
    if(inputSystem.getInputCommand(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN) && playerHasCake){
        console.log('eating a cake')
        CakeManager.getInstance().consumeAmmo()
        triggerSceneEmote({ src: "assets/scene/cake/Cake_Emote.glb", loop: false })
     }
    
}