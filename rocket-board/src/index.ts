import { GltfContainer, InputAction, PointerEventType, Transform, engine, inputSystem } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import CANNON from 'cannon'
import { createRing } from './ring'
import { playrocketBoosterSound, stoprocketBoosterSound } from './sound'
import { setupUi } from './ui'

export function main() {
  // Create base
  const base = engine.addEntity()
  // Create base shape
  Transform.create(base)
  // Set the mesh
  GltfContainer.create(base, {
    src: 'assets/scene/Models/baseLargeCheckered.glb'
  })

  // Create ring
  const ring = createRing('assets/scene/Models/ring.glb', Vector3.create(40, 12, 40), 2)

  // Create rocket board
  const rocketBoard = engine.addEntity()
  Transform.create(rocketBoard, {
    position: Vector3.create(12, 2, 12),
    scale: Vector3.create(1, 1, 1)
  })
  GltfContainer.create(rocketBoard, {
    src: 'assets/scene/Models/rocketBoard.glb'
  })

  const rocketFlames = engine.addEntity()
  Transform.create(rocketFlames, {
    scale: Vector3.create(0, 0, 0),
    parent: rocketBoard
  })
  GltfContainer.create(rocketFlames, {
    src: 'assets/scene/Models/rocketFlames.glb'
  })

  // Useful vectors
  let forwardVector: Vector3 = Vector3.rotate(Vector3.Forward(), Transform.get(engine.CameraEntity).rotation) // Camera's forward vector
  const velocityScale: number = 3

  // Setup our world
  const world = new CANNON.World()
  world.gravity.set(0, -20, 0) // m/s²
  const groundMaterial = new CANNON.Material('groundMaterial')
  const groundContactMaterial = new CANNON.ContactMaterial(groundMaterial, groundMaterial, {
    friction: 1,
    restitution: 0.33
  })
  world.addContactMaterial(groundContactMaterial)

  // Invisible walls
  //#region
  const wallShape = new CANNON.Box(new CANNON.Vec3(40, 50, 0.5))
  const wallNorth = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(40, 49.5, 80)
  })
  world.addBody(wallNorth)

  const wallSouth = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(40, 49.5, 0)
  })
  world.addBody(wallSouth)

  const wallEast = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(80, 49.5, 40)
  })
  wallEast.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
  world.addBody(wallEast)

  const wallWest = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(0, 49.5, 40)
  })
  wallWest.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
  world.addBody(wallWest)
  //#endregion

  // Create a ground plane and apply physics material
  const groundBody = new CANNON.Body({ mass: 0 })
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2) // Reorient ground plane to be in the y-axis

  const groundShape: CANNON.Plane = new CANNON.Plane()
  groundBody.addShape(groundShape)
  groundBody.material = groundMaterial
  world.addBody(groundBody)

  const boxMaterial = new CANNON.Material('boxMaterial')
  const boxContactMaterial = new CANNON.ContactMaterial(groundMaterial, boxMaterial, { friction: 0.4, restitution: 0 })
  world.addContactMaterial(boxContactMaterial)

  // Create body to represent the rocket board
  const rocketTransform = Transform.get(rocketBoard)

  const rocketBody: CANNON.Body = new CANNON.Body({
    mass: 5, // kg
    position: new CANNON.Vec3(rocketTransform.position.x, rocketTransform.position.y, rocketTransform.position.z), // m
    shape: new CANNON.Box(new CANNON.Vec3(2, 0.3, 2)) // m (Create sphere shaped body with a radius of 1)
  })
  rocketBody.material = boxMaterial // Add bouncy material to box body
  world.addBody(rocketBody) // Add body to the world

  const fixedTimeStep: number = 1.0 / 120.0 // seconds
  const maxSubSteps: number = 1

  function physicsUpdateSystem(dt: number) {
    // Instruct the world to perform a single step of simulation.
    // It is generally best to keep the time step and iterations fixed.
    world.step(fixedTimeStep, dt, maxSubSteps)

    // E key - forward
    if (inputSystem.isPressed(InputAction.IA_PRIMARY)) {
      forwardVector = Vector3.rotate(Vector3.Forward(), Transform.get(engine.CameraEntity).rotation) // Update forward vector to wherever the player is facing
      rocketBody.applyImpulse(
        new CANNON.Vec3(forwardVector.x * velocityScale, 0, forwardVector.z * velocityScale),
        new CANNON.Vec3(rocketBody.position.x, rocketBody.position.y, rocketBody.position.z)
      )
      activateRocketBooster(true)
    }

    // F key - up
    if (inputSystem.isPressed(InputAction.IA_SECONDARY)) {
      rocketBody.applyImpulse(
        new CANNON.Vec3(0, 1 * velocityScale, 0),
        new CANNON.Vec3(rocketBody.position.x, rocketBody.position.y, rocketBody.position.z)
      )
      activateRocketBooster(true)
    }

    if (!inputSystem.isPressed(InputAction.IA_PRIMARY) && !inputSystem.isPressed(InputAction.IA_SECONDARY)) {
      activateRocketBooster(false)
    }

    rocketBody.angularVelocity.setZero() // Prevents the board from rotating in any direction
    // Position the rocket board to match that of the rocket body that's affected by physics
    Transform.getMutable(rocketBoard).position = rocketBody.position
    forwardVector = Vector3.rotate(Vector3.Forward(), Transform.get(engine.CameraEntity).rotation) // Update forward vector to wherever the player is facing
  }

  engine.addSystem(physicsUpdateSystem)

  // Activate booster animation
  function activateRocketBooster(isOn: boolean) {
    if (isOn) {
      playrocketBoosterSound()
      Transform.getMutable(rocketFlames).scale = Vector3.One()
    } else {
      stoprocketBoosterSound()
      Transform.getMutable(rocketFlames).scale = Vector3.Zero()
    }
  }

  // UI with GitHub link
  setupUi()
}
