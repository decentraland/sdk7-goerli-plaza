import { engine, Schemas } from "@dcl/sdk/ecs";

enum CustomComponentIds {
  WheelSpin = 2002
}

export const WheelSpin = engine.defineComponent(
  {
    active: Schemas.Boolean,
    speed: Schemas.Number,
    direction: Schemas.Vector3
  },
  CustomComponentIds.WheelSpin
)
