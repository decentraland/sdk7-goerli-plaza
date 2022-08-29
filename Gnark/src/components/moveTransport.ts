// TODO: use higher number so we dont have conflicts (i.e. > 2000)
import { Vector3EcsType } from "./VectorType"

const COMPONENT_ID = 2046


const MoveTransportData = MapType({
  hasFinished: EcsBoolean,
  duration: Float32,
  start: Vector3EcsType,
  end: Vector3EcsType,
  normalizedTime: Float32,
  lerpTime: Float32,
  speed: Float32,
  interpolationType: Float32 // EcsInterpolation,
})





export const MoveTransformComponent = engine.defineComponent(COMPONENT_ID, MoveTransportData)
