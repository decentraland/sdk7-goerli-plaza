import { engine, Schemas } from "@dcl/sdk/ecs";

enum CustomComponentIds {
    MovingPlatform = 2002,
    Area3D = 2003
}

export const MovingPlatform = engine.defineComponent(
    {
        waypoints: Schemas.Array(Schemas.Vector3),
        previousWaypointIndex: Schemas.Number,
        targetWaypointIndex: Schemas.Number,
        currentLerpTimeBetweenWaypoints: Schemas.Number,
        totalRouteTimeInSeconds: Schemas.Number,
        calculatedSpeed: Schemas.Number,
        pingPong: Schemas.Boolean,
        moving: Schemas.Boolean
    },
    CustomComponentIds.MovingPlatform
)
export const Area3D = engine.defineComponent(
    {
        size: Schemas.Vector3,
        centerOffset: Schemas.Vector3
    }, CustomComponentIds.Area3D
)