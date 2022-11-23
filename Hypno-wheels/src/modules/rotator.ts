import { WheelSpin } from '../definitions'

export default function rotatorSystem(dt: number) {
  for (const [entity, readonlySpin] of engine.getEntitiesWith(WheelSpin, Transform)) {
    // check state
    if (readonlySpin.active) {
      const spin = WheelSpin.getMutable(entity)
      const transform = Transform.getMutable(entity)

      // spin the wheel
      transform.rotation = Quaternion.multiply(
        transform.rotation,
        Quaternion.fromAngleAxis(spin.speed * dt, spin.direction)
      )

      spin.speed -= 6 * dt
      if (spin.speed <= 0) {
        spin.speed = 0
        spin.active = false
      }
    }
  }
}
