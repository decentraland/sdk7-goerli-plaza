import { engine, Schemas } from "@dcl/sdk/ecs";

enum CustomComponentIds {
    PickableItem = 2002
}

export const PickableItem = engine.defineComponent({
    respawnSeconds: Schemas.Number,
    respawnTimer: Schemas.Number,
    playerDetectionArea: Schemas.Vector3
}, CustomComponentIds.PickableItem) 