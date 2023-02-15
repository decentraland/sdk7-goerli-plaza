import { Schemas, engine } from '@dcl/sdk/ecs'
import { InterpolationType } from '../helper/interpolation'

const MoveTransportData = {
  duration: Schemas.Float,
  start: Schemas.Vector3,
  end: Schemas.Vector3,
  normalizedTime: Schemas.Float,
  lerpTime: Schemas.Float,
  speed: Schemas.Float,
  interpolationType: Schemas.EnumInt<InterpolationType>(InterpolationType, InterpolationType.EASESINE)
}

export const MoveTransformComponent = engine.defineComponent('MoveTransformComponent', MoveTransportData)
export const MoveTransformFinishedComponent = engine.defineComponent('MoveTransformFinishedComponent', { flag: Schemas.Boolean })
