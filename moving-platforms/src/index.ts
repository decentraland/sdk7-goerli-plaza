export * from '@dcl/sdk'
import { engine, GltfContainer } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"
import { createMovingPlatform, platformsMovementSystem } from "./modules/movingPlatform";
import { createPickableCoin } from "./modules/pickableCoin";
import { triggerAreaDetectionSystem } from "./modules/triggerArea";

function setup() {
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
        [Vector3.create(2, 1.5, 8), Vector3.create(2, 1.5, 10)],
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
        20,
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
        40
    )

    // Instantiate pickable coin
    // createPickableCoin(Vector3.create(9, 12.75, 8), Vector3.create(1.5, 3, 1.5))
    createPickableCoin(Vector3.create(9, 0.5, 8), Vector3.create(1.5, 3, 1.5))

    // Add needed systems
    engine.addSystem(platformsMovementSystem)
    engine.addSystem(triggerAreaDetectionSystem)
}

setup()