import { Schemas, engine } from '@dcl/sdk/ecs'

export const Cooldown = engine.defineComponent(
  'Cooldown',
  {
    time: Schemas.Int,
    on: Schemas.Boolean
  },
  {
    time: 1,
    on: false
  }
)
