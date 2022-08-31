import { InterpolationType } from '../helper/interpolation'
import { getNextComponentId } from './customComponentIds'


const Vector3EcsSchema = Schemas.Map({
	x: Schemas.Float,
	y: Schemas.Float,
	z: Schemas.Float
  })

const MoveTransportData = {
  duration: Schemas.Float,
  start: Vector3EcsSchema,
  end: Vector3EcsSchema,
  normalizedTime: Schemas.Float,
  lerpTime: Schemas.Float,
  speed: Schemas.Float,
  interpolationType:  Schemas.Enum<InterpolationType>(Schemas.Int),
}

export const MoveTransformComponent = engine.defineComponent( MoveTransportData, getNextComponentId())
export const MoveTransformFinishedComponent = engine.defineComponent(
  
  { flag: Schemas.Boolean },
  getNextComponentId()
)
