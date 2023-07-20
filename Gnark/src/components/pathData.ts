import { Schemas, engine } from '@dcl/sdk/ecs'

const PathData = {
  path: Schemas.Array(Schemas.Vector3),
  origin: Schemas.Float,
  target: Schemas.Float,
  paused: Schemas.Boolean
}

export const PathDataComponent = engine.defineComponent('PathData', PathData)
