import { ColliderLayer, GltfContainer, InputAction, PointerEventType, PointerEvents, Transform, engine, pointerEventsSystem } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { onSceneReadyObservable } from '@dcl/sdk/observables'
import CANNON from "cannon"
import { playpunchSound } from "./sound"

onSceneReadyObservable.add(() => {
  // Create base
  const base = engine.addEntity()
  // Create base shape
  Transform.create(base)
  // Set the mesh
  GltfContainer.create(base, {
    src: 'models/baseDarkWithCollider.glb',
  })

  // Punchbag
  const punchBag = engine.addEntity()
  Transform.create(punchBag, {
    position: Vector3.create(8, 0, 8),
    scale: Vector3.create(0.5, 0.5, 0.5),
  })
  GltfContainer.create(punchBag, {
    src: 'models/dogePunchBag.glb',
    invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
  })

  // User variables
  let forwardVector: Vector3 = Vector3.rotate(Vector3.Forward(), Transform.get(engine.CameraEntity).rotation) // Camera's forward vector
  let vectorScale: number = 20

  // Allow the user to interact with the punchbag
  pointerEventsSystem.onPointerDown(
    punchBag,
    (e) => {
      // Apply impulse based on camera's direction
      targetAnchorBody.applyImpulse(
        new CANNON.Vec3(forwardVector.x * vectorScale, forwardVector.y * vectorScale, forwardVector.z * vectorScale),
        new CANNON.Vec3(targetAnchorBody.position.x, targetAnchorBody.position.y, targetAnchorBody.position.z)
      )
      playpunchSound()
    },
    {
      button: InputAction.IA_ANY,
      showFeedback: true,
      hoverText: "punch",
    }
  )

  // Setup our world
  const world = new CANNON.World()
  world.gravity.set(0, 10, 0) // m/s²
  world.broadphase = new CANNON.NaiveBroadphase()

  // Create a ground plane and apply physics material
  const groundBody: CANNON.Body = new CANNON.Body({
    mass: 0, // Setting the mass == 0 makes the body static
  })
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2) // Reorient ground plane to be in the y-axis

  const physicsMaterial = new CANNON.Material("physicsMaterial")
  const physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial, physicsMaterial, { friction: 0, restitution: 0.1 })
  world.addContactMaterial(physicsContactMaterial)

  const groundShape: CANNON.Plane = new CANNON.Plane()
  groundBody.addShape(groundShape)
  groundBody.material = physicsMaterial
  world.addBody(groundBody)

  // Create a static body
  let fixedAnchorBody = new CANNON.Body({ mass: 0 })
  fixedAnchorBody.position.set(8, 0, 8)
  world.addBody(fixedAnchorBody)

  // Create target body
  let sphereShape = new CANNON.Sphere(0.2)
  let targetAnchorBody = new CANNON.Body({ mass: 5 })
  targetAnchorBody.addShape(sphereShape)
  targetAnchorBody.position.set(8, 3, 8)
  world.addBody(targetAnchorBody)

  targetAnchorBody.linearDamping = 0.4 // Round bodies will keep translating even with friction so you need linearDamping
  targetAnchorBody.angularDamping = 1.0 // Round bodies will keep rotating even with friction so you need angularDamping

  var spring = new CANNON.Spring({
    localAnchorA: new CANNON.Vec3(0, 0, 0),
    localAnchorB: new CANNON.Vec3(0, 0, 0),
    restLength: 0.0,
    stiffness: 50,
    damping: 8,
  })

  spring.bodyA = targetAnchorBody
  spring.bodyB = fixedAnchorBody

  // Compute the force after each step
  world.addEventListener("postStep", function () {
    spring.applyForce()
  })

  const fixedTimeStep: number = 1.0 / 60.0 // Seconds
  const maxSubSteps: number = 10

  function UpdateSystem(dt: number) {
    world.step(fixedTimeStep, dt, maxSubSteps)

    // https://answers.unity.com/questions/24805/preventing-lookat-from-flipping.html
    let transform = Transform.get(punchBag)
    let relativePos = targetAnchorBody.position.vsub(new CANNON.Vec3(transform.position.x, transform.position.y, transform.position.z))
    Transform.getMutable(punchBag).rotation = Quaternion.lookRotation(Vector3.create(relativePos.x, relativePos.y, relativePos.z), Vector3.Forward())

    // Update forward vector
    forwardVector = Vector3.rotate(Vector3.Forward(), Transform.get(engine.CameraEntity).rotation)
  }

  engine.addSystem(UpdateSystem)
})