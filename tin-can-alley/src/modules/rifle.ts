import { Animator, ColliderLayer, Entity, GltfContainer, Transform, engine } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { Position } from "~system/EngineApi"
import { Cooldown } from "../components"
import { playshotSilencerSound } from "./sound"

export function createRifle(model: string, position: Position, rotation: Vector3) {
    const rifle = engine.addEntity()

    Transform.create(rifle, {
        position: position,
        rotation: Quaternion.fromEulerDegrees(rotation.x, rotation.y, rotation.z)
    })
    GltfContainer.create(rifle, {
        src: model,
        invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
        visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
    })

    Cooldown.create(rifle)

    Transform.getMutable(rifle).parent = engine.CameraEntity
    Transform.getMutable(rifle).position = Vector3.create(0.075, -0.5, 0.2)

    Animator.create(rifle, {
        states: [{
            name: "Blank",
            clip: "Blank",
            playing: true,
            loop: false
        },
        {
            name: "Fire",
            clip: "Fire",
            playing: false,
            loop: false
        }
        ]
    })

    return { rifle }
}

// Play gun fire animation
export function playFireAnim(rifle: Entity) {
    playshotSilencerSound()
    Animator.stopAllAnimations(rifle)
    Animator.playSingleAnimation(rifle, "Fire")
    engine.addSystem(CooldownSystem)

    let timer = Cooldown.getMutable(rifle).time
    function CooldownSystem(dt: number) {
        Cooldown.getMutable(rifle).on = true
        timer -= dt
        if (timer <= 0) {
            timer = Cooldown.getMutable(rifle).time
            Cooldown.getMutable(rifle).on = false
            engine.removeSystem(CooldownSystem)
        }
    }
}

