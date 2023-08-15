import { GltfContainer, Transform, engine } from "@dcl/sdk/ecs";
import { Vector3, Quaternion } from "@dcl/sdk/math";

export function createScene3(){
const scene3 = engine.addEntity()

Transform.create(scene3, {
    position: Vector3.create(0, 0, 0),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1)
})


const museum = engine.addEntity()
Transform.create( museum, {
    position: Vector3.create(24, 0, 18),
    rotation: Quaternion.fromEulerDegrees(0, 270, 0),
    scale: Vector3.create(1, 1, 1),
    parent: scene3
})
GltfContainer.create( museum, {
    src: 'models/museum/building.glb'
}
)





return scene3}