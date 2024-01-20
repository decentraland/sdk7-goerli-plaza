import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs"
import { ProgressBar, UIProgressBar } from "../ui_components/UIProgressBar";
import { Color4 } from "@dcl/sdk/math";

export let myProgressBar = new ProgressBar(Color4.Green(), Color4.Red())

export function createProgressBarUI() {
    return (
        <UIProgressBar
            progressBar={myProgressBar}
            uiTransform={{
                width: '20%',
                height: '15%',
                minHeight: '5%',
                maxHeight: 128,
                alignItems: 'center',
                alignSelf: 'center',
                positionType: 'absolute',
                position: { left: '80%', bottom: '13%' },
                display: 'flex'
            }}
        />
    )
}

let progress = 0

// system to step along each sprite in each row with the given frequency
export function ProgressBarTestSystem(dt: number) {

    if (progress < 1) {
        progress += dt * 0.25
    }
    else {
        progress = 0
    }

    myProgressBar.setProgressBar(progress)

}