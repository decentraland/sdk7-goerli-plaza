import {
    engine, GltfContainer, NftShape, MeshCollider, MeshRenderer, Transform, VisibilityComponent
} from '@dcl/sdk/ecs'
import { Color3, Vector3, Quaternion } from '@dcl/sdk/math'
import { createCube } from './factory'
import {createMovingPlatform, platformsMovementSystem, setAsMovingPlatform} from "./movingPlatform";

// export all the functions required to make the scene work
export * from '@dcl/sdk'

// PARENTING BOUNDS TESTING
const grandParentEntity = createCube(4, 7, 2)
const parentEntity = createCube(2, -2, 0)
const childEntity1 = createCube(-2, -2, 0)
const childEntity2 = createCube(2, -2, 0)

Transform.getMutable(parentEntity).parent = grandParentEntity
Transform.getMutable(childEntity1).parent = parentEntity
Transform.getMutable(childEntity2).parent = parentEntity
setAsMovingPlatform(grandParentEntity,
    [
        Vector3.create(2, 7, 2),
        Vector3.create(-6, 7, 2)
    ],
    30
)

const outsiderParent = createCube(18, 7, 6)
const outsiderParentChild = createCube(13, 3, 2)
let timer = 6
function timedParentingSystem(deltaTime: number) {
    timer -= deltaTime
    if (timer <= 0) {
        timer = 6
        const transform = Transform.getMutable(outsiderParentChild)
        if (transform.parent == outsiderParent) {
            transform.parent = null
        } else {
            transform.parent = outsiderParent
        }
    }
}
engine.addSystem(timedParentingSystem)

// MOVING OBJECTS TESTING
createMovingPlatform(
    "models/movingPlatform.glb",
    [
        Vector3.create(2, 1.5, 8),
        Vector3.create(2, 1.5, 6),
        Vector3.create(-2, 1.5, 6),
        Vector3.create(-2, 1.5, 4),
        Vector3.create(2, 1.5, 4),
    ],
    5
)
createMovingPlatform(
    "models/movingPlatform.glb",
    [
        Vector3.create(20, 1.5, 6),
        Vector3.create(20, 1.5, 4)
    ],
    5
)

const boxEntity = engine.addEntity()
MeshRenderer.setBox(boxEntity)
VisibilityComponent.create(boxEntity, {
    visible: false
})
setAsMovingPlatform(boxEntity,
    [
        Vector3.create(14, 1.5, 8),
        Vector3.create(14, 1.5, 6),
        Vector3.create(18, 1.5, 6),
        Vector3.create(18, 1.5, 4),
        Vector3.create(14, 1.5, 4),
    ],
    5
)

const boxColliderEntity = engine.addEntity()
MeshCollider.setBox(boxColliderEntity)
setAsMovingPlatform(boxColliderEntity,
    [
        Vector3.create(2, 1.5, 14),
        Vector3.create(2, 1.5, 18),
        Vector3.create(4, 1.5, 18),
        Vector3.create(4, 1.5, 14),
        Vector3.create(6, 1.5, 14),
    ],
    9
)

// NFT SHAPE

const nftShapeEntity = engine.addEntity()
NftShape.create(nftShapeEntity, {
    src: 'ethereum://0x06012c8cf97bead5deae237070f9587f8e7a266d/558536'
})
setAsMovingPlatform(nftShapeEntity,
    [
        Vector3.create(8, 1.5, -24),
        Vector3.create(40, 1.5, -24)
    ],
    180
)

// IRREGULAR SHAPED MESH
const irregularMeshEntity = engine.addEntity()
GltfContainer.create(irregularMeshEntity, {
    src: "models/irregular.glb"
})
Transform.create(irregularMeshEntity, {
    position: Vector3.create(16, 1, -16),
    rotation: Quaternion.fromEulerDegrees(0, -90, 0)
})
setAsMovingPlatform(irregularMeshEntity,
    [
        Vector3.create(16, 1, -16),
        Vector3.create(16, 1, -8)
    ],
    15
)

engine.addSystem(platformsMovementSystem)