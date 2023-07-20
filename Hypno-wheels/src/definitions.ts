import { engine, Schemas } from '@dcl/sdk/ecs'

export const WheelSpin = engine.defineComponent('WheelSpin', {
  active: Schemas.Boolean,
  speed: Schemas.Number,
  direction: Schemas.Vector3
})
