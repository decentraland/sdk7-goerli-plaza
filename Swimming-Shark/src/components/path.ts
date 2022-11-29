import { Schemas, engine } from '@dcl/sdk/ecs'

const COMPONENT_ID = 2048

const Vector3EcsSchema = Schemas.Map({
  x: Schemas.Float,
  y: Schemas.Float,
  z: Schemas.Float
})

const QuaternionEcsType = Schemas.Map({
  x: Schemas.Float,
  y: Schemas.Float,
  z: Schemas.Float,
  w: Schemas.Float
})

const PathData = {
  path: Schemas.Array(Vector3EcsSchema),
  origin: Schemas.Int,
  target: Schemas.Int,
  startRot: QuaternionEcsType,
  endRot: QuaternionEcsType,
  fraction: Schemas.Float,
  paused: Schemas.Boolean
}

export const PathDataComponent = engine.defineComponent(PathData, COMPONENT_ID)
