import { engine, GltfContainer, Transform } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"


export function setupEnvironment(){
    const floor = engine.addEntity()
    Transform.create(floor, {
        position: Vector3.create(8, 0, 8),
        scale: Vector3.One()
    })
    GltfContainer.create(floor, { src: "models/environment/floor.glb" })
}
