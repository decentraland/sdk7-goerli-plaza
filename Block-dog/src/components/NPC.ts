
const COMPONENT_ID = 2066

export enum dogStates {
	Idle,
	Sit,
	Follow,
	GoDrink,
	Drinking
}


const NPCData = {
	state: Schemas.Enum<dogStates>(Schemas.Int),
	previousState: Schemas.Enum<dogStates>(Schemas.Int)
  }

export const NPComponent = engine.defineComponent(NPCData, COMPONENT_ID )
