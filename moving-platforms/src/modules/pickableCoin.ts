import { Vector3 } from "@dcl/sdk/math";
import {engine, GltfContainer, Transform, VisibilityComponent} from "@dcl/sdk/ecs";
import { TriggerArea } from "../definitions";

export function createPickableCoin(position: Vector3, pickUpAreaSize: Vector3) {
    const entity = engine.addEntity()
    GltfContainer.create(entity, {
        src: "models/starCoin.glb"
    })
    VisibilityComponent.create(entity, {
        visible: true
    })
    Transform.create(entity, {
        position 
    })
    TriggerArea.create(entity, {
        size: pickUpAreaSize
    })
}