import { Schemas, engine } from '@dcl/sdk/ecs'
import { InterpolationType } from '../helper/interpolation'

const MoveTransportData = {
  hasFinished: Schemas.Boolean,
  start: Schemas.Vector3,
  end: Schemas.Vector3,
  normalizedTime: Schemas.Float,
  lerpTime: Schemas.Float,
  speed: Schemas.Float,
  interpolationType: Schemas.EnumNumber<InterpolationType>(InterpolationType, InterpolationType.EASESINE)
}

export const MoveTransformComponent = engine.defineComponent('MoveTransportData', MoveTransportData)
