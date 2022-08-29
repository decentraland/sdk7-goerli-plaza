
const COMPONENT_ID = 2066

export enum gnarkStates {
	WALKING,
	TURNING,
	YELLING	
}


const NPCData = MapType({
	state: Enum<gnarkStates>(Int8),
	previousState: Enum<gnarkStates>(Int8)
  })

export const NPComponent = engine.defineComponent(COMPONENT_ID, NPCData )
