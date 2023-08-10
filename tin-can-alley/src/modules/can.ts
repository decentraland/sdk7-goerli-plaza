import { ColliderLayer, GltfContainer, PointerEventType, PointerEvents, Transform, engine } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import CANNON from 'cannon'
import { playRandomHitSound, playshotTinSound } from './sound'

export const IMPULSE_MULTIPLIER = 1

export function createCan(position: Vector3, cannonMaterial: CANNON.Material, cannonWorld: CANNON.World) {
  const can = engine.addEntity()
  let body: CANNON.Body
  let world = cannonWorld

  Transform.create(can, {
    position: position
  })
  GltfContainer.create(can, {
    src: 'models/can.glb',
    invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
  })

  PointerEvents.create(can, {
    pointerEvents: [
      {
        eventType: PointerEventType.PET_DOWN,
        eventInfo: {
          showFeedback: false,
          maxDistance: 30
        }
      }
    ]
  })

  // Create physics body for can
  body = new CANNON.Body({
    mass: 2, // kg
    position: new CANNON.Vec3(position.x, position.y, position.z), // m
    shape: new CANNON.Cylinder(0.115, 0.115, 0.286, 28) // Create cylinder shaped body with a diameter of 0.23m
  })
  body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
  // Add material and dampening to stop the coconut rotating and moving continuously
  body.sleep()
  body.sleepSpeedLimit = 1 // Falls asleep when velocity falls below this threshold
  body.material = cannonMaterial
  body.linearDamping = 0.4
  body.angularDamping = 0.4
  world.addBody(body) // Add coconut body to the world

  // Can collision
  body.addEventListener('collide', (e: any) => {
    // Only play sound when impact is high enough
    let relativeVelocity = e.contact.getImpactVelocityAlongNormal()
    if (Math.abs(relativeVelocity) > 0.75) {
      playRandomHitSound()
    }
  })

  return { can, body }
}

export function hit(body: CANNON.Body, forwardVector: Vector3, hitPoint: Vector3): void {
  body.wakeUp()
  playshotTinSound()
  body.applyImpulse(
    new CANNON.Vec3(
      forwardVector.x * IMPULSE_MULTIPLIER,
      forwardVector.y * IMPULSE_MULTIPLIER,
      forwardVector.z * IMPULSE_MULTIPLIER
    ),
    new CANNON.Vec3(hitPoint.x, hitPoint.y, hitPoint.z)
  )
}
