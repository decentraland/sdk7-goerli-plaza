// TODO: use higher number so we dont have conflicts (i.e. > 2000)
import { Schemas, engine } from '@dcl/sdk/ecs'
import { InterpolationType } from '../helper/interpolation'

const COMPONENT_ID = 2046

const Vector3EcsSchema = Schemas.Map({
  x: Schemas.Float,
  y: Schemas.Float,
  z: Schemas.Float
})

const MoveTransportData = {
  hasFinished: Schemas.Boolean,
  start: Vector3EcsSchema,
  end: Vector3EcsSchema,
  normalizedTime: Schemas.Float,
  lerpTime: Schemas.Float,
  speed: Schemas.Float,
  interpolationType: Schemas.Enum<InterpolationType>(Schemas.Int)
}

export const MoveTransformComponent = engine.defineComponent(MoveTransportData, COMPONENT_ID)
