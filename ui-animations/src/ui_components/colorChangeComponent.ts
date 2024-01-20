import { Schemas, engine } from "@dcl/sdk/ecs";
import * as utils from '@dcl-sdk/utils'
import { onelerp } from "../utilities";
import { Color4 } from "@dcl/sdk/math";


export const ColorChange = engine.defineComponent('color-change-id', {    
    // start-end % of screen horizontal axis starting from left
   startColor: Schemas.Color4,
   endColor: Schemas.Color4, 
   
   currentColor: Schemas.Color4,  
  
   animFactor: Schemas.Number,
   animSpeed: Schemas.Number,
   
   factor: Schemas.Number,
   interpolationType: Schemas.EnumString<utils.InterpolationType>(utils.InterpolationType, utils.InterpolationType.EASESINE)
   
  })

  export function ColorChangeSystem(dt: number){  

    const colorGroup = engine.getEntitiesWith(ColorChange)    

    for (const [entity] of colorGroup) {  
        const info = ColorChange.getMutable(entity)

        if(info.factor  < 1){
            info.factor += dt * info.animSpeed
          if(info.factor > 1 ){
            info.factor = 1      
          }    
          info.animFactor = utils.interpolate(info.interpolationType, info.factor)               
          info.currentColor = Color4.lerp(info.startColor, info.endColor, info.animFactor ) 
         
        }     
    }
  
}