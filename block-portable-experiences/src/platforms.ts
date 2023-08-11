import { engine, Transform, GltfContainer } from "@dcl/sdk/ecs"
import { Vector3, Quaternion } from "@dcl/sdk/math"

export function addPlatforms() {

    const _scene = engine.addEntity()
    Transform.create(_scene, {
        position: Vector3.create(0, 0, 0),
        scale: Vector3.create(1, 1, 1),
        rotation: Quaternion.create(0, 0, 0, 1)
    })


    const bermudaGrass = engine.addEntity()

    Transform.create(bermudaGrass, {
        parent: _scene,
        position: Vector3.create(8, 0, 8),
        scale: Vector3.create(1, 1, 1),
        rotation: Quaternion.create(0, 0, 0, 1)
    })
    GltfContainer.create(bermudaGrass, {
        src: 'models/FloorBaseGrass_01.glb'
    })

    const dirtGrass = engine.addEntity()
    Transform.create(dirtGrass, {
        parent: _scene,
        position: Vector3.create(8.5, 4, 11.5),
        scale: Vector3.create(1, 1, 1),
        rotation: Quaternion.create(0, 0, 0, 1)
    })
    GltfContainer.create(dirtGrass, {
        src: 'models/dirt_grass.glb'
    })


    const dirtGrass3 = engine.addEntity()
    Transform.create(dirtGrass3, {
        parent: _scene,
        position: Vector3.create(3.5, 0, 3),
        scale: Vector3.create(1, 1, 1),
        rotation: Quaternion.create(0, 0, 0, 1)
    })
    GltfContainer.create(dirtGrass3, {
        src: 'models/dirt_grass.glb'
    })


    const dirtGrass4 = engine.addEntity()
    Transform.create(dirtGrass4, {
        parent: _scene,
        position: Vector3.create(2.5, 1, 7),
        scale: Vector3.create(1, 1, 1),
        rotation: Quaternion.create(0, 0, 0, 1)
    })
    GltfContainer.create(dirtGrass4, {
        src: 'models/dirt_grass.glb'
    })


    const dirtGrass5 = engine.addEntity()
    Transform.create(dirtGrass5, {
        parent: _scene,
        position: Vector3.create(2.5, 2, 10),
        scale: Vector3.create(1, 1, 1),
        rotation: Quaternion.create(0, 0, 0, 1)
    })
    GltfContainer.create(dirtGrass5, {
        src: 'models/dirt_grass.glb'
    })


    const dirtGrass6 = engine.addEntity()
    Transform.create(dirtGrass6, {
        parent: _scene,
        position: Vector3.create(4.5, 3, 13.5),
        scale: Vector3.create(1, 1, 1),
        rotation: Quaternion.create(0, 0, 0, 1)
    })
    GltfContainer.create(dirtGrass6, {
        src: 'models/dirt_grass.glb'
    })


    const dirtGrass7 = engine.addEntity()
    Transform.create(dirtGrass7, {
        parent: _scene,
        position: Vector3.create(7.5, 3.5, 13),
        scale: Vector3.create(1, 1, 1),
        rotation: Quaternion.create(0, 0, 0, 1)
    })
    GltfContainer.create(dirtGrass7, {
        src: 'models/dirt_grass.glb'
    })



    const solidYellow = engine.addEntity()
    Transform.create(solidYellow, {
        parent: _scene,
        position: Vector3.create(6.5, 0, 8.5),
        scale: Vector3.create(5, 5, 5),
        rotation: Quaternion.create(0, 0, 0, 1)
    })
    GltfContainer.create(solidYellow, {
        src: 'models/solid_yellow.glb'
    })



}