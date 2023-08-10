import { Schemas, engine } from "@dcl/sdk/ecs"

export const Ball = engine.defineComponent(
    "Ball",
    {
        isActive: Schemas.Boolean,
        isThrown: Schemas.Boolean,
        glowEntity: Schemas.Entity,
    }
)