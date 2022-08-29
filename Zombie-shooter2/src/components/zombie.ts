import { getNextComponentId } from './customComponentIds'

export const ZombieComponent = engine.defineComponent(getNextComponentId(), MapType({ flag: EcsBoolean }))
