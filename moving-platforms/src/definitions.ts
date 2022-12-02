import { engine, Schemas } from "@dcl/sdk/ecs";

enum CustomComponentIds {
    MovingPlatform = 2002,
    Area3D = 2003
}

export const MovingPlatform = engine.defineComponent(
    {
        waypoints: Schemas.Array(Schemas.Vector3),
        currentTargetWaypointIndex: Schemas.Number,
        totalRouteTimeInSeconds: Schemas.Number,
        pingPong: Schemas.Boolean,
        moving: Schemas.Boolean
    },
    CustomComponentIds.MovingPlatform
)
export const Area3D = engine.defineComponent(
    {
        size: Schemas.Vector3
    }, CustomComponentIds.Area3D
)