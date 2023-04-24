import { engine, Schemas } from '@dcl/sdk/ecs'

const DistanceBird = {
  originalPos: Schemas.Vector3,
  flying: Schemas.Boolean,
  elapsed: Schemas.Number
}

export const DistanceBirdComopnent = engine.defineComponent('DistanceBird', DistanceBird)
