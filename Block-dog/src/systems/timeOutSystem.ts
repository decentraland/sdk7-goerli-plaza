import { CustomComponents } from '../components'

const callbackMap = new Map<Entity, () => void>()

export function onTimeUp(entity: Entity, callback: () => void) {
  callbackMap.set(entity, callback)
}

export function timerSystem(dt: number) {
  for (const [entity] of engine.getEntitiesWith(CustomComponents.TimeOut)) {
    const timer = CustomComponents.TimeOut.getMutable(entity)

    if (timer.paused) return

    timer.timeLeft = timer.timeLeft - dt

    // has finished
    timer.hasFinished = timer.timeLeft >= 0

    if (timer.hasFinished) {
      CustomComponents.TimeOut.deleteFrom(entity)
      const fn = callbackMap.get(entity)
      if (fn) fn()
    }
  }
}
