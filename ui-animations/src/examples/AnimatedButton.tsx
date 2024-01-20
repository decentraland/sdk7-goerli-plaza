import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs"
import { AnimatedButton, UIButton } from "../ui_components/UIButton"
import { Color4 } from "@dcl/sdk/math"
import { coinEmitter } from "./ParticleSystem"



let buttonSuccess = new AnimatedButton(
    "Right Button",
    20,
    Color4.Black(),
    () => {
        buttonSuccess.successAnimation()
        //coinEmitter.spawnSingle(50,70,50,10)   
    }
)

let buttonError = new AnimatedButton(
    "Wrong Button",
    20,
    Color4.Red(),
    () => {
        buttonError.errorAnimation()
    }
)

export function createButtonUI() {
    return (
        <UiEntity uiTransform={{
            width: "100%",
            height: "100%",
            positionType: 'absolute'
        }}
        >
            <UIButton
                button={buttonSuccess}
                uiTransform={{
                    width: '10%',
                    height: 64,
                    positionType: 'absolute',
                    position: { left: '55%', top: '10%' }
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
                button={buttonError}
                uiTransform={{
                    width: "10%",
                    height: 64,
                    positionType: 'absolute',
                    position: { left: '55%', top: '18%' }
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
        </UiEntity>
    )
}     