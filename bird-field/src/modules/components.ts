import { engine, Schemas } from "@dcl/sdk/ecs"

export enum CustomComponentIds {
	DistanceBird = 2096,

  }


const DistanceBird = {
	originalPos: Schemas.Vector3,    
  	flying: Schemas.Boolean,
  	elapsed: Schemas.Number
  }
  
export const DistanceBirdComopnent = engine.defineComponent(DistanceBird, CustomComponentIds.DistanceBird)
  