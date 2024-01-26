import { GltfContainer, InputAction, MeshCollider, MeshRenderer, PointerEvents, Transform, engine, pointerEventsSystem } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";
import { Callback } from "@dcl/sdk/react-ecs";
import { coinEmitterDemo, progressDemo } from "./test_ui_complex";


let tablePositions = [
    Vector3.create(3.2, 1.05, 8),
    Vector3.create(4.2, 1.05, 8),
    Vector3.create(5.2, 1.05, 8),
    Vector3.create(6.2, 1.05, 8),
    Vector3.create(7.2, 1.05, 8),
    Vector3.create(8.2, 1.05, 8),
    Vector3.create(9.2, 1.05, 8),
    Vector3.create(10.2, 1.05, 8),
    Vector3.create(11.2, 1.05, 8),
    Vector3.create(12.2, 1.05, 8),

]

function createUIBox(label: string, pos: Vector3, callback: Callback, modelGLB: string) {
    let testObject = engine.addEntity()


    Transform.create(testObject,
        {
            position: pos
        })
    GltfContainer.create(testObject, { src: modelGLB })

    pointerEventsSystem.onPointerDown(
        {
            entity: testObject,
            opts: {
                button: InputAction.IA_POINTER,
                hoverText: 'Click'
            }
        },
        function () {
            console.log("clicked entity" + " " + label)
            callback()
        }
    )

}

export function addEnvironment() {
    let ground = engine.addEntity()
    Transform.create(ground)
    GltfContainer.create(ground, { src: 'models/ground.glb' })


    //MeshCollider.setBox(particleTestObject)

    createUIBox("Particle System", tablePositions[0], () => { coinEmitterDemo.spawnMultiple(3, 49, 48, 50, 90, () => { progressDemo.incrementProgressBar(0.05) }) }, 'models/box.glb')
    createUIBox("Particle System", tablePositions[1], () => { }, 'models/box.glb')
    createUIBox("Particle System", tablePositions[2], () => { }, 'models/box.glb')
    createUIBox("Particle System", tablePositions[3], () => { }, 'models/box.glb')
    createUIBox("Particle System", tablePositions[4], () => { }, 'models/box.glb')
    createUIBox("Particle System", tablePositions[5], () => { }, 'models/box.glb')
    createUIBox("Particle System", tablePositions[6], () => { }, 'models/box.glb')
    createUIBox("Particle System", tablePositions[7], () => { }, 'models/box.glb')
    createUIBox("Particle System", tablePositions[8], () => { }, 'models/box.glb')
    createUIBox("Particle System", tablePositions[9], () => { }, 'models/box.glb')

}


