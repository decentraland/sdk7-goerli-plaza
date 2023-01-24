import { engine, Schemas } from "@dcl/sdk/ecs";


export const PickableItem = engine.defineComponent("Pickable",{
    respawnSeconds: Schemas.Number,
    respawnTimer: Schemas.Number,
    playerDetectionArea: Schemas.Vector3
}) 