import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs"
import { CardFlipAnimation, UICardFlip } from "../ui_components/UICardFlip"
import { UISprite } from "../ui_components/UISprite"


export let cardFlipAnim = new CardFlipAnimation()

export function createCardFlipUI() {

    return (
        <UICardFlip
            cardFlipAnimator={cardFlipAnim}
            uiTransform={{
                width: 180,
                height: 240,
                positionType: 'absolute',
                position: { top: '10%', left: '85%' }
            }}
            sideA={
                <UISprite texture='images/cardFlip/card-atlas.png'
                    top={1} bottom={0} left={0} right={0.5}
                    uiTransform={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            }
            sideB={
                <UISprite texture='images/cardFlip/card-atlas.png'
                    top={1} bottom={0} left={0.5} right={1}
                    uiTransform={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            }
        >
        </UICardFlip>

    )
}