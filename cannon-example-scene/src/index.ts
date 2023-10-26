import {
  Entity,
  GltfContainer,
  InputAction,
  Transform,
  engine,
  pointerEventsSystem,
  inputSystem,
  PointerEventType
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { Ball } from './ball'
import { loadColliders } from './wallCollidersSetup'
import * as CANNON from 'cannon/build/cannon'

export function main() {
  // Create base scene
  const baseScene: Entity = engine.addEntity()
  GltfContainer.create(baseScene, {
    src: 'models/baseScene.glb'
  })
  Transform.create(baseScene)

  // Ball shapes
  const ballShapes: string[] = [
    'models/redBall.glb',
    'models/greenBall.glb',
    'models/blueBall.glb',
    'models/pinkBall.glb',
    'models/yellowBall.glb'
  ]

  const balls: Ball[] = [] // Store balls
  const ballBodies: CANNON.Body[] = [] // Store ball bodies
  let ballHeight = 12 // Start height for the balls
  let forwardVector: Vector3 = Vector3.rotate(Vector3.Forward(), Transform.get(engine.CameraEntity).rotation) // Camera's forward vector
  const vectorScale: number = 25

  const randomPositions: any = []
  // Create random balls and positions
  for (let i = 0; i < ballShapes.length; i++) {
    const randomPositionX: number = Math.floor(Math.random() * 3) + 14
    const randomPositionY: number = ballHeight
    const randomPositionZ: number = Math.floor(Math.random() * 3) + 14
    randomPositions.push({ x: randomPositionX, y: randomPositionY, z: randomPositionZ })

    const ball = new Ball(ballShapes[i], {
      position: randomPositions[i],
      rotation: Quaternion.Zero(),
      scale: Vector3.One()
    })
    balls.push(ball)
    ballHeight += 2 // To ensure the colliders aren't intersecting when the simulation starts

    // Allow the user to interact with the ball
    pointerEventsSystem.onPointerDown(
      {
        entity: ball.entity,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'kick'
        }
      },
      function (cmd: any) {
        // Apply impulse based on the direction of the camera
        ballBodies[i].applyImpulse(
          new CANNON.Vec3(forwardVector.x * vectorScale, forwardVector.y * vectorScale, forwardVector.z * vectorScale),
          // Applies impulse based on the player's position and where they click on the ball
          new CANNON.Vec3(cmd.hit?.position?.x, cmd.hit?.position?.y, cmd.hit?.position?.z)
        )
      }
    )
  }

  // Setup our world
  const world: CANNON.World = new CANNON.World()
  world.gravity.set(0, -9.82, 0) // m/s²

  // Add invisible colliders
  loadColliders(world)

  const groundPhysicsMaterial = new CANNON.Material('groundMaterial')
  const groundPhysicsContactMaterial = new CANNON.ContactMaterial(groundPhysicsMaterial, groundPhysicsMaterial, {
    friction: 0.5,
    restitution: 0.33
  })
  world.addContactMaterial(groundPhysicsContactMaterial)

  // Create a ground plane and apply physics material
  const groundBody: CANNON.Body = new CANNON.Body({
    mass: 0 // mass === 0 makes the body static
  })
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2) // Reorient ground plane to be in the y-axis

  const groundShape: CANNON.Plane = new CANNON.Plane()
  groundBody.addShape(groundShape)
  groundBody.material = groundPhysicsMaterial
  world.addBody(groundBody)

  const ballPhysicsMaterial: CANNON.Material = new CANNON.Material('ballMaterial')
  const ballPhysicsContactMaterial = new CANNON.ContactMaterial(groundPhysicsMaterial, ballPhysicsMaterial, {
    friction: 0.4,
    restitution: 0.75
  })
  world.addContactMaterial(ballPhysicsContactMaterial)

  // Create bodies to represent each of the balls
  for (let i = 0; i < balls.length; i++) {
    const ballTransform = Transform.get(balls[i].entity)

    const ballBody: CANNON.Body = new CANNON.Body({
      mass: 5, // kg
      position: new CANNON.Vec3(ballTransform.position.x, ballTransform.position.y, ballTransform.position.z), // m
      shape: new CANNON.Sphere(1) // m (Create sphere shaped body with a radius of 1)
    })

    ballBody.material = ballPhysicsMaterial // Add bouncy material to ball body
    ballBody.linearDamping = 0.4 // Round will keep translating even with friction so you need linearDamping
    ballBody.angularDamping = 0.4 // Round bodies will keep rotating even with friction so you need angularDamping

    world.addBody(ballBody) // Add body to the world
    ballBodies.push(ballBody)
  }

  const fixedTimeStep: number = 1.0 / 60.0 // seconds
  const maxSubSteps: number = 3

  function updateSystem(dt: number): void {
    // Instruct the world to perform a single step of simulation.
    // It is generally best to keep the time step and iterations fixed.
    world.step(fixedTimeStep, dt, maxSubSteps)

    // Position and rotate the balls in the scene to match their cannon world counterparts
    for (let i = 0; i < balls.length; i++) {
      const ballTransform = Transform.getMutable(balls[i].entity)
      ballTransform.position = ballBodies[i].position
      ballTransform.rotation = ballBodies[i].quaternion
    }

    // Update forward vector
    forwardVector = Vector3.rotate(Vector3.Forward(), Transform.get(engine.CameraEntity).rotation)
    // console.log('Forward Vector: ', forwardVector)
  }

  engine.addSystem(updateSystem)

  // Input system
  engine.addSystem(() => {
    // Reset with the E key
    const primaryDown = inputSystem.getInputCommand(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)
    if (primaryDown) {
      for (let i = 0; i < ballBodies.length; i++) {
        ballBodies[i].position.set(randomPositions[i].x, randomPositions[i].y, randomPositions[i].z)
      }
    }
  })
}
