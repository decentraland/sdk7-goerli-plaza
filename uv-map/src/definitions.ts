enum CustomComponentIds {
  Sprite = 2002
}

export const Sprite = engine.defineComponent(
  {
    t: Schemas.Number,
    rows: Schemas.Number,
    columns: Schemas.Number,
    interval: Schemas.Number,

    faceMappingsX: Schemas.Number,
    faceMappingsY: Schemas.Number
  },
  CustomComponentIds.Sprite
)
