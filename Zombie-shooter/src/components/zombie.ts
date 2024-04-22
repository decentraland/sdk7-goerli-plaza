import { engine, Schemas } from '@dcl/sdk/ecs'

export const ZombieComponent = engine.defineComponent('ZombieComponent', {
  flag: Schemas.Boolean,
  rechedEnd: Schemas.Boolean,
  coolDown: Schemas.Number
}, { flag: false, rechedEnd: false, coolDown: 1 })
