// import {
//     engine,
//     GltfContainer,
//     Transform
// } from "@dcl/sdk/ecs"
// import { Vector3 } from "@dcl/sdk/math";
// import {MovingPlatform} from "../definitions";
//
// export function createTriggeredMovingPlatform(modelPath: string, startPos: Vector3, endPos: Vector3, travelDurationInSeconds: number, triggerArea: Vector3) {
//     const entity = engine.addEntity()
//     GltfContainer.create(entity, {
//         src: modelPath
//     })
//
//     Transform.create(entity, {
//         position: startPos
//     })
//
//     MovingPlatform.create(entity, {
//         waypoints: [startPos, endPos],
//         currentTargetWaypointIndex: 1,
//         totalRouteTimeInSeconds: travelDurationInSeconds,
//         pingPong: true,
//         moving: true
//     })
// }

/*
import * as utils from '@dcl/ecs-scene-utils'

export function createTriggeredPlatform(
    model: GLTFShape,
    transform: Transform,
    triggerShape: utils.TriggerBoxShape
): Entity {
    const entity = new Entity()
    engine.addEntity(entity)
    entity.addComponent(model)
    entity.addComponent(transform)

    // Create trigger for entity
    entity.addComponent(
        new utils.TriggerComponent(triggerShape, {
            onCameraEnter: () => {
                entity.getComponent(utils.ToggleComponent).toggle()
            },
            onCameraExit: () => {
                entity.getComponent(utils.ToggleComponent).toggle()
            }
        })
    )

    entity.addComponent(
        new utils.ToggleComponent(
            utils.ToggleState.Off,
            (value: utils.ToggleState) => {
                // Move the platform to the end position once the player steps onto the platform
                if (value === utils.ToggleState.On) {
                    entity.addComponentOrReplace(
                        new utils.MoveTransformComponent(
                            new Vector3(14, 4, 12),
                            new Vector3(14, 4, 4),
                            3
                        )
                    )
                } else {
                    // Move the platform to the start position once the player falls off or leaves the platform
                    entity.addComponentOrReplace(
                        new utils.MoveTransformComponent(
                            entity.getComponent(Transform).position,
                            new Vector3(14, 4, 12),
                            1.5
                        )
                    )
                }
            }
        )
    )
    return entity
}*/
