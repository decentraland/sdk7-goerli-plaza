import { BoxBody } from './definitions'
import * as CANNON from 'cannon/build/cannon'
import { engine, GltfContainer, InputAction, Material, PointerEvents, PointerEventType, Transform } from '@dcl/sdk/ecs'
import { Vector3, Color4, Quaternion } from '@dcl/sdk/math'

let world: CANNON.World

export function setupCannon() {
  // // Setup our CANNON world
  world = new CANNON.World()
  world.quatNormalizeSkip = 0
  world.quatNormalizeFast = false

  world.gravity.set(0, -9.82, 0) // m/s²
  world.broadphase = new CANNON.NaiveBroadphase()

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
}

let boxBodyCounter = 1e3
export function createBoxBody(position: Vector3) {
  const entity = engine.addEntity()
  const bb = BoxBody.create(entity, { boxBodyId: boxBodyCounter++ })
  Transform.create(entity, { position })

  // // Box
  Material.setPbrMaterial(entity, { albedoColor: Color4.Red() })
  GltfContainer.create(entity, { src: 'models/crate.glb' })
  PointerEvents.create(entity, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          button: InputAction.IA_POINTER
        }
      }
    ]
  })

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

export function updatePhysicsSystem(dt: number) {
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

export function addBody(body: CANNON.Body) {
  world.addBody(body)
}

export function addConstraint(constraint: CANNON.Constraint) {
  world.addConstraint(constraint)
}

export function removeConstraint(constraint: CANNON.Constraint) {
  world.removeConstraint(constraint)
}

export function getBoxBodyOrNull(id: number) {
  return world.bodies.find((item) => item.id === id)
}

export function getConstraintOrNull(id: number) {
  return world.constraints.find((item) => item.id === id)
}
