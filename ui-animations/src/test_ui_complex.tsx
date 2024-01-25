import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs"
import { SpriteAnimation, UIAnimatedSprite } from "./ui_components/UIAnimatedSprite"
import { ParticleEmitter } from "./ui_components/UIParticle"
import { AnimatedButton, UIButton } from "./ui_components/UIButton"
import { Color4 } from "@dcl/sdk/math"

let coinSprite = new SpriteAnimation("images/particleSystem/coin-sprite.png", 4, 2, 20)
export let coinParticleEmitter = new ParticleEmitter()


export function complexParticleUI() {
    return (
        <UiEntity
            uiTransform={{
                width: "100%",
                height: "100%",
                //  positionType: 'absolute'

            }}
        >
            {coinParticleEmitter.generateParticleUI(
                <UIAnimatedSprite
                    spriteAnimator={coinSprite}
                    uiTransform={{
                        width: '100%',
                        height: '100%',
                        positionType: 'absolute'
                    }}
                />
            )}
        </UiEntity>
    )
}