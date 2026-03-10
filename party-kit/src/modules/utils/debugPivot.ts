import { Entity, Material, MeshRenderer, Transform, engine } from "@dcl/sdk/ecs";
import { Color4, Vector3 } from "@dcl/sdk/math";


export function addDebugPivot(entity: Entity, scale: number = 0.2) {
    const pivot = engine.addEntity()
    Transform.create(pivot, {
        parent: entity,
        position: Vector3.Zero(),
        scale: Vector3.scale(Vector3.One(), scale)
    })

    const sphere = engine.addEntity()
    Transform.create(sphere, {
        parent: pivot,
        position: Vector3.Zero(),
        scale: Vector3.One()
    })

    MeshRenderer.setSphere(sphere)
    Material.setPbrMaterial(sphere, {
        albedoColor: Color4.Yellow()
    })

    const bar1 = engine.addEntity()
    Transform.create(bar1, {
        parent: pivot,
        position: Vector3.create(0, 0, 0),
        scale: Vector3.create(5, 0.3, 0.3)
    })

    MeshRenderer.setBox(bar1)
    Material.setPbrMaterial(bar1, {
        albedoColor: Color4.Red()
    })

    const bar2 = engine.addEntity()
    Transform.create(bar2, {
        parent: pivot,
        position: Vector3.create(0, 0, 0),
        scale: Vector3.create(0.3, 5, 0.3)
    })

    MeshRenderer.setBox(bar2)
    Material.setPbrMaterial(bar2, {
        albedoColor: Color4.Green()
    })


    const bar3 = engine.addEntity()
    Transform.create(bar3, {
        parent: pivot,
        position: Vector3.create(0, 0, 0),
        scale: Vector3.create(0.3, 0.3, 5)
    })

    MeshRenderer.setBox(bar3)
    Material.setPbrMaterial(bar3, {
        albedoColor: Color4.Blue()
    })
    

}