import { engine, Schemas } from '@dcl/sdk/ecs'

export const ZombieComponent = engine.defineComponent('ZombieComponent', {
  flag: Schemas.Boolean
})
