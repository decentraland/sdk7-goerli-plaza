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
                width: 100,
                height: 100,
                positionType: 'absolute',
                position: { top: '10%', left: '15%' }
            }}
        />
    )
}