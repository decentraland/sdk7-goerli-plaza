import { Schemas, engine } from '@dcl/sdk/ecs'
import { InterpolationType } from '../helper/interpolation'

// TODO: use higher number so we dont have conflicts (i.e. > 2000)
const COMPONENT_ID = 2046

const MoveTransportData = {
  hasFinished: Schemas.Boolean,
  duration: Schemas.Float,
  start: Schemas.Vector3,
  end: Schemas.Vector3,
  normalizedTime: Schemas.Float,
  lerpTime: Schemas.Float,
  speed: Schemas.Float,
  interpolationType: Schemas.Enum<InterpolationType>(Schemas.Int)
}

export const MoveTransformComponent = engine.defineComponent(MoveTransportData, COMPONENT_ID)
