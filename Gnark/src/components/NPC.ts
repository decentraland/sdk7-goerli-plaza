import { Schemas, engine } from "@dcl/sdk/ecs"

export enum gnarkStates {
  WALKING,
  TURNING,
  YELLING
}

const NPCData = {
  state: Schemas.EnumNumber<gnarkStates>(gnarkStates, gnarkStates.TURNING),
  previousState: Schemas.EnumNumber<gnarkStates>(gnarkStates, gnarkStates.TURNING)
}

export const NPComponent = engine.defineComponent('NPComponent', NPCData)
