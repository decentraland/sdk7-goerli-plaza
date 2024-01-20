import { Schemas, engine } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils'
import { onelerp } from "../utilities";


export const Particle = engine.defineComponent('particle-id', {})
// export class Tween {
//   // start-end % of screen horizontal axis starting from left
//   startPosX: number
//   endPosX: number
//   startScaleX: number
//   endScaleX: number
 
//  // start-end % of screen vertical axis starting from top
//   startPosY: number
//   endPosY: number
//   startScaleY: number
//   endScaleY: number
  
//   animatedPosX: number
//   animatedPosY: number
//   animatedScaleX: number
//   animatedScaleY: number
 
//   animFactor: number = 0
//   animSpeed: number = 1
  
//   factor: number = 0
//   interpolationType: utils.InterpolationType = utils.InterpolationType.EASESINE

// }

export const MoveScale = engine.defineComponent('move-scale-id', {    
    // start-end % of screen horizontal axis starting from left
   startPosX: Schemas.Number,
   endPosX: Schemas.Number,
   startScaleX: Schemas.Number,
   endScaleX: Schemas.Number,
  
  // start-end % of screen vertical axis starting from top
   startPosY: Schemas.Number,
   endPosY: Schemas.Number,
   startScaleY: Schemas.Number,
   endScaleY: Schemas.Number,
   
   animatedPosX: Schemas.Number,
   animatedPosY: Schemas.Number,
   animatedScaleX: Schemas.Number,
   animatedScaleY: Schemas.Number,
  
   animFactor: Schemas.Number,
   animSpeed: Schemas.Number,
   
   factor: Schemas.Number,
   interpolationType: Schemas.EnumString<utils.InterpolationType>(utils.InterpolationType, utils.InterpolationType.EASESINE)
   
  })

  export function MoveAroundSystem(dt: number){  

    const moveGroup = engine.getEntitiesWith(MoveScale)

    for (const [entity] of moveGroup) {  
        const info = MoveScale.getMutable(entity)

        if(info.factor  < 1){
            info.factor += dt * info.animSpeed
          if(info.factor > 1 ){
            info.factor = 1      
          }    
          info.animFactor = utils.interpolate(info.interpolationType, info.factor)     
          
          info.animatedPosX = ( onelerp(info.startPosX, info.endPosX, info.animFactor )) 
          info.animatedPosY = ( onelerp(info.startPosY, info.endPosY, info.animFactor ))     
          info.animatedScaleX = ( onelerp(info.startScaleX, info.endScaleX, info.animFactor ) )     
          info.animatedScaleY = ( onelerp(info.startScaleY, info.endScaleY, info.animFactor ) )            
           
         
        } 
    }
}