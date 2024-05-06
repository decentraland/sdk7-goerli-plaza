import { Schemas, engine } from '@dcl/sdk/ecs'

// We use this component to track and group all stone entities.
export const StoneStatus = engine.defineComponent('zequencer::stoneStatus', { stoneOn: Schemas.Boolean })
export const SeqNumbers = engine.defineComponent('zequencer::seqNumbers', { seq: Schemas.Array(Schemas.Array(Schemas.Int)) })