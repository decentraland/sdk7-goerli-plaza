
import { InterpolationType } from "helper/interpolation"

export enum dogStates {
    Idle,
    Sit,
    Follow,
    GoDrink,
    Drinking
}

// TODO: use higher number so we dont have conflicts (i.e. > 2000)
export enum CustomComponentIds {
    MoveTransform = 2046,
    NPC = 2066,
    TimeOut = 2048
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
    interpolationType: Schemas.Enum<InterpolationType>(Schemas.Int),
}

const MoveTransformComponent = engine.defineComponent(MoveTransformSchema, CustomComponentIds.MoveTransform)


const NPCSchema = {
    state: Schemas.Enum<dogStates>(Schemas.Int),
    previousState: Schemas.Enum<dogStates>(Schemas.Int)
}

const NPCComponent = engine.defineComponent(NPCSchema, CustomComponentIds.NPC)

const TimeOutSchema = {

    timeLeft: Schemas.Float,
    hasFinished: Schemas.Boolean,
    paused: Schemas.Boolean

}

const TimeOutComponent = engine.defineComponent(TimeOutSchema, CustomComponentIds.TimeOut)

/**
 * Export components
 */

export namespace CustomComponents {
    export const TimeOut = TimeOutComponent
    export const NPC = NPCComponent
    export const MoveTransform = MoveTransformComponent
}