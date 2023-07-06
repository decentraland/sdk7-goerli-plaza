import { engine, Schemas } from '@dcl/sdk/ecs'

export const PickableItem = engine.defineComponent(
  'PickableItem',
  {
    respawnSeconds: Schemas.Number,
    respawnTimer: Schemas.Number,
    picked: Schemas.Boolean
  },
  { picked: false }
)
