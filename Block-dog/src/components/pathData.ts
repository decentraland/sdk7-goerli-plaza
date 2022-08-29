import { Vector3EcsType } from "./VectorType"


const COMPONENT_ID = 2047



const PathData = MapType({
	path: ArrayType(Vector3EcsType),
	origin: Float32,
	target: Float32,
	paused: EcsBoolean
  })



export const PathDataComponent = engine.defineComponent(COMPONENT_ID, PathData)
