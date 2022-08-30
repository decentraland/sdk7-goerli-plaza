


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


const TimeOut = {
 
  timeLeft: Schemas.Float,
  hasFinished: Schemas.Boolean,
  paused: Schemas.Boolean
  
}





export const TimeOutComponent = engine.defineComponent(TimeOut, COMPONENT_ID)
