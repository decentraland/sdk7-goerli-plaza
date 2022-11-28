import { engine, Schemas } from '@dcl/sdk/ecs'
import { getNextComponentId } from './customComponentIds'

export const ZombieComponent = engine.defineComponent({ flag: Schemas.Boolean }, getNextComponentId())
