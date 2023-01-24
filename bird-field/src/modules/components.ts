import { engine, Schemas } from "@dcl/sdk/ecs"



const DistanceBird = {
	originalPos: Schemas.Vector3,    
  	flying: Schemas.Boolean,
  	elapsed: Schemas.Number
  }
  
export const DistanceBirdComponent = engine.defineComponent("DistanceBirdComponent", DistanceBird)
  