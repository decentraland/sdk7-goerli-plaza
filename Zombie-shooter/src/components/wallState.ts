import { engine, Schemas } from '@dcl/sdk/ecs'

export const WallState = engine.defineComponent(
  'WallState',
  {
    up: Schemas.Boolean,
    health: Schemas.Number
  },
  { up: true, health: 5 }
)
