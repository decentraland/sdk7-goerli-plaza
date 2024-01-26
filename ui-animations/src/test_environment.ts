import { GltfContainer, InputAction, MeshCollider, MeshRenderer, PointerEvents, Transform, engine, pointerEventsSystem } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";
import { Callback } from "@dcl/sdk/react-ecs";
import { animSpriteDemo, coinEmitterDemo, coinSpriteDemo, counterBarDemo, counterDemo, progressBounceAnimator, progressDemo, spinRaysDemo, spinnerDemo } from "./test_ui_complex";
import { spinRays, spinner } from "./examples/UISpinner_example";


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
                hoverText: label
            }
        },
        function () {
            console.log("clicked entity" + " " + label)
            callback()
        }
    )

}

export function hideAll() {
    counterDemo.hide()
    counterBarDemo.hide()
    spinnerDemo.hide()
    animSpriteDemo.hide()
    spinRaysDemo.hide()
    progressDemo.hide()
}
export function addEnvironment() {
    let ground = engine.addEntity()
    Transform.create(ground)
    GltfContainer.create(ground, { src: 'models/ground.glb' })


    //MeshCollider.setBox(particleTestObject)

    createUIBox("Particle System", tablePositions[0], () => {
        hideAll()
        counterDemo.show()
        counterBarDemo.show()
        progressDemo.show()
        coinSpriteDemo.show()
        coinEmitterDemo.spawnMultiple(2, 49, 48, 50, 89,
            () => {
                progressDemo.incrementProgressBar(0.02)
                progressBounceAnimator.playAnimation('bounce')
                counterBarDemo.increaseNumberBy(2)
            })
    }, 'models/box.glb')
    createUIBox("Progressbar", tablePositions[1], () => {
        hideAll()
        progressDemo.show()
    }, 'models/box.glb')
    createUIBox("Pop-up", tablePositions[2], () => { }, 'models/box.glb')
    createUIBox("Counter", tablePositions[3], () => {
        hideAll()
        counterDemo.show()
    }, 'models/box.glb')

    createUIBox("Spinner Rays", tablePositions[4], () => {
        hideAll()
        spinRaysDemo.show()
    }, 'models/box.glb')
    createUIBox("Spinner", tablePositions[5], () => {
        hideAll()
        spinnerDemo.show()
    }, 'models/box.glb')
    createUIBox("Sprite Animation", tablePositions[6], () => {
        hideAll()
        animSpriteDemo.show()
    }, 'models/box.glb')

    createUIBox("Card Flip", tablePositions[7], () => {

    }, 'models/box.glb')
    createUIBox("Particle System", tablePositions[8], () => { }, 'models/box.glb')
    createUIBox("Particle System", tablePositions[9], () => { }, 'models/box.glb')

}


