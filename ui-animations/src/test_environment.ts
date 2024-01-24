import { GltfContainer, Transform, engine } from "@dcl/sdk/ecs";


export function addEnvironment() {
    let ground = engine.addEntity()
    Transform.create(ground)
    GltfContainer.create(ground, { src: 'models/ground.glb' })

    let particleTestObject = engine.addEntity()
    Transform.create(particleTestObject)


}


