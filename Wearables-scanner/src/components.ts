import { Schemas, engine } from '@dcl/sdk/ecs'

export const DoorState = engine.defineComponent(
  'doorState',
  { open: Schemas.Boolean, dirty: Schemas.Boolean },
  { open: false, dirty: false }
)
