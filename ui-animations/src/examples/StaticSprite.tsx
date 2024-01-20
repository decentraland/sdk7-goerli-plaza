import { UISprite } from "../ui_components/UISprite"
import ReactEcs from "@dcl/sdk/react-ecs"

export function createSingleSpriteUI() {
    return (   
        <UISprite 
            texture='images/cardFlip/card-atlas.png' 
            top={1} 
            bottom={0} 
            left={0} 
            right={0.5}
            uiTransform={{
                width: 200,
                height: 200,  
                positionType:'absolute',
                position : {top: 100, left: 300}  
            }}
        />
    )
}