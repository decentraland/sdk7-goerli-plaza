


// // Rotate component
// @Component('timeOut')
// export class TimeOut {
//   timeLeft: number
//   onWait?: () => void
//   constructor(time: number, onWait?: () => void) {
//     this.timeLeft = time
//     this.onWait = onWait
//   }
// }


const COMPONENT_ID = 2048


const TimeOut = MapType({
 
  timeLeft: Float32,
  hasFinished: EcsBoolean,
  paused: EcsBoolean
  
})





export const TimeOutComponent = engine.defineComponent(COMPONENT_ID, TimeOut)
