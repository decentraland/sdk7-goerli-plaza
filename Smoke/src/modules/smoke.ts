import { engine, Transform, MeshRenderer } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { SmokeParticle } from '../definitions'

// Function to check if smoke is too far from source
function isOutOfBounds(position: Vector3) {
  if (position.y > 4 || position.x > 1.5 || position.z > 1.5 || position.x < -1.5 || position.z < -1.5) {
    return true
  }
  return false
}

export default function smokeSystem(dt: number) {
  for (const [entity, smoke] of engine.getEntitiesWith(SmokeParticle, Transform)) {
    if (!smoke.visible) {
      const transform = Transform.getMutable(entity)
      const smokeMut = SmokeParticle.getMutable(entity)

      transform.position = Vector3.add(transform.position, Vector3.create(dt, dt, dt))
      transform.scale = Vector3.scale(transform.scale, 1 + 1.34 * dt)

      if (isOutOfBounds(transform.position)) {
        if (MeshRenderer.getOrNull(entity)) {
          MeshRenderer.deleteFrom(entity)
          smokeMut.visible = false
        }
      }
    }
  }
}
