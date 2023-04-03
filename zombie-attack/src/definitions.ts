import { engine, Schemas } from "@dcl/sdk/ecs";

export const Zombie = engine.defineComponent('Zombie',
    {
        movementSpeed: Schemas.Number,
        rotationSpeed: Schemas.Number
    }
)