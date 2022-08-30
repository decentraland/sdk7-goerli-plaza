

const COMPONENT_ID = 2047

const Vector3EcsType = Schemas.Map({
	x: Schemas.Float,
	y: Schemas.Float,
	z: Schemas.Float
  })

const PathData = {
	path: Schemas.Array(Vector3EcsType),
	origin: Schemas.Int,
	target: Schemas.Int,
	paused: Schemas.Boolean
  }



export const PathDataComponent = engine.defineComponent(PathData, COMPONENT_ID)
