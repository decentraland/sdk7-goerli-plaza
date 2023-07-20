import { Schemas, engine } from '@dcl/sdk/ecs'

const PathData = {
  path: Schemas.Array(Schemas.Vector3),
  origin: Schemas.Int,
  target: Schemas.Int,
  startRot: Schemas.Quaternion,
  endRot: Schemas.Quaternion,
  fraction: Schemas.Float,
  paused: Schemas.Boolean
}

export const PathDataComponent = engine.defineComponent('PathDataComponent', PathData)
