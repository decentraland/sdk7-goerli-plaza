import { InterpolationType } from '../helper/interpolation'

// TODO: use higher number so we dont have conflicts (i.e. > 2000)
const COMPONENT_ID = 2046
const Vector3EcsType = Schemas.Map({
  x: Schemas.Float,
  y: Schemas.Float,
  z: Schemas.Float
})

const MoveTransportData = {
  speed: Schemas.Float,
  start: Vector3EcsType,
  end: Vector3EcsType,
  normalizedTime: Schemas.Float,
  lerpTime: Schemas.Float,
  interpolationType: Schemas.Enum<InterpolationType>(Schemas.Int)
}

export const MoveTransformComponent = engine.defineComponent(MoveTransportData, COMPONENT_ID)
