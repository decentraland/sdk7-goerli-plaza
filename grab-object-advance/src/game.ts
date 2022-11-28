// /*
//   IMPORTANT: The tsconfig.json has been configured to include "node_modules/cannon/build/cannon.js"
//   Code is adapted from: https://github.com/schteppe/cannon.js/blob/master/examples/threejs_mousepick.html
// */

// // Base scene
const base = engine.addEntity()
GltfContainer.create(base, { src: 'models/baseLight.glb' })
Transform.create(base, { scale: Vector3.create(2, 2, 2) })

// Marker
const markerMaterial: PBMaterial_PbrMaterial = {
  albedoColor: Color3.create(5, 2.5, 1)
}

const markerPullMaterial: PBMaterial_PbrMaterial = {
  albedoColor: Color3.create(5, 1, 3.5)
}

const marker = engine.addEntity()
MeshRenderer.setSphere(marker)
Transform.create(marker, { scale: Vector3.Zero() })
Material.setPbrMaterial(marker, markerMaterial)

// // Setup our CANNON world
const world = new CANNON.World()
world.quatNormalizeSkip = 0
world.quatNormalizeFast = false

world.gravity.set(0, -9.82, 0) // m/s²
world.broadphase = new CANNON.NaiveBroadphase()

const BoxBody = engine.defineComponent(
  {
    boxBodyId: Schemas.Number
  },
  2022
)

let boxBodyCounter = 0
function createBoxBody(position: Vector3) {
  const entity = engine.addEntity()
  const bb = BoxBody.create(entity, { boxBodyId: boxBodyCounter++ })
  Transform.create(entity, { position })

  // // Box
  Material.setPbrMaterial(entity, { albedoColor: Color3.Red() })
  GltfContainer.create(entity, { src: 'models/crate.glb' })
  // Create box body
  const boxShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
  const boxBody = new CANNON.Body({ mass: 5 })
  boxBody.addShape(boxShape)
  boxBody.id = bb.boxBodyId
  boxBody.position.set(position.x, position.y, position.z)
  boxBody.linearDamping = 0.4 // Round will keep translating even with friction so you need linearDamping
  boxBody.angularDamping = 0.4 // Round bodies will keep rotating even with friction so you need angularDamping
  world.addBody(boxBody) // Add body to the world
}

createBoxBody(Vector3.create(2, 5, 4))
createBoxBody(Vector3.create(2.3, 3.5, 4))

// // Create a ground plane
const planeShape = new CANNON.Plane()
const groundBody = new CANNON.Body({
  mass: 0 // mass == 0 makes the body static
})
groundBody.addShape(planeShape)
groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2) // Reorient ground plane to be in the y-axis
groundBody.position.y = 0.1 // Thickness of ground base model
world.addBody(groundBody)

// Invisible walls
//#region
const wallShape = new CANNON.Box(new CANNON.Vec3(32, 50, 1))
const wallNorth = new CANNON.Body({
  mass: 0,
  shape: wallShape,
  position: new CANNON.Vec3(16, 25, 32)
})
world.addBody(wallNorth)

const wallSouth = new CANNON.Body({
  mass: 0,
  shape: wallShape,
  position: new CANNON.Vec3(16, 25, 0)
})
world.addBody(wallSouth)

const wallEast = new CANNON.Body({
  mass: 0,
  shape: wallShape,
  position: new CANNON.Vec3(0, 25, 16)
})
wallEast.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
world.addBody(wallEast)

const wallWest = new CANNON.Body({
  mass: 0,
  shape: wallShape,
  position: new CANNON.Vec3(32, 25, 16)
})
wallWest.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
world.addBody(wallWest)
//#endregion

// Joint body
const shape = new CANNON.Sphere(0.1)
const jointBody = new CANNON.Body({ mass: 0 })
jointBody.addShape(shape)
jointBody.collisionFilterGroup = 0
jointBody.collisionFilterMask = 0
world.addBody(jointBody)

let mouseConstraint: CANNON.PointToPointConstraint
let constrainedBody: CANNON.Body

function addMouseConstraint(x: number, y: number, z: number, body: CANNON.Body) {
  // The cannon body constrained by the mouse joint
  constrainedBody = body

  // Vector to the clicked point, relative to the body
  const v1 = new CANNON.Vec3(x, y, z).vsub(constrainedBody.position)

  // Apply anti-quaternion to vector to tranform it into the local body coordinate system
  const antiRot = constrainedBody.quaternion.inverse()
  const pivot = antiRot.vmult(v1) // pivot is not in local body coordinates

  // Move the cannon click marker particle to the click position
  jointBody.position.set(x, y, z)

  // Create a new constraint
  // The pivot for the jointBody is zero
  mouseConstraint = new CANNON.PointToPointConstraint(constrainedBody, pivot, jointBody, new CANNON.Vec3(0, 0, 0))

  // Add the constriant to world
  world.addConstraint(mouseConstraint)
}

// This functions moves the transparent joint body to a new postion in space
function moveJointToPoint(x: number, y: number, z: number) {
  // Move the joint body to a new position
  jointBody.position.set(x, y, z)
  mouseConstraint.update()
}

function removeJointConstraint() {
  // Remove constraint from world
  world.removeConstraint(mouseConstraint)
}

function updatePhysicsSystem(dt: number) {
  world.step(dt)

  for (const [entity, body] of engine.getEntitiesWith(BoxBody)) {
    const boxBody = world.bodies.find((item) => item.id === body.boxBodyId)

    if (boxBody) {
      const tranform = Transform.getMutable(entity)
      tranform.position = Vector3.create(boxBody.position.x, boxBody.position.y, boxBody.position.z)
      tranform.rotation = Quaternion.create(
        boxBody.quaternion.x,
        boxBody.quaternion.y,
        boxBody.quaternion.z,
        boxBody.quaternion.w
      )
    }
  }
}

engine.addSystem(updatePhysicsSystem)

// // Controls
let isPointerPressed = false
let isEKeyPressed = false
let markerDistance = 0

function inputSystem() {
  if (Input.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN) && !isPointerPressed) {
    const e = Input.getInputCommand(InputAction.IA_POINTER, PointerEventType.PET_DOWN)
    isPointerPressed = true

    // Only show marker when raycast hits an entity
    if (e?.hit && e.hit.length !== 0 && e.hit.entityId) {
      const boxBody = BoxBody.getOrNull(e.hit.entityId as Entity)
      if (boxBody) {
        Transform.getMutable(marker).scale = Vector3.create(0.1, 0.1, 0.1)
        markerDistance = e.hit.length

        const cannonBoxBody = world.bodies.find((item) => item.id === boxBody?.boxBodyId)!
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        const position = e?.hit?.position!
        addMouseConstraint(position.x, position.y, position.z, cannonBoxBody)
      }
    }
  }

  if (Input.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_UP) && isPointerPressed) {
    isPointerPressed = false

    // Remove marker
    Transform.getMutable(marker).scale = Vector3.Zero()

    markerDistance = 0
    removeJointConstraint()
  }

  if (Input.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)) {
    isEKeyPressed = true
    Material.setPbrMaterial(marker, markerPullMaterial)
  }
  if (Input.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_UP)) {
    isEKeyPressed = false
    Material.setPbrMaterial(marker, markerMaterial)
  }
}

function updateMarkerSystem(dt: number) {
  // Grab the object
  if (isPointerPressed && markerDistance !== 0) {
    const camera = Transform.get(engine.CameraEntity)
    const forwardVector = Vector3.rotate(Vector3.scale(Vector3.Forward(), markerDistance), camera.rotation)

    const forwardVectorTransformed = Vector3.add(camera.position, forwardVector)
    Transform.getMutable(marker).position = forwardVectorTransformed

    const position = Transform.get(marker).position
    moveJointToPoint(position.x, position.y, position.z)
  }

  // Pull in the object
  if (isEKeyPressed && markerDistance !== 0 && markerDistance > 1) {
    markerDistance -= 5 * dt
  }
}

engine.addSystem(updateMarkerSystem)
engine.addSystem(inputSystem)
