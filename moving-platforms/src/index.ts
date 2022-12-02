import { 
    Animator,
    AudioSource,
    engine,
    Entity,
    GltfContainer,
    Material,
    MeshRenderer,
    Transform
} from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { createMovingPlatform } from "./modules/movingPlatform";
import {Area3D} from "./definitions";
export * from '@dcl/sdk'

// Instantiate base models
GltfContainer.create(engine.addEntity(), {
    src: "models/baseLight.glb"
})

GltfContainer.create(engine.addEntity(), {
    src: "models/staticPlatforms.glb"
})

// Instantiate moving platforms
createMovingPlatform(
    "models/movingPlatform.glb",
    [Vector3.create(2, 1.5, 14), Vector3.create(2, 1.5, 12)],
    3
)

createMovingPlatform(
    "models/movingPlatform.glb",
    [Vector3.create(4, 1.5, 14), Vector3.create(4, 4, 14)],
    2
)

// Instantiate triggered moving platform
createMovingPlatform(
    "models/triggerPlatform.glb",
    [Vector3.create(14, 4, 12), Vector3.create(14, 4, 4)],
    3,
    Vector3.create(2, 2, 2)
)

// Instantiate moving platform with more waypoints
createMovingPlatform(
    "models/movingPlatform.glb",
    [
        Vector3.create(6.5, 7, 4),
        Vector3.create(6.5, 7, 12),
        Vector3.create(6.5, 10.5, 12),
        Vector3.create(6.5, 10.5, 4)
    ],
    10
)

// Instantiate pickable coin
const coinEntity = engine.addEntity()
GltfContainer.create(coinEntity, {
    src: "models/starCoin.glb"
})
Transform.create(coinEntity, {
    position: Vector3.create(9, 12.75, 8)
})
Area3D.create(coinEntity, {
    size: Vector3.create(1.5, 3, 1.5)
})

function coinPickupSystem (deltaTime: number) {
    // TODO
}
engine.addSystem(coinPickupSystem)