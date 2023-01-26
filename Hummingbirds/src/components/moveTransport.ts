import { Schemas, engine } from '@dcl/sdk/ecs'
import { InterpolationType } from '../helper/interpolation'

const MoveTransportData = {
  speed: Schemas.Float,
  start: Schemas.Vector3,
  end: Schemas.Vector3,
  normalizedTime: Schemas.Float,
  lerpTime: Schemas.Float,
  interpolationType: Schemas.Enum<InterpolationType>(Schemas.Int)
}

export const MoveTransformComponent = engine.defineComponent('MoveTransportData', MoveTransportData)
