const COMPONENT_ID = 2223

const SpawnerComponentType = {
  lastPointerDownTs: Schemas.Int
}

export const SpawnerComponent = engine.defineComponent(SpawnerComponentType, COMPONENT_ID)
