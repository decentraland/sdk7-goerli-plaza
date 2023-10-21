import { AudioSource, AvatarAnchorPointType, AvatarAttach, GltfContainer, InputAction, PointerEventType, Transform, engine, inputSystem } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"
import * as CANNON from 'cannon/build/cannon'
import { Teleport } from "./teleport"
import { Translocator } from "./translocator"
import { movePlayerTo } from "~system/RestrictedActions"
import { Sound } from "./sound"

export function main() {
    // Create base scene
    const base = engine.addEntity()
    GltfContainer.create(base, {
        src: "models/baseLight.glb"
    })
    Transform.create(base, { scale: Vector3.create(3, 1, 3) })

    // Teleport effect (not the actual translocator)
    const teleport = new Teleport("models/teleport.glb")

    // Translocator and setting
    const X_OFFSET = 0
    const Y_OFFSET = 2
    const Z_OFFSET = 1

    const translatorParent = engine.addEntity()
    AvatarAttach.create(translatorParent, {
        anchorPointId: AvatarAnchorPointType.AAPT_POSITION
    })

    const translocator = new Translocator({ position: Vector3.create(X_OFFSET, Y_OFFSET, Z_OFFSET), rotation: Quaternion.Zero(), scale: Vector3.One(), parent: translatorParent })

    // Sounds
    const teleportSound = new Sound("sounds/teleport.mp3")
    const shootSound = new Sound("sounds/shoot.mp3")
    const recallSound = new Sound("sounds/recall.mp3")

    // Setup our CANNON world
    const world = new CANNON.World()
    world.quatNormalizeSkip = 0
    world.quatNormalizeFast = false
    world.gravity.set(0, -9.82, 0) // m/s²

    const groundMaterial = new CANNON.Material("groundMaterial")
    const groundContactMaterial = new CANNON.ContactMaterial(groundMaterial, groundMaterial, { friction: 0, restitution: 0.33 })
    world.addContactMaterial(groundContactMaterial)

    // Create a ground plane and apply physics material
    const groundShape = new CANNON.Plane()
    const groundBody = new CANNON.Body({ mass: 0 })
    groundBody.addShape(groundShape)
    groundBody.material = groundMaterial
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2) // Reorient ground plane to be in the y-axis
    world.addBody(groundBody)

    // Invisible walls
    //#region
    const wallShape = new CANNON.Box(new CANNON.Vec3(24, 50, 0.5))
    const wallNorth = new CANNON.Body({
        mass: 0,
        shape: wallShape,
        position: new CANNON.Vec3(24, 49.5, 48),
    })
    world.addBody(wallNorth)

    const wallSouth = new CANNON.Body({
        mass: 0,
        shape: wallShape,
        position: new CANNON.Vec3(24, 49.5, 0),
    })
    world.addBody(wallSouth)

    const wallEast = new CANNON.Body({
        mass: 0,
        shape: wallShape,
        position: new CANNON.Vec3(48, 49.5, 24),
    })
    wallEast.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
    world.addBody(wallEast)

    const wallWest = new CANNON.Body({
        mass: 0,
        shape: wallShape,
        position: new CANNON.Vec3(0, 49.5, 24),
    })
    wallWest.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
    world.addBody(wallWest)
    //#endregion

    // Create translocator physics
    let translocatorTransform = Transform.getMutable(translocator.entity)

    const translocatorBody: CANNON.Body = new CANNON.Body({
        mass: 3, // kg
        position: new CANNON.Vec3(translocatorTransform.position.x, translocatorTransform.position.y, translocatorTransform.position.z), // m
        shape: new CANNON.Sphere(0.2), // m (Create sphere shaped body with a radius of 0.2)
    })

    const translocatorPhysicsMaterial: CANNON.Material = new CANNON.Material("translocatorMaterial")
    const translocatorPhysicsContactMaterial = new CANNON.ContactMaterial(groundMaterial, translocatorPhysicsMaterial, {
        friction: 0.0,
        restitution: 0.8,
    })
    world.addContactMaterial(translocatorPhysicsContactMaterial)

    translocatorBody.material = translocatorPhysicsMaterial // Add bouncy material to translocator body
    translocatorBody.linearDamping = 0.4 // Round bodies will keep translating even with friction so you need linearDamping
    translocatorBody.angularDamping = 0.4 // Round bodies will keep rotating even with friction so you need angularDamping

    world.addBody(translocatorBody) // Add body to the world

    // Config
    const SHOOT_VELOCITY = 100
    const FIXED_TIME_STEPS = 1.0 / 60.0 // seconds
    const MAX_TIME_STEPS = 3
    const RECALL_SPEED = 10

    function shootDiscSystem(dt: number) {
        if (translocator.isFired) {
            world.step(FIXED_TIME_STEPS, dt, MAX_TIME_STEPS)
            let transform = Transform.getMutable(translocator.entity)
            transform.position = translocatorBody.position
        } else {
            engine.removeSystem(shootDiscSystem)
        }
    }

    // Recall translocator disc
    function recallDiscSystem(dt: number) {
        if (!translocator.isFired) {
            let transform = Transform.getMutable(translocator.entity)
            const player = Transform.get(engine.CameraEntity)
            let playerForwardVector = Vector3.subtract(transform.position, Vector3.create(player.position.x, player.position.y - Y_OFFSET, player.position.z))
            let increment = Vector3.scale(playerForwardVector, -dt * RECALL_SPEED)
            transform.position = Vector3.add(
                translocatorTransform.position,
                increment
            )
            let distance = Vector3.distanceSquared(transform.position, player.position) // Check distance squared as it's more optimized
            // Note: Distance is squared so a value of 4.5 is when the translocator is ~2.1m away
            if (distance <= 4.5) {
                engine.removeSystem(recallDiscSystem)
                resetDisc()
            }
        }
    }

    // Input system
    engine.addSystem(() => {
        // Shoot / recall translocator disc
        const pointerDown = inputSystem.getInputCommand(
            InputAction.IA_POINTER,
            PointerEventType.PET_DOWN
        )
        if (pointerDown) {
            if (!translocator.isFired) {
                engine.addSystem(shootDiscSystem)
                AudioSource.getMutable(shootSound.entity).playing = true
                translocator.setGlow(true)
                Transform.getMutable(translocator.entity).parent = engine.RootEntity

                let cameraTransform = Transform.get(engine.CameraEntity)
                let shootDirection = Vector3.rotate(Vector3.Forward(), cameraTransform.rotation) //Vector3.Forward().rotate(Camera.instance.rotation) // Camera's forward vector
                translocatorBody.position.set(
                    cameraTransform.position.x + shootDirection.x,
                    shootDirection.y + cameraTransform.position.y,
                    cameraTransform.position.z + shootDirection.z
                )

                // Shoot
                translocatorBody.applyImpulse(
                    new CANNON.Vec3(shootDirection.x * SHOOT_VELOCITY, shootDirection.y * SHOOT_VELOCITY, shootDirection.z * SHOOT_VELOCITY),
                    new CANNON.Vec3(translocatorBody.position.x, translocatorBody.position.y, translocatorBody.position.z)
                )
            } else {
                // Recall
                console.log("adding recall")
                engine.addSystem(recallDiscSystem)
                AudioSource.getMutable(recallSound.entity).playing = true
                translocator.setGlow(false)
            }
        }

        // Teleport with the E key
        const primaryDown = inputSystem.getInputCommand(
            InputAction.IA_PRIMARY,
            PointerEventType.PET_DOWN
        )
        if (primaryDown) {
            if (translocator.isFired) {
                translocator.setGlow(false)
                AudioSource.getMutable(teleportSound.entity).playing = true
                movePlayerTo({ newRelativePosition: translocatorBody.position })
                resetDisc()
                teleport.playAnimation()
            }
        }
    }
    )

    function resetDisc(): void {
        translocatorBody.velocity.setZero()
        translocatorBody.angularVelocity.setZero()
        let transform = Transform.getMutable(translocator.entity)
        transform.parent = translatorParent
        transform.position = Vector3.create(X_OFFSET, Y_OFFSET, Z_OFFSET)
    }
}
