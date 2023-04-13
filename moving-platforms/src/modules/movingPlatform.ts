import {
    engine,
    GltfContainer,
    Transform
} from "@dcl/sdk/ecs"
import { Color3, Vector3 } from "@dcl/sdk/math";
import * as utils from '@dcl-sdk/utils'

export function createMovingPlatform(modelPath: string, waypoints: Vector3[], travelDurationInSeconds: number, triggerAreaSize: Vector3 | undefined = undefined) {
    const entity = engine.addEntity()
    GltfContainer.create(entity, {
        src: modelPath
    })
    Transform.create(entity, {
        position: waypoints[0]
    })

	
    
    // if (triggerAreaSize) {
	// 	utils.triggers.addTrigger(entity, utils.LAYER_1, utils.LAYER_1, [{type: "box", scale: triggerAreaSize, position: Vector3.create(0, triggerAreaSize.y/2, 0)}],
	// 	()=>{
	// 		startPath(false)
	// 	}, 
	// 	undefined
	// 	, Color3.Blue()
	//   )
    // } else {
	// 	startPath(true)

	// }
}

// function startPath(entity, waypoints, travelDurationInSeconds, loop?: boolean) {
// 	utils.paths.startStraightPath(
// 	  entity,
// 	  waypoints,
// 	  travelDurationInSeconds,
// 	  false,
// 	  // When path is complete, start it again
// 	  function() { if (loop) startPath() }
// 	)
//   } 