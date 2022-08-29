import { getNextComponentId } from './customComponentIds'

const Vector3EcsType = MapType({
  x: Float32,
  y: Float32,
  z: Float32
})

const MoveTransportData = MapType({
  duration: Float32,
  start: Vector3EcsType,
  end: Vector3EcsType,
  normalizedTime: Float32,
  lerpTime: Float32,
  speed: Float32,
  interpolationType: Float32 // EcsInterpolation,
})

export const MoveTransformComponent = engine.defineComponent(getNextComponentId(), MoveTransportData)
export const MoveTransformFinishedComponent = engine.defineComponent(
  getNextComponentId(),
  MapType({ flag: EcsBoolean })
)
