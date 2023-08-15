import { GltfContainer, Transform, engine } from "@dcl/sdk/ecs";
import { Vector3, Quaternion } from "@dcl/sdk/math";

export function createScene2(){
const scene2 = engine.addEntity()

Transform.create(scene2, {
    position: Vector3.create(0, 0, 0),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1)
})


const shopBlack = engine.addEntity()
Transform.create(shopBlack, {
    position: Vector3.create(26, 0, 8),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1),
    parent: scene2
})
GltfContainer.create(shopBlack, {
    src: 'models/Shop_Emissive.glb'
}
)



const shopBlack2 = engine.addEntity()
Transform.create(shopBlack2, {
    position: Vector3.create(16, 0, 8),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1),
    parent: scene2
})
GltfContainer.create(shopBlack2, {
    src: 'models/Shop_Emissive.glb'
}
)

const shopBlack3 = engine.addEntity()
Transform.create(shopBlack3, {
    position: Vector3.create(4, 0, 8),
    rotation: Quaternion.create(0, 0, 0, 1),
    scale: Vector3.create(1, 1, 1),
    parent: scene2
})
GltfContainer.create(shopBlack3, {
    src: 'models/Shop_Emissive.glb'
}
)



const shopBlack4 = engine.addEntity()
Transform.create(shopBlack4, {
    position: Vector3.create(26, 0, 26),
    rotation: Quaternion.create(7.362779683899381e-15,
        1,
        -1.1920927533992653e-7,
        2.980232238769531e-8),
    scale: Vector3.create(1, 1, 1),
    parent: scene2
})
GltfContainer.create(shopBlack4, {
    src: 'models/Shop_Emissive.glb'
}
)

const shopBlack5 = engine.addEntity()
Transform.create(shopBlack5, {
    position: Vector3.create(16, 0, 26),
    rotation: Quaternion.create(7.362779683899381e-15,
        1,
        -1.1920927533992653e-7,
        2.980232238769531e-8),
    scale: Vector3.create(1, 1, 1),
    parent: scene2
})
GltfContainer.create(shopBlack5, {
    src: 'models/Shop_Emissive.glb'
}
)

const shopBlack6 = engine.addEntity()
Transform.create(shopBlack6, {
    position: Vector3.create(4, 0, 26),
    rotation: Quaternion.create(7.362779683899381e-15,
        1,
        -1.1920927533992653e-7,
        2.980232238769531e-8),
    scale: Vector3.create(1, 1, 1),
    parent: scene2
})
GltfContainer.create(shopBlack6, {
    src: 'models/Shop_Emissive.glb'
}
)


return scene2}