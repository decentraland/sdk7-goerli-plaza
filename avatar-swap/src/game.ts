import { getUserData } from "~system/UserIdentity"

// Set ground model
const groundEntity = engine.addEntity()
GltfContainer.create(groundEntity, {
    src: "models/baseGrass.glb"
})

// Set "Arissa" character model
const arissaCharaParentEntity = engine.addEntity()
const arissaCharaEntity = engine.addEntity()
GltfContainer.create(arissaCharaEntity, {
    src: "models/arissa.glb"
})
Transform.create(arissaCharaEntity, {
    position: Vector3.create(0, 1.75, 0),
    scale: Vector3.create(0, 0, 0),
    parent: arissaCharaParentEntity
})
Animator.create(arissaCharaEntity, {
    states: [
        {
            name: "Running",
            clip: "Running",
            loop: true
        },
        {
            name: "Idle",
            clip: "Idle",
            loop: true
        }
    ]
})

async function attachEntityToPlayer (entity: Entity){
    let userData = await getUserData({})
    if(!userData.data) return
    log(userData.data.userId)

    AvatarAttach.create(entity, {
        anchorPointId: AvatarAnchorPointType.AAPT_POSITION,
        avatarId: userData.data.userId
    })
}
attachEntityToPlayer(arissaCharaParentEntity)

// Set avatar modifier area to hide player avatar
class Area3D {
    public center: Vector3
    public size: Vector3
    minPosition: Vector3
    maxPosition: Vector3
    
    constructor(center: Vector3, size: Vector3) {
        this.center = center
        this.size = size
        
        const halfSize = Vector3.scale(size, 0.5)
        this.minPosition = Vector3.create(
            this.center.x - halfSize.x,
            this.center.y - halfSize.y,
            this.center.z - halfSize.z
        )
        this.maxPosition = Vector3.create(
            this.center.x + halfSize.x,
            this.center.y + halfSize.y,
            this.center.z + halfSize.z
        )
    }
    
    public isInside(targetPosition: Vector3): boolean {
        return targetPosition.x > this.minPosition.x
            && targetPosition.y > this.minPosition.y
            && targetPosition.z > this.minPosition.z
            && targetPosition.x < this.maxPosition.x
            && targetPosition.y < this.maxPosition.y
            && targetPosition.z < this.maxPosition.z
    }
}
const area = new Area3D(Vector3.create(8, 2, 10.5), Vector3.create(16, 4, 11))
const avatarHiderAreaEntity = engine.addEntity()
AvatarModifierArea.create(avatarHiderAreaEntity, {
    area: area.size,
    modifiers: [AvatarModifierType.AMT_HIDE_AVATARS],
    excludeIds: []
})
Transform.create(avatarHiderAreaEntity, {
    position: area.center
})

// Detection to enable Arissa character when player avatar is hidden...
var lastPlayerPos: Vector3 | undefined = undefined
function detectPlayerEnteredModifierArea (dt: number) {
    if (!Transform.has(engine.PlayerEntity)) return
    
    const playerPos = Transform.get(engine.PlayerEntity).position
    const moved = playerPos != lastPlayerPos

    Animator.getClip(arissaCharaEntity, "Idle").playing = !moved
    Animator.getClip(arissaCharaEntity, "Running").playing = moved 
    
    if (!moved) return

    const playerIsInsideHidingArea = area.isInside(playerPos)
    const arissaCharacterTransform = Transform.getMutable(arissaCharaEntity)
    arissaCharacterTransform.scale.x = playerIsInsideHidingArea ? 1.1 : 0
    arissaCharacterTransform.scale.y = playerIsInsideHidingArea ? 1.1 : 0
    arissaCharacterTransform.scale.z = playerIsInsideHidingArea ? 1.1 : 0

    lastPlayerPos = playerPos
}
engine.addSystem(detectPlayerEnteredModifierArea)

// http://127.0.0.1:8000/?position=23%2C23&SCENE_DEBUG_PANEL=&ENABLE_ECS7=&renderer-branch=dev&kernel-version=2.0.0-3541633721.commit-c2611bc&realm=LocalPreview
// npm link: http://127.0.0.1:8000/?position=23%2C23&SCENE_DEBUG_PANEL=&ENABLE_ECS7=&renderer-branch=dev&realm=LocalPreview

// http://127.0.0.1:8000/?position=23%2C23&SCENE_DEBUG_PANEL=&ENABLE_ECS7=&kernel-version=2.0.0-3541633721.commit-c2611bc&realm=LocalPreview&ws=ws://localhost:7666/dcl
// npm link: http://127.0.0.1:8000/?position=23%2C23&SCENE_DEBUG_PANEL=&ENABLE_ECS7=&realm=LocalPreview&ws=ws://localhost:7666/dcl
