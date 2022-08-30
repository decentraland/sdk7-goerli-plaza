
const COMPONENT_ID = 2047



const PathData = {
	path: Schemas.Array(Vector3EcsType),
	origin: Schemas.Float,
	target: Schemas.Float,
	paused: Schemas.Boolean
  }



export const PathDataComponent = engine.defineComponent(PathData, COMPONENT_ID)
