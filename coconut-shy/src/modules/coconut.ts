import { ColliderLayer, GltfContainer, Transform, engine } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"
import { playRandomHitSound } from "./sound"
import CANNON from "cannon"

export function createCoconut(position: Vector3, cannonMaterial: CANNON.Material, cannonWorld: CANNON.World) {
  const coconut = engine.addEntity()
  let body: CANNON.Body
  let world = cannonWorld

  Transform.create(coconut, {
    position: position
  })
  GltfContainer.create(coconut, {
    src: 'models/coconut.glb',
    invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
  })

  // Create physics body for coconut
  body = new CANNON.Body({
    mass: 1, // kg
    position: new CANNON.Vec3(position.x, position.y, position.z), // m
    shape: new CANNON.Sphere(0.15), // Create sphere shaped body with a diameter of 0.3m
  })

  // Add material and dampening to stop the coconut rotating and moving continuously
  body.sleep()
  body.material = cannonMaterial
  body.linearDamping = 0.4
  body.angularDamping = 0.4
  world.addBody(body) // Add coconut body to the world

  // Coconut collision
  body.addEventListener("collide", (e: any) => {
    // Only play sound when impact is high enough
    let relativeVelocity = e.contact.getImpactVelocityAlongNormal()
    if (Math.abs(relativeVelocity) > 0.75) {
      playRandomHitSound()
    }
  })

  return {coconut, body}
}

