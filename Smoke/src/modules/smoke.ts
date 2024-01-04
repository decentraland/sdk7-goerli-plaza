import { engine, Transform, MeshRenderer } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { SmokeParticle } from '../definitions'

const GROWTH_FACTOR = 0.2
const SPEED = 0.7

// Function to check if smoke is too far from source
function isOutOfBounds(position: Vector3) {
  if (position.y > 6 || position.x > 2 || position.z > 2 || position.x < -2 || position.z < -2) {
    return true
  }
  return false
}

export default function smokeSystem(dt: number) {
  for (const [entity, smoke] of engine.getEntitiesWith(SmokeParticle, Transform)) {
    if (smoke.visible) {
      const transform = Transform.getMutable(entity)
      const smokeMut = SmokeParticle.getMutable(entity)

      transform.position = Vector3.add(transform.position, Vector3.create(0, dt * SPEED, 0))
      transform.scale = Vector3.scale(transform.scale, 1 + GROWTH_FACTOR * dt)

      if (isOutOfBounds(transform.position)) {
        if (MeshRenderer.getOrNull(entity)) {
          MeshRenderer.deleteFrom(entity)
          smokeMut.visible = false
        }
      }
    }
  }
}
