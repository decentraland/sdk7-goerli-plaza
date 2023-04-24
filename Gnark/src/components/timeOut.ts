import { Schemas, engine } from '@dcl/sdk/ecs'

const TimeOut = {
  timeLeft: Schemas.Float,
  hasFinished: Schemas.Boolean,
  paused: Schemas.Boolean
}

export const TimeOutComponent = engine.defineComponent('TimeOut', TimeOut)
