import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs"
import { SpriteAnimation, UIAnimatedSprite } from "./ui_components/UIAnimatedSprite"
import { ParticleEmitter } from "./ui_components/UIParticle"
import { AnimatedButton, UIButton } from "./ui_components/UIButton"
import { Color4 } from "@dcl/sdk/math"
import { ProgressBar, UIProgressBar } from "./ui_components/UIProgressBar"
import { CustomCounter, UICounter } from "./ui_components/UICounter"

let coinSpriteDemo = new SpriteAnimation("images/particleSystem/coin-sprite.png", 4, 2, 20)
export let coinEmitterDemo = new ParticleEmitter()

export let progressDemo = new ProgressBar(
    "images/progressBar/bar_bg.png",
    "images/progressBar/bar_rounded.png",
    Color4.Green(),
    Color4.Red(),
    () => {
        progressDemo.setProgressBar(0)
        counterDemo.increaseNumberBy(1)
    }
)
export let counterDemo = new CustomCounter(4, 4, 64, 'center', "images/customCounter/number_sheet.png")





export function complexParticleUI() {
    return (
        <UiEntity
            //ROOT CONTAINER
            uiTransform={{
                width: '100%',
                height: '100%',
                positionType: 'absolute'
            }}
        >

            <UIProgressBar
                progressBar={progressDemo}
                uiTransform={{
                    width: '25%',
                    height: 64,
                    minHeight: 32,
                    maxHeight: 128,
                    positionType: 'absolute',
                    position: { left: '37%', bottom: '90%' }
                }}
            />
            <UICounter customCounter={counterDemo}
                uiTransform={{
                    width: '20%',
                    height: '10%',
                    positionType: 'absolute',
                    position: { left: '40%', top: "15%" }
                }}
            />


            <UiEntity
                // PARTICLES
                uiTransform={{
                    width: "100%",
                    height: "100%",
                    //  positionType: 'absolute'

                }}
            >
                {coinEmitterDemo.generateParticleUI(
                    <UIAnimatedSprite
                        spriteAnimator={coinSpriteDemo}
                        uiTransform={{
                            width: '100%',
                            height: '100%',
                            positionType: 'absolute'
                        }}
                    />
                )}
            </UiEntity>


        </UiEntity>
    )
}