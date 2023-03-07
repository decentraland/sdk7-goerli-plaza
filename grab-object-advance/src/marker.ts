import { Entity, engine, MeshRenderer, Transform, Material, InputAction, PointerEventType, inputSystem } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { BoxBody, JointBodyID, Marker, markerMaterial, markerPullMaterial } from './definitions'
import { addBody, addConstraint, getBoxBodyOrNull, getConstraintOrNull, removeConstraint } from './world'
import * as CANNON from 'cannon/build/cannon'

function getMarkerEntity(): Entity {
  const markers = Array.from(engine.getEntitiesWith(Marker))
  if (markers.length > 0) {
    return markers[0][0]
  }
  throw new Error('No marker found')
}

export function setupMarker() {
  const marker = engine.addEntity()
  MeshRenderer.setSphere(marker)
  Transform.create(marker, { scale: Vector3.Zero() })
  Material.setPbrMaterial(marker, markerMaterial)
  Marker.create(marker)

  // Joint body
  const shape = new CANNON.Sphere(0.1)
  const jointBody = new CANNON.Body({ mass: 0 })
  jointBody.addShape(shape)
  jointBody.collisionFilterGroup = 0
  jointBody.collisionFilterMask = 0
  jointBody.id = JointBodyID
  addBody(jointBody)
}

function addMouseConstraint(x: number, y: number, z: number, bodyId: number) {
  const constrainedBody = getBoxBodyOrNull(bodyId)
  if (!constrainedBody) return

  // Vector to the clicked point, relative to the body
  const v1 = new CANNON.Vec3(x, y, z).vsub(constrainedBody.position)

  // Apply anti-quaternion to vector to tranform it into the local body coordinate system
  const antiRot = constrainedBody.quaternion.inverse()
  const pivot = antiRot.vmult(v1) // pivot is not in local body coordinates

  // Move the cannon click marker particle to the click position
  const body = getBoxBodyOrNull(JointBodyID)
  if (!body) return

  body.position.set(x, y, z)

  // Create a new constraint
  // The pivot for the jointBody is zero
  const mouseConstraint = new CANNON.PointToPointConstraint(constrainedBody, pivot, body, new CANNON.Vec3(0, 0, 0))

  mouseConstraint.id = Marker.getMutable(getMarkerEntity()).mouseConstraintId++

  // Add the constriant to world
  addConstraint(mouseConstraint)
}

// This functions moves the transparent joint body to a new postion in space
function moveJointToPoint(x: number, y: number, z: number) {
  // Move the joint body to a new position
  getBoxBodyOrNull(JointBodyID)?.position.set(x, y, z)
  getConstraintOrNull(Marker.getMutable(getMarkerEntity()).mouseConstraintId)?.update()
}

function removeJointConstraint() {
  // Remove constraint from world
  const markerComponent = Marker.get(getMarkerEntity())
  const mouseConstraint = getConstraintOrNull(markerComponent.mouseConstraintId)
  console.log("MARKER REMOVED", markerComponent, mouseConstraint)
  if (mouseConstraint) removeConstraint(mouseConstraint)
}

export function _inputSystem() {
  const markerEntity = getMarkerEntity()
  const marker = Marker.get(markerEntity)
  const eventPointerDown = inputSystem.getInputCommand(InputAction.IA_POINTER, PointerEventType.PET_DOWN)

  if (eventPointerDown && !marker.isPointerPressed) {
    const marker = Marker.getMutable(markerEntity)
    marker.isPointerPressed = true

    // Only show marker when raycast hits an entity
    if (eventPointerDown.hit && eventPointerDown.hit.length !== 0 && eventPointerDown.hit.entityId) {
      const boxBody = BoxBody.getOrNull(eventPointerDown.hit.entityId as Entity)
      if (boxBody) {
        Transform.getMutable(markerEntity).scale = Vector3.create(0.1, 0.1, 0.1)
        marker.markerDistance = eventPointerDown.hit.length

        const position = eventPointerDown.hit?.position
        if (position) addMouseConstraint(position.x, position.y, position.z, boxBody.boxBodyId)
      }
    }
  }

  if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_UP) && marker.isPointerPressed) {
    const marker = Marker.getMutable(markerEntity)

    // Remove marker
    Transform.getMutable(markerEntity).scale = Vector3.Zero()

    marker.isPointerPressed = false
    marker.markerDistance = 0
    removeJointConstraint()
  }

  if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)) {
    Marker.getMutable(markerEntity).isEKeyPressed = true
    Material.setPbrMaterial(markerEntity, markerPullMaterial)
  }

  if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_UP)) {
    Marker.getMutable(markerEntity).isEKeyPressed = false
    Material.setPbrMaterial(markerEntity, markerMaterial)
  }
}

export function updateMarkerSystem(dt: number) {
  const marker = Marker.get(getMarkerEntity())
  // Grab the object
  if (marker.isPointerPressed && marker.markerDistance !== 0) {
    const marker = getMarkerEntity()
    const camera = Transform.get(engine.CameraEntity)
    const forwardVector = Vector3.rotate(
      Vector3.scale(Vector3.Forward(), Marker.getMutable(marker).markerDistance),
      camera.rotation
    )

    const forwardVectorTransformed = Vector3.add(camera.position, forwardVector)
    Transform.getMutable(marker).position = forwardVectorTransformed

    const position = Transform.get(marker).position
    moveJointToPoint(position.x, position.y, position.z)
  }

  // Pull in the object
  if (marker.isEKeyPressed && marker.markerDistance !== 0 && marker.markerDistance > 1) {
    Marker.getMutable(getMarkerEntity()).markerDistance -= 5 * dt
  }
}
