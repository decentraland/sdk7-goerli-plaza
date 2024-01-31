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
import { CardFlipAnimation, UICardFlip } from "./ui_components/UICardFlip"
import { UISprite } from "./ui_components/UISprite"
import { UIPopup, UIPopupAnimation } from "./ui_components/UIPopup"
import { ScreenFade, UIScreenFade } from "./ui_components/UIScreenFade"


///SPINNERS

export let spinnerDemo = new Spinner('images/loadingAnimation/spinner.png', 600)
export let spinRaysDemo = new Spinner('images/loadingAnimation/rays.png', 10)

///////////

export let coinSpriteDemo = new SpriteAnimation("images/particleSystem/coin-sprite.png", 4, 2, 20)
export let coinEmitterDemo = new ParticleEmitter()

export let progressDemo = new ProgressBar(
    "images/progressBar/bar_bg.png",
    "images/progressBar/bar_rounded.png",
    Color4.Green(),
    Color4.Red(),
    () => {
        progressDemo.setProgressBar(0)
        //counterBarDemo.setNumber(0)
        counterDemo.increaseNumberBy(1)
    }
)

export let progressRewardDemo = new ProgressBar(
    "images/progressBar/bar_bg.png",
    "images/progressBar/bar_rounded.png",
    Color4.Green(),
    Color4.Red(),
    () => {
        progressRewardDemo.setProgressBar(0)
        counterBarDemo.setNumber(0)
        counterDemo.increaseNumberBy(1)
        popupRewardDemo.show()
        spinRaysRewardDemo.show()
        cardFlipRewardDemo.show()
    }
)
export let counterDemo = new CustomCounter(4, 4, 100, 'center', "images/customCounter/number_sheet.png")
export let counterBarDemo = new CustomCounter(4, 4, 40, 'center', "images/customCounter/number_sheet.png")

export let progressBounceAnimator = new UIAnimator(37, 85, 25, 5)
progressBounceAnimator.addAnimationSequence(
    'bounce',
    new utils.actions.SequenceBuilder()
        .then(new MoveScaleAction(progressBounceAnimator, 36, 84.8, 27, 5.5, 40, utils.InterpolationType.EASEOUTQUAD))
        .then(new MoveScaleAction(progressBounceAnimator, 37, 85, 25, 5, 250, utils.InterpolationType.EASEOUTQUAD))
)

export let animSpriteDemo = new SpriteAnimation("images/spriteAnimation/walk_anim_sprite.png", 4, 2, 10)
export let cardFlipAnimDemo = new CardFlipAnimation(400)

export let blackFadeActive: boolean = true

export let buttonSuccessDemo = new AnimatedButton(
    "Right Button",
    22,
    Color4.Black(),
    () => {
        buttonSuccessDemo.successAnimation()
        //coinEmitter.spawnSingle(50,70,50,10)   
    }
)

export let buttonErrorDemo = new AnimatedButton(
    "Wrong Button",
    22,
    Color4.Red(),
    () => {
        buttonErrorDemo.errorAnimation()
    }
)

export let popupAnimatorDemo = new UIPopupAnimation(
    {
        startPosX: 50,
        startPosY: 50,
        startScaleX: 0,
        startScaleY: 0,
        endPosX: 30,
        endPosY: 60,
        endScaleX: 40,
        endScaleY: 30,
        duration: 300
    },
    () => {
        popupAnimatorDemo.toggle()
    },
    utils.InterpolationType.EASEOUTQUAD
)


export let spinRaysRewardDemo = new Spinner('images/loadingAnimation/rays.png', 10)
export let cardFlipRewardDemo = new CardFlipAnimation(400)
export let popupRewardDemo = new UIPopupAnimation(
    {
        startPosX: 50,
        startPosY: 50,
        startScaleX: 0,
        startScaleY: 0,
        endPosX: 40,
        endPosY: 40,
        endScaleX: 20,
        endScaleY: 35,
        duration: 400
    },
    () => {
        //popupRewardDemo.toggle()
    },
    utils.InterpolationType.EASEOUTQUAD,
    true
)

export let popupInstructionDemo = new UIPopupAnimation(
    {
        startPosX: 40,
        startPosY: -10,
        startScaleX: 20,
        startScaleY: 1,
        endPosX: 40,
        endPosY: 8,
        endScaleX: 20,
        endScaleY: 7,
        duration: 400
    },
    () => {
        popupInstructionDemo.toggle()
    },
    utils.InterpolationType.EASEOUTEXPO,
    true
)

export let screenFade = new ScreenFade(Color4.fromHexString("#222222bb"))

export function blackFadeUI() {

    return (
        <UIScreenFade
            fadeObject={screenFade}>
        </UIScreenFade>

    )
}

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
                //BASIC PROGRESS BAR EXAMPLE
                progressBar={progressDemo}
                uiTransform={{
                    width: '25%',
                    height: '5%',
                    positionType: 'absolute',
                    minHeight: 32,
                    //positionType: 'absolute',
                    position: { left: '37%', bottom: '85%' }
                }}
            />
            <AnimatedContainer
                // BOUNCE SCALING CONTAINER FOR THE COMPLEXPROGRESS BAR
                animator={progressBounceAnimator} >
                <UIProgressBar
                    //COMPLEX PROGRESS BAR
                    progressBar={progressRewardDemo}
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
                // CUSTOM COUNTER
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
                    width: 240,
                    height: 480,
                    positionType: 'absolute',
                    position: { top: '50%', left: '50%' },
                    margin: { top: -500, left: -120 }
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

            <UICardFlip
                // CARD FLIP SINGE EXAMPLE
                cardFlipAnimator={cardFlipAnimDemo}
                uiTransform={{
                    width: 180,
                    height: 240,
                    positionType: 'absolute',
                    position: { top: '50%', left: '50%' },
                    margin: { top: -280, left: -90 }
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

            <UIButton
                //SUCCESS BUTTON
                button={buttonSuccessDemo}
                uiTransform={{
                    width: '8%',
                    height: 64,
                    positionType: 'absolute',
                    position: { left: '40%', top: '32%' }
                }}
                uiBackground={{
                    textureMode: 'nine-slices',
                    texture: { src: 'images/easingPopup/stone_ui_bg.png' },
                    textureSlices: {
                        top: 0.42,
                        bottom: 0.52,
                        left: 0.42,
                        right: 0.48
                    }
                }}
            />
            <UIButton
                // ERROR ANIMATION BUTTON
                button={buttonErrorDemo}
                uiTransform={{
                    width: "8%",
                    height: 64,
                    positionType: 'absolute',
                    position: { left: '50%', top: '32%' }
                }}
                uiBackground={{
                    textureMode: 'nine-slices',
                    texture: { src: 'images/easingPopup/stone_ui_bg.png' },
                    textureSlices: {
                        top: 0.42,
                        bottom: 0.52,
                        left: 0.42,
                        right: 0.48
                    }
                }}
            />
            <UIPopup
                //SEPARATE POPUP EXAMPLE
                popupAnim={popupAnimatorDemo}
                uiBackground={{
                    color: Color4.create(1.0, 1.0, 1.0, 0.8),
                    textureMode: 'nine-slices',
                    texture: { src: 'images/easingPopup/stone_ui_bg.png' },
                    textureSlices: {
                        top: 0.42,
                        bottom: 0.52,
                        left: 0.42,
                        right: 0.48
                    }
                }}
            >

                <UiEntity
                    uiTransform={{
                        width: '80%',
                        height: '10%',
                        positionType: 'absolute',
                        position: { top: '50%', left: '10%' }
                    }}
                    uiText={{ value: "PANEL TEST CONTENT", fontSize: 20, color: Color4.Black() }} />
            </UIPopup>

            <UIPopup
                //REWARD POPUP (FOR COMPLEX EXAMPLE)
                popupAnim={popupRewardDemo}
                uiBackground={{
                    color: Color4.create(1.0, 1.0, 1.0, 0.8),
                    textureMode: 'nine-slices',
                    texture: { src: 'images/easingPopup/dark_ui_bg.png' },
                    textureSlices: {
                        top: 0.42,
                        bottom: 0.52,
                        left: 0.42,
                        right: 0.48
                    }
                }}
            >

                <UISpinner
                    //spinning rays
                    spinner={spinRaysRewardDemo}
                    uiBackground={{ color: Color4.fromHexString("#ffeebbff") }}
                    uiTransform={{
                        width: '160%',
                        height: '160%',
                        positionType: "absolute",
                        position: { top: '-30%', left: '-30%' }


                    }}
                />
                <UiEntity
                    //LEVELUP TEXT
                    uiTransform={{
                        width: '80%',
                        height: '20%',
                        positionType: 'absolute',
                        position: { top: '2%', left: '10%' }
                    }}
                    uiBackground={{
                        textureMode: 'stretch',
                        texture: { src: 'images/cardFlip/levelup.png' },

                    }}
                />
                <UICardFlip
                    // CARD FLIP REWARD COMPLEX
                    cardFlipAnimator={cardFlipRewardDemo}
                    uiTransform={{
                        width: '30%',
                        height: '50%',
                        positionType: 'absolute',
                        position: { top: '25%', left: '35%' },
                        //margin: { top: -100, left: -90 }
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



            </UIPopup>

            <UIPopup
                // press F instruction panel at bottom
                popupAnim={popupInstructionDemo}
                uiBackground={{
                    color: Color4.create(1.0, 1.0, 1.0, 0.8),
                    textureMode: 'nine-slices',
                    texture: { src: 'images/progressBar/bar_bg.png' },
                    textureSlices: {
                        top: 0.42,
                        bottom: 0.52,
                        left: 0.42,
                        right: 0.48
                    }
                }}
            >

                <UiEntity
                    uiTransform={{
                        width: '80%',
                        height: '10%',
                        positionType: 'absolute',
                        position: { top: '40%', left: '10%' },

                    }}
                    uiText={{ value: "Press 'F' to hide", fontSize: 28, color: Color4.White() }} />
            </UIPopup>
        </UiEntity>


    )
}