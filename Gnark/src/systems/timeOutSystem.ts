import { TimeOutComponent } from '../components/timeOut'
import { Interpolate } from '../helper/interpolation'


const callbackMap = new Map<Entity, () => void>()

export function onTimeUp(entity: Entity, callback: () => void) {
  callbackMap.set(entity, callback)
}

export function timerSystem(dt: number) {
  for (const [entity] of engine.getEntitiesWith(TimeOutComponent)) {

	const timer = TimeOutComponent.getMutable(entity)
	
	if(timer.paused) return

    timer.timeLeft = timer.timeLeft - dt

    // has finished
    timer.hasFinished = timer.timeLeft >= 0

    if (timer.hasFinished) {
		TimeOutComponent.deleteFrom(entity)
      const fn = callbackMap.get(entity)
      if (fn) fn()
     
    }
  }
}

