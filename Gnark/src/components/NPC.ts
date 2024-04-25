import { Schemas, engine } from '@dcl/sdk/ecs'

export enum gnarkStates {
  WALKING,
  TURNING,
  YELLING
}

export const NPCData = engine.defineComponent('NPComponent', {
  state: Schemas.EnumNumber<gnarkStates>(gnarkStates, gnarkStates.TURNING),
  previousState: Schemas.EnumNumber<gnarkStates>(gnarkStates, gnarkStates.TURNING)
})
