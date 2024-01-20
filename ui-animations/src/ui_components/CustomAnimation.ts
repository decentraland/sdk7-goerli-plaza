import { Callback } from "@dcl/sdk/react-ecs"
import { calculateBezier, onelerp } from "../utilities"
import { Schemas, engine } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"
import * as utils from '@dcl-sdk/utils'

export const TransformSchema = Schemas.Map({
    posX: Schemas.Number,   
    posY:  Schemas.Number,
    scaleX:  Schemas.Number,
    scaleY:  Schemas.Number, 		
})
export const Keyframe =Schemas.Map({
    transform: TransformSchema,
    animTime: Schemas.Number
})

export const CustomAnimation = engine.defineComponent('custom-animation-id', {    
    keyframes: Schemas.Array(Keyframe),
    currentTransform: TransformSchema,
    active: Schemas.Boolean,
    currentFrame: Schemas.Int,
    elapsedTime: Schemas.Number,
    interpolationType: Schemas.EnumString<utils.InterpolationType>(utils.InterpolationType, utils.InterpolationType.EASESINE)
})

export class TransformAnimator {   
    onFinish:Callback = ()=>{}

    constructor(_callback:Callback){       
        this.onFinish = _callback        
        engine.addSystem((dt:number)=>{
            let animatedGroup = engine.getEntitiesWith(CustomAnimation)

             for (const [entity, readOnlyInfo] of animatedGroup){ 
                
                if(readOnlyInfo.active){   
                    
                    const animInfo = CustomAnimation.getMutable(entity)

                    if(animInfo.currentFrame < animInfo.keyframes.length -3 ){                        
            
                        let keyframe = animInfo.keyframes[animInfo.currentFrame]
                        let inter1 = animInfo.keyframes[animInfo.currentFrame + 1]
                        let inter2 = animInfo.keyframes[animInfo.currentFrame + 2]
                        let endframe = animInfo.keyframes[animInfo.currentFrame + 3]
            
                        if(animInfo.elapsedTime < keyframe.animTime ){
                            animInfo.elapsedTime += dt
                            if(animInfo.elapsedTime > keyframe.animTime){
                                animInfo.elapsedTime = keyframe.animTime
                            }
                            let currentPos = calculateBezier(
                                Vector3.create(keyframe.transform.posX, keyframe.transform.posY,0),
                                Vector3.create(endframe.transform.posX, endframe.transform.posY,0),
                                Vector3.create(inter1.transform.posX, inter1.transform.posY,0),
                                Vector3.create(inter2.transform.posX, inter2.transform.posY,0),
                                animInfo.elapsedTime/keyframe.animTime
                                )
                            animInfo.currentTransform.posX = currentPos.x
                            animInfo.currentTransform.posY = currentPos.y

                            let currentScale= calculateBezier(
                                Vector3.create(keyframe.transform.scaleX, keyframe.transform.scaleY,0),
                                Vector3.create(endframe.transform.scaleX, endframe.transform.scaleY,0),
                                Vector3.create(inter1.transform.scaleX, inter1.transform.scaleY,0),
                                Vector3.create(inter2.transform.scaleX, inter2.transform.scaleY,0),
                                animInfo.elapsedTime/keyframe.animTime
                                )
                            animInfo.currentTransform.scaleX = currentScale.x
                            animInfo.currentTransform.scaleY = currentScale.y
                        
                        }
                        else{
                            animInfo.elapsedTime = 0
                            animInfo.currentFrame += 3
                            console.log("CURRENT FRAME: " + animInfo.currentFrame)
                        }
                    }
            
                    else{
                        animInfo.active = false
                        this.onFinish()
                    }
                }
            }
        })
    }
}




