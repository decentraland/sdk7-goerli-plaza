// import { TimeOutComponent } from '../components/timeOut'
// import { Interpolate } from '../helper/interpolation'


// const callbackMap = new Map<Entity, () => void>()

// export function onTimeUp(entity: Entity, callback: () => void) {
//   callbackMap.set(entity, callback)
// }

// export function timerSystem(dt: number) {
//   for (const [entity] of engine.getEntitiesWith(TimeOutComponent)) {

// 	const timer = TimeOutComponent.getMutable(entity)
	
// 	if(timer.paused) return

//     timer.timeLeft = timer.timeLeft - dt

//     if (timer.timeLeft <= 0 && !timer.hasFinished) {
// 		timer.hasFinished = true
// 	// 	TimeOutComponent.deleteFrom(entity)
//     //   const fn = callbackMap.get(entity)
//     //   if (fn) fn()
     
//     }
//   }
// }

