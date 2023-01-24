import { engine, Schemas } from '@dcl/sdk/ecs'


export const Sprite = engine.defineComponent(
  "Sprite",
  {
    t: Schemas.Number,
    rows: Schemas.Number,
    columns: Schemas.Number,
    interval: Schemas.Number,

    faceMappingsX: Schemas.Number,
    faceMappingsY: Schemas.Number
  }
)
