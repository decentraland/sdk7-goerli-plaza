import { engine, Entity, VisibilityComponent, Transform, AudioSource } from "@dcl/sdk/ecs";
import { MovingPlatform, TriggerArea } from "../definitions";
import { Vector3 } from "@dcl/sdk/math";

// Optimization: detections could be optimized by using "sphere checks" checking the "area radius" against he player distance to the trigger area.

function isPositionInsideTriggerArea(targetPosition: Vector3, areaEntity: Entity): boolean {
    const triggerAreaComp = TriggerArea.get(areaEntity)
    const transformComp = Transform.get(areaEntity)

    const detectionAreaCenter = Vector3.add(transformComp.position, triggerAreaComp.centerOffset)
    const detectionAreaSize = triggerAreaComp.size

    const halfSize = Vector3.scale(detectionAreaSize, 0.5)
    const areaMinPosition = Vector3.create(
        detectionAreaCenter.x - halfSize.x,
        detectionAreaCenter.y - halfSize.y,
        detectionAreaCenter.z - halfSize.z
    )
    const areaMaxPosition = Vector3.create(
        detectionAreaCenter.x + halfSize.x,
        detectionAreaCenter.y + halfSize.y,
        detectionAreaCenter.z + halfSize.z
    )

    return targetPosition.x > areaMinPosition.x
        && targetPosition.y > areaMinPosition.y
        && targetPosition.z > areaMinPosition.z
        && targetPosition.x < areaMaxPosition.x
        && targetPosition.y < areaMaxPosition.y
        && targetPosition.z < areaMaxPosition.z
}

let lastPlayerPos: Vector3 | undefined = undefined
export function triggerAreaDetectionSystem(deltaTime: number) {
    if (!Transform.has(engine.PlayerEntity)) return

    const playerPos = Transform.get(engine.PlayerEntity).position
    const moved = playerPos != lastPlayerPos
    if (!moved) return
    
    for (const [entity] of engine.getEntitiesWith(TriggerArea)) {
        const playerInsideArea = isPositionInsideTriggerArea(playerPos, entity)

        const movingPlatformComp = MovingPlatform.getMutableOrNull(entity)
        if (movingPlatformComp) {
            movingPlatformComp.moving = playerInsideArea
            continue
        }

        // the only other case with a trigger area is the pickable coin
        const coinVisibilityComp = VisibilityComponent.getMutable(entity)
        if (playerInsideArea && coinVisibilityComp.visible) {
            coinVisibilityComp.visible = false
            AudioSource.create(entity, {
                audioClipUrl: "sounds/coinPickup.mp3",
                playing: true,
                loop: false
            })
        }
    }

    lastPlayerPos = playerPos
}