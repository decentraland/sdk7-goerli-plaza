import { engine, Schemas } from '@dcl/sdk/ecs'

export const SpeedComponent = engine.defineComponent('SpeedComponent', { speed: Schemas.Float })
