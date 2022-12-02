import {
    engine,
    GltfContainer,
    Transform
} from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math";
import { Area3D, MovingPlatform } from "../definitions";

export function createMovingPlatform(modelPath: string, waypoints: Vector3[], travelDurationInSeconds: number, triggerAreaSize: Vector3 | undefined = undefined) {
    const entity = engine.addEntity()
    GltfContainer.create(entity, {
        src: modelPath
    })
    Transform.create(entity, {
        position: waypoints[0]
    })
    MovingPlatform.create(entity, {
        waypoints,
        previousWaypointIndex: 0,
        targetWaypointIndex: 1,
        currentLerpTimeBetweenWaypoints: 0,
        totalRouteTimeInSeconds: travelDurationInSeconds,
        calculatedSpeed: calculateMovementSpeed(waypoints[0], waypoints[1], travelDurationInSeconds),
        pingPong: true,
        moving: true
    })
    
    if (triggerAreaSize) {
        Area3D.create(entity, {
            size: triggerAreaSize,
            centerOffset: Vector3.create(0, triggerAreaSize.y/2, 0)
        })
    }
}

export function platformsMovementSystem(deltaTime: number) {
    for (const [entity] of engine.getEntitiesWith(MovingPlatform)) {
        const movingPlatformComp = MovingPlatform.getMutable(entity)
        
        if (!movingPlatformComp.moving) continue
        
        movingPlatformComp.currentLerpTimeBetweenWaypoints += movingPlatformComp.calculatedSpeed * deltaTime

        Transform.getMutable(entity).position = Vector3.lerp(
            movingPlatformComp.waypoints[movingPlatformComp.previousWaypointIndex],
            movingPlatformComp.waypoints[movingPlatformComp.targetWaypointIndex],
            movingPlatformComp.currentLerpTimeBetweenWaypoints
        )
        
        if (movingPlatformComp.currentLerpTimeBetweenWaypoints >= 1) {
            movingPlatformComp.currentLerpTimeBetweenWaypoints = 0
            const isMovingForward = movingPlatformComp.targetWaypointIndex > movingPlatformComp.previousWaypointIndex
            
            if (isLastWaypoint(movingPlatformComp.targetWaypointIndex, movingPlatformComp.waypoints, isMovingForward)) {
                if (movingPlatformComp.pingPong) {
                    const currentWaypointIndex = movingPlatformComp.targetWaypointIndex
                    movingPlatformComp.targetWaypointIndex = movingPlatformComp.previousWaypointIndex
                    movingPlatformComp.previousWaypointIndex = currentWaypointIndex
                    // We don't re-calculate speed here because the distance is the same 
                } else {
                    movingPlatformComp.moving = false
                }
            } else {
                if (isMovingForward) {
                    movingPlatformComp.targetWaypointIndex++
                    movingPlatformComp.previousWaypointIndex++
                } else {
                    movingPlatformComp.targetWaypointIndex--
                    movingPlatformComp.previousWaypointIndex--
                }
                
                movingPlatformComp.calculatedSpeed = calculateMovementSpeed(movingPlatformComp.waypoints[movingPlatformComp.previousWaypointIndex], movingPlatformComp.waypoints[movingPlatformComp.targetWaypointIndex], movingPlatformComp.totalRouteTimeInSeconds)
            }
        }
    }
}

function calculateMovementSpeed (startPosition: Vector3, endPosition: Vector3, targetTimeInSeconds: number) {
    const pathMagnitude = Vector3.length(Vector3.subtract(endPosition, startPosition))
    return pathMagnitude / targetTimeInSeconds
}

function isLastWaypoint(targetWaypointIndex: number, waypoints: Vector3[], isMovingForward: Boolean): Boolean {
    return isMovingForward ? targetWaypointIndex == waypoints.length-1 : targetWaypointIndex == 0
}

export function areaPlayerPositionTriggeringSystem(deltaTime: number) {
    for (const [entity] of engine.getEntitiesWith(Area3D)) {
        // TODO
    }
}
