
const COMPONENT_ID = 2066

export enum dogStates {
	Idle,
	Sit,
	Follow,
	GoDrink,
	Drinking
}


const NPCData = MapType({
	state: Enum<dogStates>(Int8),
	previousState: Enum<dogStates>(Int8)
  })

export const NPComponent = engine.defineComponent(COMPONENT_ID, NPCData )
