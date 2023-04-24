import { Schemas, engine } from '@dcl/sdk/ecs'
import { InterpolationType } from './helper/interpolation'

export enum dogStates {
  Idle,
  Sit,
  Follow,
  GoDrink,
  Drinking
}

/**
 * Schemas and component definitions
 */

const MoveTransformSchema = {
  hasFinished: Schemas.Boolean,
  start: Schemas.Vector3,
  end: Schemas.Vector3,
  normalizedTime: Schemas.Float,
  lerpTime: Schemas.Float,
  speed: Schemas.Float,
  interpolationType: Schemas.EnumNumber<InterpolationType>(InterpolationType, InterpolationType.EASESINE)
}

export const MoveTransformComponent = engine.defineComponent('MoveTransformSchema', MoveTransformSchema)

const NPCSchema = {
  state: Schemas.EnumNumber<dogStates>(dogStates, dogStates.Idle),
  previousState: Schemas.EnumNumber<dogStates>(dogStates, dogStates.Idle),
  changeTimer: Schemas.Number
}

export const NPCComponent = engine.defineComponent('NPCSchema', NPCSchema)

const TimeOutSchema = {
  timeLeft: Schemas.Float,
  hasFinished: Schemas.Boolean,
  paused: Schemas.Boolean
}

export const TimeOutComponent = engine.defineComponent('TimeOutSchema', TimeOutSchema)

/**
 * Export components
 */

export namespace CustomComponents {
  export const TimeOut = TimeOutComponent
  export const NPC = NPCComponent
  export const MoveTransform = MoveTransformComponent
}
