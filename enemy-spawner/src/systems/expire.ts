import { engine } from '@dcl/sdk/ecs'
import { Expire } from '../components/customComponents'

export function expire(dt: number) {
  for (const [entity] of engine.getEntitiesWith(Expire)) {
    const expire = Expire.getMutable(entity)

    expire.timeLeft -= dt
    if (expire.timeLeft < 0) {
      engine.removeEntityWithChildren(entity)
    }
  }
}
