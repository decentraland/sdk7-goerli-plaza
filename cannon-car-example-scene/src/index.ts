import {
  GltfContainer,
  InputAction,
  Transform,
  engine,
  Material,
  Entity,
  MeshCollider,
  MeshRenderer,
  TransformType,
  inputSystem,
  PointerEventType
} from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import * as CANNON from 'cannon/build/cannon'
import { setupUi } from './ui'

export function main() {
  /// >>>>>>>>>> TODO: Reorient the car and wheels <<<<<<<<<<
  /// >>>>>>>>>> TODO: Needs refactoring <<<<<<<<<<
  /// >>>>>>>>>> TODO: Switch to cannon-es.js <<<<<<<<<<

  // Create base scene
  const baseScene: Entity = engine.addEntity()
  GltfContainer.create(baseScene, {
    src: 'assets/scene/Models/baseScene.glb'
  })
  Transform.create(baseScene, { scale: Vector3.create(2.5, 0.05, 2.5) })

  const boxes: Entity[] = [] // Store boxes
  const boxBodies: CANNON.Body[] = [] // Store box bodies
  let boxStartPosition: number = 34 // Start position for the boxes
  let boxHeightPosition: number = 2

  // Create wall of boxes
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 6; j++) {
      let positionX: number = boxStartPosition
      let positionY: number = boxHeightPosition
      let positionZ: number = 38

      const box: Entity = engine.addEntity()
      MeshRenderer.setBox(box)
      MeshCollider.setBox(box)
      Transform.create(box, {
        position: Vector3.create(positionX, positionY, positionZ),
        scale: Vector3.create(2, 2, 2)
      })
      const blue = Color4.fromInts(21, 105, 195, 255)
      const black = Color4.fromInts(35, 35, 35, 255)
      if (i % 2 == 0) {
        if (j % 2 == 0) {
          Material.setPbrMaterial(box, {
            albedoColor: blue,
            roughness: 0.5
          })
        } else {
          Material.setPbrMaterial(box, {
            albedoColor: black,
            roughness: 0.5
          })
        }
      } else {
        if (j % 2 == 0) {
          Material.setPbrMaterial(box, {
            albedoColor: black,
            roughness: 0.5
          })
        } else {
          Material.setPbrMaterial(box, {
            albedoColor: blue,
            roughness: 0.5
          })
        }
      }
      boxes.push(box)
      boxStartPosition += 2
    }
    boxStartPosition = 34
    boxHeightPosition += 2 // To ensure the colliders aren't intersecting when the simulation starts
  }

  // Car entities
  const chassis: Entity = engine.addEntity()
  GltfContainer.create(chassis, {
    src: 'assets/scene/Models/carBody.glb'
  })
  Transform.create(chassis)

  const wheels: Entity[] = []
  const wheelPositions: Vector3[] = [
    Vector3.create(2, 1.5, 0),
    Vector3.create(2, -1.5, 0),
    Vector3.create(-2.1, 1.5, 0),
    Vector3.create(-2.1, -1.5, 0)
  ]

  for (let i = 0; i < wheelPositions.length; i++) {
    const wheel: Entity = engine.addEntity()
    if (i % 2 == 0) {
      GltfContainer.create(wheel, {
        src: 'assets/scene/Models/carWheelRight.glb'
      })
    } else {
      GltfContainer.create(wheel, {
        src: 'assets/scene/Models/carWheelLeft.glb'
      })
    }

    Transform.create(wheel, { position: wheelPositions[i] })
    wheels.push(wheel)
  }

  // Setup our world
  const world: CANNON.World = new CANNON.World()
  world.broadphase = new CANNON.SAPBroadphase(world)
  world.gravity.set(0, -9.82, 0) // m/s²
  world.defaultContactMaterial.friction = 0

  const groundMaterial: CANNON.Material = new CANNON.Material('groundMaterial')
  const wheelMaterial: CANNON.Material = new CANNON.Material('wheelMaterial')
  const wheelGroundContactMaterial: CANNON.ContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
    friction: 0.3,
    restitution: 0,
    contactEquationStiffness: 1000
  })

  const boxMaterial: CANNON.Material = new CANNON.Material('boxMaterial')
  const boxToGroundContactMaterial: CANNON.ContactMaterial = new CANNON.ContactMaterial(groundMaterial, boxMaterial, {
    friction: 0.4,
    restitution: 0.5
  })
  const boxToBoxContactMaterial: CANNON.ContactMaterial = new CANNON.ContactMaterial(boxMaterial, boxMaterial, {
    friction: 0.5,
    restitution: 0.5
  })
  world.addContactMaterial(boxToGroundContactMaterial)
  world.addContactMaterial(boxToBoxContactMaterial)

  // Create bodies to represent each of the box
  for (let i = 0; i < boxes.length; i++) {
    let boxTransform: TransformType = Transform.get(boxes[i])
    const boxBody: CANNON.Body = new CANNON.Body({
      mass: 2, // kg
      position: new CANNON.Vec3(boxTransform.position.x, boxTransform.position.y, boxTransform.position.z), // m
      shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)) // m
    })

    boxBody.material = boxMaterial
    boxBody.linearDamping = 0.5
    boxBody.angularDamping = 0.5

    world.addBody(boxBody) // Add body to the world
    boxBodies.push(boxBody)
  }

  // We must add the contact materials to the world
  world.addContactMaterial(wheelGroundContactMaterial)

  // Create a ground plane and apply physics material
  const groundBody: CANNON.Body = new CANNON.Body({
    mass: 0 // mass == 0 makes the body static
  })
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2) // Reorient ground plane to be in the y-axis

  const groundShape: CANNON.Plane = new CANNON.Plane()
  groundBody.addShape(groundShape)
  groundBody.material = groundMaterial
  world.addBody(groundBody)

  const chassisShape: CANNON.Box = new CANNON.Box(new CANNON.Vec3(7.2 / 2, 3.3 / 2, 1.7 / 2)) // Dimensions is from the center
  const chassisBody: CANNON.Body = new CANNON.Body({ mass: 150 })
  chassisBody.addShape(chassisShape)
  chassisBody.position.set(16, 4, 16) // Start position in scene
  chassisBody.angularVelocity.set(-1.5, 0.0, 1.5)

  const options = {
    radius: 0.5, // m
    directionLocal: new CANNON.Vec3(0, 0, -1),
    suspensionStiffness: 30,
    suspensionRestLength: 0.4,
    frictionSlip: 5,
    dampingRelaxation: 2.3,
    dampingCompression: 4.4,
    maxSuspensionForce: 100000,
    rollInfluence: 0.01,
    axleLocal: new CANNON.Vec3(0, 1, 0),
    chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
    maxSuspensionTravel: 0.3,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true
  }

  // Create the vehicle
  const vehicle: CANNON.RaycastVehicle = new CANNON.RaycastVehicle({
    chassisBody: chassisBody
  })

  // Set the wheel bodies positions
  for (let i = 0; i < wheelPositions.length; i++) {
    options.chassisConnectionPointLocal.set(wheelPositions[i].x, wheelPositions[i].y, wheelPositions[i].z)
    vehicle.addWheel(options)
  }
  vehicle.addToWorld(world)

  const wheelBodies: CANNON.Body[] = []

  for (let i = 0; i < vehicle.wheelInfos.length; i++) {
    let wheel = vehicle.wheelInfos[i]
    let cylinderShape: CANNON.Cylinder = new CANNON.Cylinder(
      wheel.radius ?? options.radius,
      wheel.radius ?? options.radius,
      wheel.radius ?? options.radius / 2,
      20
    )
    let wheelBody: CANNON.Body = new CANNON.Body({
      mass: 0
    })
    wheelBody.type = CANNON.Body.KINEMATIC
    wheelBody.collisionFilterGroup = 0 // turn off collisions
    let q: CANNON.Quaternion = new CANNON.Quaternion()
    q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2)
    wheelBody.addShape(cylinderShape, new CANNON.Vec3(), q)
    wheelBodies.push(wheelBody)
    world.addBody(wheelBody)
  }

  const fixedTimeStep: number = 1.0 / 60.0 // seconds
  const maxSubSteps: number = 3

  function updateSystem(dt: number) {
    // Instruct the world to perform a single step of simulation.
    // It is generally best to keep the time step and iterations fixed.
    world.step(fixedTimeStep, dt, maxSubSteps)

    // Position and rotate the boxes in the scene to match their cannon world counterparts
    for (let i = 0; i < boxes.length; i++) {
      let boxTransform = Transform.getMutable(boxes[i])
      boxTransform.position = boxBodies[i].position
      boxTransform.rotation = boxBodies[i].quaternion
    }

    for (let i = 0; i < vehicle.wheelInfos.length; i++) {
      vehicle.updateWheelTransform(i)
      let t: CANNON.Transform | undefined = vehicle.wheelInfos[i].worldTransform
      let wheelBody: CANNON.Body = wheelBodies[i]
      if (t) {
        wheelBody.position.copy(t.position)
        wheelBody.quaternion.copy(t.quaternion)
      }
      let wheelTransform = Transform.getMutable(wheels[i])
      wheelTransform.position = wheelBody.position
      wheelTransform.rotation = wheelBody.quaternion
    }

    // Modifying the wheels position and rotation needs to happen before the chassis
    let chassisTransform = Transform.getMutable(chassis)
    chassisTransform.position = chassisBody.position
    chassisTransform.rotation = chassisBody.quaternion
  }

  engine.addSystem(updateSystem)

  let forwardForce: number = 0.0
  let steerValue: number = 0.0
  const maxSteerValue: number = 0.5
  const maxSpeed: number = 300
  const brakeForce: number = 25

  function updateDriveSystem() {
    // Forward force
    vehicle.applyEngineForce(forwardForce, 2)
    vehicle.applyEngineForce(forwardForce, 3)

    // Steering
    vehicle.setSteeringValue(steerValue, 0)
    vehicle.setSteeringValue(steerValue, 1)

    // Braking
    // Press E and F Keys together
    if (isEKeyPressed && isFKeyPressed) {
      vehicle.setBrake(brakeForce, 0)
      vehicle.setBrake(brakeForce, 1)
      vehicle.setBrake(brakeForce, 2)
      vehicle.setBrake(brakeForce, 3)
    } else {
      vehicle.setBrake(0, 0)
      vehicle.setBrake(0, 1)
      vehicle.setBrake(0, 2)
      vehicle.setBrake(0, 3)
    }
  }
  engine.addSystem(updateDriveSystem)

  // Controls
  let isPointerPressed = false
  let isEKeyPressed = false
  let isFKeyPressed = false

  // Input system
  engine.addSystem(() => {
    const pointerDown = inputSystem.getInputCommand(InputAction.IA_POINTER, PointerEventType.PET_DOWN)
    if (pointerDown) {
      isPointerPressed = true
    }

    const pointerUp = inputSystem.getInputCommand(InputAction.IA_POINTER, PointerEventType.PET_UP)
    if (pointerUp) {
      isPointerPressed = false
    }

    const primaryDown = inputSystem.getInputCommand(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)
    if (primaryDown) {
      isEKeyPressed = true
    }

    const primaryUp = inputSystem.getInputCommand(InputAction.IA_PRIMARY, PointerEventType.PET_UP)
    if (primaryUp) {
      isEKeyPressed = false
    }

    const secondaryDown = inputSystem.getInputCommand(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN)
    if (secondaryDown) {
      isFKeyPressed = true
    }

    const secondaryUp = inputSystem.getInputCommand(InputAction.IA_SECONDARY, PointerEventType.PET_UP)
    if (secondaryUp) {
      isFKeyPressed = false
    }
  })

  function ButtonChecker(dt: number) {
    if (isPointerPressed) {
      // Accelerate
      if (forwardForce > -maxSpeed) forwardForce -= 300 * dt
      console.log(forwardForce)
    } else {
      // Decelerate
      if (forwardForce < 0) {
        forwardForce += 300 * dt
      } else {
        forwardForce = 0
      }
    }

    if (isEKeyPressed && steerValue > -maxSteerValue) {
      console.log(steerValue)
      steerValue -= 3 * dt
    }
    if (isFKeyPressed && steerValue < maxSteerValue) {
      steerValue += 3 * dt
    }
  }

  engine.addSystem(ButtonChecker)

  // UI with GitHub link
  setupUi()
}
