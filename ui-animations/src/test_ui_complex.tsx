import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs"
import { SpriteAnimation, UIAnimatedSprite } from "./ui_components/UIAnimatedSprite"
import { ParticleEmitter } from "./ui_components/UIParticle"
import { AnimatedButton, UIButton } from "./ui_components/UIButton"
import { Color4 } from "@dcl/sdk/math"
import { ProgressBar, UIProgressBar } from "./ui_components/UIProgressBar"
import { CustomCounter, UICounter } from "./ui_components/UICounter"
import { AnimatedContainer, UIAnimator } from "./ui_components/UIAnimation"
import * as utils from '@dcl-sdk/utils'
import { MoveScaleAction } from "./ui_components/transformActions"
import { Spinner, UISpinner } from "./ui_components/UISpinner"


export let coinSpriteDemo = new SpriteAnimation("images/particleSystem/coin-sprite.png", 4, 2, 20)
export let coinEmitterDemo = new ParticleEmitter()

export let progressDemo = new ProgressBar(
    "images/progressBar/bar_bg.png",
    "images/progressBar/bar_rounded.png",
    Color4.Green(),
    Color4.Red(),
    () => {
        progressDemo.setProgressBar(0)
        counterBarDemo.setNumber(0)
        counterDemo.increaseNumberBy(1)
    }
)
export let counterDemo = new CustomCounter(4, 4, 64, 'center', "images/customCounter/number_sheet.png")
export let counterBarDemo = new CustomCounter(4, 4, 32, 'center', "images/customCounter/number_sheet.png")

export let progressBounceAnimator = new UIAnimator(37, 90, 25, 5)
progressBounceAnimator.addAnimationSequence(
    'bounce',
    new utils.actions.SequenceBuilder()
        .then(new MoveScaleAction(progressBounceAnimator.entity, 36, 89.8, 27, 5.5, 0.07, utils.InterpolationType.EASEOUTQUAD))
        .then(new MoveScaleAction(progressBounceAnimator.entity, 37, 90, 25, 5, 0.25, utils.InterpolationType.EASEOUTQUAD))
)

export let spinnerDemo = new Spinner('images/loadingAnimation/spinner.png', 600)
export let animSpriteDemo = new SpriteAnimation("images/spriteAnimation/walk_anim_sprite.png", 4, 2, 20)
export let spinRaysDemo = new Spinner('images/loadingAnimation/rays.png', 10)


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
            <AnimatedContainer
                animator={progressBounceAnimator} >
                <UIProgressBar
                    progressBar={progressDemo}
                    uiTransform={{
                        width: '100%',
                        height: '100%',
                        minHeight: 32,
                        //positionType: 'absolute',
                        //position: { left: '37%', bottom: '90%' }
                    }}
                />
                <UICounter customCounter={counterBarDemo}
                    uiTransform={{
                        width: '100%',
                        height: '100%',
                        positionType: 'absolute',
                        position: { left: '0%', top: "0%" }
                    }}
                />
            </AnimatedContainer>

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

            <UIAnimatedSprite
                //walking man sprite anim
                spriteAnimator={animSpriteDemo}
                uiTransform={{
                    width: 120,
                    height: 240,
                    positionType: 'absolute',
                    position: { top: '50%', left: '50%' },
                    margin: { top: -240, left: -60 }
                }}
            />

            <UISpinner
                //spinning loading circle
                spinner={spinnerDemo}
                uiTransform={{
                    width: 128,
                    height: 128,
                    positionType: "absolute",
                    position: { top: '50%', left: '50%' },
                    margin: { left: -128 / 2, top: -128 / 2 }, // makes it centered around the cursor, by offsetting with half its dimensions
                }}
            />

            <UISpinner
                //spinning rays
                spinner={spinRaysDemo}
                uiBackground={{ color: Color4.fromHexString("#ffeebbff") }}
                uiTransform={{
                    width: 768,
                    height: 768,
                    positionType: "absolute",
                    position: { top: '50%', left: '50%' },
                    margin: { left: -768 / 2, top: -768 / 2 }, // makes it centered around the cursor, by offsetting with half its dimensions
                }}
            />

        </UiEntity>
    )
}