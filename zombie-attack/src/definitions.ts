import { engine, Schemas } from "@dcl/sdk/ecs";

enum CustomComponentIds {
    Zombie = 2002,
}
export const Zombie = engine.defineComponent(
    {
        movementSpeed: Schemas.Number,
        rotationSpeed: Schemas.Number
    }, CustomComponentIds.Zombie
)