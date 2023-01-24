import { engine, Schemas } from "@dcl/sdk/ecs";


export const MovingPlatform = engine.defineComponent(
	"MovingPlatform",
    {
        waypoints: Schemas.Array(Schemas.Vector3),
        previousWaypointIndex: Schemas.Number,
        targetWaypointIndex: Schemas.Number,
        currentLerpTimeBetweenWaypoints: Schemas.Number,
        speed: Schemas.Number,
        pingPong: Schemas.Boolean,
        moving: Schemas.Boolean
    }
)
export const TriggerArea = engine.defineComponent(
	"TriggerArea",
    {
        size: Schemas.Vector3,
        centerOffset: Schemas.Vector3
    }
)