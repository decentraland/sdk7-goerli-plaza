import { engine, Transform, Schemas, Animator } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { DoorState } from './components'

/**
 * Handle door states
 */
export function doorSystem(dt: number) {
  const doorEntities = engine.getEntitiesWith(DoorState, Animator)
  for (const [entity, _doorState] of doorEntities) {
    if (_doorState.dirty) {
      DoorState.getMutable(entity).dirty = false
      const animator = Animator.getMutable(entity)

      if (_doorState.open) {
        Animator.playSingleAnimation(entity, 'Open')
      } else {
        Animator.playSingleAnimation(entity, 'Close')
      }
    }
  }
}
