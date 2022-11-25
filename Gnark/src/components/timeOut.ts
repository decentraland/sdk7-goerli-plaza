const COMPONENT_ID = 2048

const TimeOut = {
  timeLeft: Schemas.Float,
  hasFinished: Schemas.Boolean,
  paused: Schemas.Boolean
}

export const TimeOutComponent = engine.defineComponent(TimeOut, COMPONENT_ID)
