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
    
    if (triggerAreaSize) {
		utils.triggers.addTrigger(entity, 1, 1, [{type: "box", scale: triggerAreaSize, position: Vector3.create(0, triggerAreaSize.y/2, 0)}],
		()=>{
			utils.paths.startStraightPath(entity, waypoints, travelDurationInSeconds, false)
		}, 
		undefined
		, Color3.Blue()
	  )
    } else {
		utils.paths.startStraightPath(entity, waypoints, travelDurationInSeconds, false)

	}
}
