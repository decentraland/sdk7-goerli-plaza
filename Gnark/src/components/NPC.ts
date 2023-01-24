import { Schemas, engine } from "@dcl/sdk/ecs"


export enum gnarkStates {
  WALKING,
  TURNING,
  YELLING
}

const NPCData = {
  state: Schemas.Enum<gnarkStates>(Schemas.Int),
  previousState: Schemas.Enum<gnarkStates>(Schemas.Int)
}

export const NPComponent = engine.defineComponent("NPC", NPCData)
