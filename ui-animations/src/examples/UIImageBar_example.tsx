import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs"
import { ProgressBar, UIProgressBar, UIImageBar } from "../ui_components/UIProgressBar";
import { Color4 } from "@dcl/sdk/math";





export let myHealthBar = new ProgressBar(
    "images/progressBar/image_avatar_bg.png",
    "images/progressBar/image_avatar_scaling.png",
    Color4.Red(),
    Color4.Green(),
    false
    // () => { },
    // "images/progressBar/image_bar_fg.png"
)

export let myManaBar = new ProgressBar(
    "images/progressBar/image_bar_bg.png",
    "images/progressBar/image_bar_scaling.png",
    Color4.Blue(),
    Color4.Blue(),
    true,
    () => { },
    "images/progressBar/image_bar_fg.png")

export function createImageBarUI() {
    return (
        <UiEntity uiTransform={{
            width: '100%',
            height: '100%',
            positionType: 'absolute'
        }}>
            <UIImageBar
                progressBar={myHealthBar}
                uiTransform={{
                    width: 512,
                    height: 512,
                    positionType: 'absolute',
                    position: { left: '60%', bottom: '15%' }
                }}
            />
            <UIImageBar
                progressBar={myManaBar}
                uiTransform={{
                    width: 512,
                    height: 512,
                    positionType: 'absolute',
                    position: { left: '15%', bottom: '15%' }
                }}
            />
        </UiEntity>

    )
}

myHealthBar.show()
myHealthBar.setProgressBar(1)

myManaBar.show()
myManaBar.setProgressBar(1)

// system to step along each sprite in each row with the given frequency
export function ImageBarTestSystem(dt: number) {
    if (myHealthBar.progressValue < 1) {
        myHealthBar.incrementProgressBar(dt * 0.25)
    }
    else {
        myHealthBar.setProgressBar(0)
    }

    if (myManaBar.progressValue < 1) {
        myManaBar.incrementProgressBar(dt * 0.15)
    }
    else {
        myManaBar.setProgressBar(0)
    }

}