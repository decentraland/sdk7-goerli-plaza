// TODO: use higher number so we dont have conflicts (i.e. > 2000)
import { InterpolationType } from "../helper/interpolation"

const COMPONENT_ID = 2046

const Vector3EcsType = Schemas.Map({
	x: Schemas.Float,
	y: Schemas.Float,
	z: Schemas.Float
  })

const MoveTransportData = {
  hasFinished: Schemas.Boolean,
  start: Vector3EcsType,
  end: Vector3EcsType,
  normalizedTime: Schemas.Float,
  lerpTime: Schemas.Float,
  speed: Schemas.Float,
  interpolationType:  Schemas.Enum<InterpolationType>(Schemas.Int) ,
}





export const MoveTransformComponent = engine.defineComponent(MoveTransportData, COMPONENT_ID)


const originRotation = Quaternion.fromEulerDegress(0, 90, 0)
const targetRotation = Quaternion.fromEulerDegress(0, 0, 0)

let newRotation = Quaternion.slerp(originRotation, targetRotation, 0.6)