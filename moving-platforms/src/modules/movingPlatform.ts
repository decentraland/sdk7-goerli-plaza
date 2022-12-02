import {
    engine,
    GltfContainer,
    Transform
} from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math";
import { Area3D, MovingPlatform } from "../definitions";

export function createMovingPlatform(modelPath: string, waypoints: Vector3[], travelDurationInSeconds: number, triggerAreaSize: Vector3 | undefined = undefined) {
    const entity = engine.addEntity()
    GltfContainer.create(entity, {
        src: modelPath
    })
    
    Transform.create(entity, {
        position: waypoints[0]
    })
    
    MovingPlatform.create(entity, {
        waypoints,
        currentTargetWaypointIndex: 1,
        totalRouteTimeInSeconds: travelDurationInSeconds,
        pingPong: true,
        moving: true
    })
    
    if (triggerAreaSize) {
        Area3D.create(entity, {
            size: triggerAreaSize
        })
    }
}

export function platformsMovementSystem(deltaTime: number) {
    // TODO
}

export function areaPlayerPositionTriggeringSystem(deltaTime: number) {
    
}

/*
import * as utils from '@dcl/ecs-scene-utils'

export function createMovingPlatform(
    model: GLTFShape,
    startPos: Vector3,
    endPos: Vector3,
    time: number
): Entity {
    const entity = new Entity()
    engine.addEntity(entity)
    entity.addComponent(model)
    entity.addComponent(new Transform())

    // Move the platform back and forth between start and end positions
    entity.addComponent(
        new utils.ToggleComponent(
            utils.ToggleState.Off,
            (value: utils.ToggleState) => {
                if (value === utils.ToggleState.On) {
                    entity.addComponentOrReplace(
                        new utils.MoveTransformComponent(startPos, endPos, time, () => {
                            entity.getComponent(utils.ToggleComponent).toggle()
                        })
                    )
                } else {
                    entity.addComponentOrReplace(
                        new utils.MoveTransformComponent(endPos, startPos, time, () => {
                            entity.getComponent(utils.ToggleComponent).toggle()
                        })
                    )
                }
            }
        )
    )
    entity.getComponent(utils.ToggleComponent).toggle()
    return entity
}*/
