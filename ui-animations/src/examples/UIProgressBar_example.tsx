import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs"
import { ProgressBar, UIProgressBar } from "../ui_components/UIProgressBar";
import { Color4 } from "@dcl/sdk/math";

export let myProgressBar = new ProgressBar(
    "images/progressBar/bar_bg.png",
    "images/progressBar/bar_rounded.png",
    Color4.Green(),
    Color4.Red())

export function createProgressBarUI() {
    return (
        <UIProgressBar
            progressBar={myProgressBar}
            uiTransform={{
                width: '16%',
                height: 48,
                minHeight: 32,
                maxHeight: 128,
                positionType: 'absolute',
                position: { left: '82%', bottom: '22%' }
            }}
        />
    )
}


// system to step along each sprite in each row with the given frequency
export function ProgressBarTestSystem(dt: number) {
    if (myProgressBar.progressValue < 1) {
        myProgressBar.incrementProgressBar(dt * 0.25)
    }
    else {
        myProgressBar.setProgressBar(0)
    }
}