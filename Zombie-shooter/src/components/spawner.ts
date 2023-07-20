import { Schemas, engine } from '@dcl/sdk/ecs'

const SpawnerComponentType = {
  lastPointerDownTs: Schemas.Int
}

export const SpawnerComponent = engine.defineComponent('SpawnerComponent', SpawnerComponentType)
