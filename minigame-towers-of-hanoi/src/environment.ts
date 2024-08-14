import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { AudioSource, AvatarModifierArea, AvatarModifierType, GltfContainer, MeshRenderer, Transform, engine, Entity } from '@dcl/sdk/ecs'
import { ui, sceneParentEntity } from "@dcl-sdk/mini-games/src"

export let backSign: Entity

export function initEnvironment() {
    backSign = engine.addEntity()

    GltfContainer.create(backSign, {
        src: "assets/scene/backSign.glb"
    })

    Transform.create(backSign, {
        parent: sceneParentEntity,
        position: Vector3.create(7, 0, 0),
        scale: Vector3.create(1, 1, 1),
        rotation: Quaternion.fromEulerDegrees(0, -90, 0)
    })
    let sideSignA = engine.addEntity()

    GltfContainer.create(sideSignA, {
        src: "assets/scene/sideSign.glb"

    })

    Transform.create(sideSignA, {
        parent: sceneParentEntity,
        position: Vector3.create(-6, 0, 7.4),
        scale: Vector3.create(0.8, 0.8, 0.8),
        rotation: Quaternion.fromEulerDegrees(0, 180, 0)
    })

    let instructions = engine.addEntity()

    GltfContainer.create(instructions, {
        src: "assets/scene/instructions.glb"

    })

    Transform.create(instructions, {
        parent: sideSignA,
        position: Vector3.create(0, 0, 0)
    })

    let sideSignB = engine.addEntity()

    GltfContainer.create(sideSignB, {
        src: "assets/scene/sideSign.glb"

    })

    Transform.create(sideSignB, {
        parent: sceneParentEntity,
        position: Vector3.create(-6, 0, -7.4),
        scale: Vector3.create(0.8, 0.8, 0.8),
        rotation: Quaternion.fromEulerDegrees(0, 0, 0)
    })

    let sideSignHeaderB = engine.addEntity()

    GltfContainer.create(sideSignHeaderB, {
        src: "assets/scene/scoreBoardHeader.glb"
    })

    Transform.create(sideSignHeaderB, {
        parent: sideSignB,
        position: Vector3.create(0, -0.2, 0)
    })

    new ui.ScoreBoard({
        parent: sideSignB,
        position: Vector3.create(1.3, 4, 0.2),
        rotation: Quaternion.fromEulerDegrees(0, 180, 0)
    },
        2.5,
        2.8,
        1.2,
        ui.TIME_LEVEL_MOVES
    )

    let fence = engine.addEntity()

    GltfContainer.create(fence, {
        src: "assets/scene/fence.glb"

    })

    Transform.create(fence, {
        parent: sceneParentEntity,
        position: Vector3.create(0, 0, 0),
        scale: Vector3.create(1, 1, 1),
        rotation: Quaternion.fromEulerDegrees(0, -90, 0)
    })

    let floor = engine.addEntity()

    GltfContainer.create(floor, {
        src: "assets/scene/floor.glb"

    })

    Transform.create(floor, {
        parent: sceneParentEntity,
        position: Vector3.create(0, 0, 0),
        scale: Vector3.create(1, 1, 1),
        rotation: Quaternion.fromEulerDegrees(0, -90, 0)
    })
    // Transform.create(floor, {
    //     position: Vector3.create(8, 0, 8),
    //     scale: Vector3.create(1, 1, 1),
    //     rotation: Quaternion.fromEulerDegrees(0, -90, 0)
    // })

    let music = engine.addEntity()

    Transform.create(music, { parent: engine.CameraEntity })

    AudioSource.create(music, {
        audioClipUrl: 'sounds/ambientMusic.mp3',
        playing: true,
        volume: 0.5
    })


    console.log("creating disable passports")
    const disablePassportsEntity = engine.addEntity()
    AvatarModifierArea.create(disablePassportsEntity, {
        area: Vector3.create(4, 0, 4),
        modifiers: [AvatarModifierType.AMT_DISABLE_PASSPORTS],
        excludeIds: []
    })

    Transform.create(disablePassportsEntity, {
        parent: sceneParentEntity,
        position: Vector3.create(0, 4, 0),
        scale: Vector3.create(16, 8, 16)
    })

    new ui.MenuButton({
        parent: backSign,
        position: Vector3.create(-3.3, 5.7, 0.1),
        scale: Vector3.create(2.4, 2.4, 2.4),
        rotation: Quaternion.fromEulerDegrees(-90, 90, 90)
    },
        ui.uiAssets.shapes.SQUARE_RED,
        ui.uiAssets.icons.music,
        'Play/Stop Music',
        () => AudioSource.getMutable(music).playing = !AudioSource.get(music).playing
    )
}