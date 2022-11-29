import { engine, Schemas } from "@dcl/sdk/ecs"

const COMPONENT_ID = 1111




export const SpeedComponent = engine.defineComponent({speed:Schemas.Float}
, COMPONENT_ID)
