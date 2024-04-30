import { Transform, engine } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

import { SpinComponent } from './components/definitions'

export function spinSystem(dt: number) {
  // iterate over all entiities with a WheelSpinComponent
  for (const [entity] of engine.getEntitiesWith(SpinComponent)) {
    const transform = Transform.getMutable(entity)
    // update the rotation value accordingly

    transform.rotation = Quaternion.multiply(
      transform.rotation,
      Quaternion.fromAngleAxis(
        dt * 100 * SpinComponent.get(entity).clockwise,
        Vector3.Up()
      )
    )
  }
}
