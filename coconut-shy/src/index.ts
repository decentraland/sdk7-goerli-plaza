import { CameraModeArea, CameraType, Entity, GltfContainer, InputAction, PointerEventType, Transform, engine, executeTask, inputSystem, pointerEventsSystem } from "@dcl/sdk/ecs"
import { createBall, playerThrow } from "./modules/ball"
import { createCoconut } from "./modules/coconut"
// import { coconutShyMeshVertices, coconutShyMeshIndices } from "./modules/meshData/coconutShyMesh"
// import { wallMeshVertices, wallMeshIndices } from "./modules/meshData/wallMesh"
import { loadColliders } from "./modules/colliderSetup"
import { Color4, Vector3 } from "@dcl/sdk/math"
import CANNON from "cannon"
import { Ball } from "./modules/components"
import { createRaycast } from "./modules/highlighter"
import { uiBar } from "./ui-entities/UiBar"
import { setupUi } from "./ui"

// UI
setupUi()

// RAYCAST
createRaycast(engine.CameraEntity)

// Create base
const base = engine.addEntity()
// Create base shape
Transform.create(base)
// Set the mesh
GltfContainer.create(base, {
  src: 'models/baseLight.glb',
})

const coconutShy = engine.addEntity()
Transform.create(coconutShy)
GltfContainer.create(coconutShy, {
  src: 'models/coconutShy.glb',
})

// Setup our world
const world = new CANNON.World()
world.quatNormalizeSkip = 0
world.quatNormalizeFast = false
world.gravity.set(0, -16, 0) // m/s²

loadColliders(world)

// Setup ground material
const physicsMaterial = new CANNON.Material("groundMaterial")
const ballContactMaterial = new CANNON.ContactMaterial(physicsMaterial, physicsMaterial, { friction: 1, restitution: 0.5 })
world.addContactMaterial(ballContactMaterial)

// Create balls
const ball1 = createBall(Vector3.create(7.4, 1.43, 6.7), physicsMaterial, world)
const ball2 = createBall(Vector3.create(7.7, 1.43, 6.7), physicsMaterial, world)
const ball3 = createBall(Vector3.create(8, 1.43, 6.7), physicsMaterial, world)
const ball4 = createBall(Vector3.create(8.3, 1.43, 6.7), physicsMaterial, world)
const ball5 = createBall(Vector3.create(8.6, 1.43, 6.7), physicsMaterial, world)

const balls: any[] = [ball1, ball2, ball3, ball4, ball5]

// Create coconuts
const coconut1 = createCoconut(Vector3.create(7.2, 2.42, 9.535), physicsMaterial, world)
const coconut2 = createCoconut(Vector3.create(7.6, 2.25, 9.535), physicsMaterial, world)
const coconut3 = createCoconut(Vector3.create(8, 2.42, 9.535), physicsMaterial, world)
const coconut4 = createCoconut(Vector3.create(8.4, 2.25, 9.535), physicsMaterial, world)
const coconut5 = createCoconut(Vector3.create(8.8, 2.42, 9.535), physicsMaterial, world)
const coconuts: any[] = [coconut1, coconut2, coconut3, coconut4, coconut5]

// Create a ground plane and apply physics material
const groundShape: CANNON.Plane = new CANNON.Plane()
const groundBody: CANNON.Body = new CANNON.Body({ mass: 0 })
groundBody.addShape(groundShape)
groundBody.material = physicsMaterial
groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2) // Reorient ground plane to be in the y-axis
groundBody.position.set(0, 0.05, 0)
world.addBody(groundBody) // Add ground body to world

// Controls and UI
let throwPower = 0
let isPowerUp = true
const POWER_UP_SPEED = 150

export function powerMeterSystem(dt: number) {
  if (throwPower < 1) {
    isPowerUp = true
  } else if (throwPower > 99) {
    isPowerUp = false
  }

  if (throwPower > 0 || throwPower < 99) {
    isPowerUp ? (throwPower += dt * POWER_UP_SPEED * 1.1) : (throwPower -= dt * POWER_UP_SPEED) // Powering up is 10% faster
    uiBar.set(throwPower / 100)
    throwPower > 80 ? (uiBar.color = Color4.Red()) : (uiBar.color = Color4.Yellow())
  }
}

// Controls
/////// GLOBAL EVENT LISTENERS
engine.addSystem(() => {
  // Pointer down
  if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN)) {
    for (let ball of balls) {
      const ballComponent = Ball.getMutable(ball.ball)
      if (ballComponent.isActive && !ballComponent.isThrown) {
        throwPower = 1
        engine.addSystem(powerMeterSystem)
      }
    }
  }
  // Pointer up
  if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_UP)) {
    for (let ball of balls) {
      const ballComponent = Ball.getMutable(ball.ball)
      if (ballComponent.isActive && !ballComponent.isThrown) {
        // Strength system
        engine.removeSystem(powerMeterSystem)
        uiBar.set(0)
        let throwDirection = Vector3.rotate(Vector3.Forward(), Transform.get(engine.CameraEntity).rotation) // Camera's forward vector
        playerThrow(ball.ball, ball.body, throwDirection, throwPower)
      }
    }
  }
})

// Set high to prevent tunnelling
const FIXED_TIME_STEPS = 1.0 / 60
const MAX_TIME_STEPS = 10

export function physicsSystem(dt: number) {
  world.step(FIXED_TIME_STEPS, dt, MAX_TIME_STEPS)

  for (let i = 0; i < balls.length; i++) {
    const ballComponent = Ball.getMutable(balls[i].ball)
    if (!ballComponent.isActive) {
      Vector3.copyFrom(balls[i].body.position, Transform.getMutable(balls[i].ball).position)
      Transform.getMutable(balls[i].ball).rotation = balls[i].body.quaternion
    }
    if (balls[i].body.velocity.almostEquals(new CANNON.Vec3(0, 0, 0), 2) && balls[i].body.sleepState !== CANNON.Body.SLEEPING) {
    }
    for (let i = 0; i < coconuts.length; i++) {
      Transform.getMutable(coconuts[i].coconut).position = coconuts[i].body.position
      Transform.getMutable(coconuts[i].coconut).rotation = coconuts[i].body.quaternion
    }
  }
}

engine.addSystem(physicsSystem)

// Camera area modifier to match with picked ball visuals
export const areaEntity = engine.addEntity()
Transform.create(areaEntity, {
  position: Vector3.create(8, 0, 8)
})
