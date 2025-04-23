import { engine, Schemas } from "@dcl/sdk/ecs";
import { activeUiType, ClaimingUiType } from "./dispenserUi";

export const SpinnerComponent = engine.defineComponent('spinner-id', {  
    angle: Schemas.Number,
    speed: Schemas.Number       
})

export function RotatorSystem(dt:number){

    if(activeUiType !== ClaimingUiType.WAITING) return

    const spinnerGroup = engine.getEntitiesWith(SpinnerComponent)
  
    for(const [entity] of spinnerGroup){
  
        const spinnerInfo = SpinnerComponent.getMutable(entity)

        spinnerInfo.angle -= dt * spinnerInfo.speed
        if ( spinnerInfo.angle  < 0) spinnerInfo.angle +=  360
    }
}

export function rotateUVs(angle:number):number[]{

    let UV00 = rotate2D(angle, 0,0,  0.5,0.5)
    let UV01 = rotate2D(angle, 0,1,  0.5,0.5)
    let UV11 = rotate2D(angle, 1,1,  0.5,0.5)
    let UV10 = rotate2D(angle, 1,0,  0.5,0.5)

    return [
        UV00[0], UV00[1],
        UV01[0], UV01[1],
        UV11[0], UV11[1],
        UV10[0], UV10[1],      
      ]
}

function rotate2D (angle:number, x:number, y:number, centerX:number, centerY:number):[number, number] {
    angle = angle % 360
    // if (angle > 180)
    // angle -= 360;
    let A = angle * Math.PI / 180
    let CosA = Math.cos(A)
    let SinA = Math.sin(A)
    let cx = centerX
    let cy = centerY
    let X = x - cx
    let Y = y - cy
    let NX = X * CosA - Y * SinA
    let NY = Y * CosA + X * SinA
    x = (NX + cx)
    y = (NY + cy)

    return [x, y]
}