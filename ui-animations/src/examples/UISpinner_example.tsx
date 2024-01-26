import ReactEcs from "@dcl/sdk/react-ecs"
import { UISpinner, Spinner } from "../ui_components/UISpinner"
import { Color4 } from "@dcl/sdk/math"

export let spinner = new Spinner('images/loadingAnimation/spinner.png', 600)

export function createSpinnerAnimationUI() {
    return (
        <UISpinner
            spinner={spinner}
            uiTransform={{
                width: 128,
                height: 128,
                positionType: "absolute",
                position: { top: '15%', left: '34%' },
                margin: { left: -128 / 2, top: -128 / 2 }, // makes it centered around the cursor, by offsetting with half its dimensions
            }}
        />
    )
}

//spinner.show()

export let spinRays = new Spinner('images/loadingAnimation/rays.png', 10)

export function createSpinnerRaysUI() {
    return (
        <UISpinner
            spinner={spinRays}
            uiBackground={{ color: Color4.fromHexString("#ffeebbff") }}
            uiTransform={{
                width: 512,
                height: 512,
                positionType: "absolute",
                position: { top: '50%', left: '50%' },
                margin: { left: -512 / 2, top: -512 / 2 }, // makes it centered around the cursor, by offsetting with half its dimensions
            }}
        />
    )
}

//spinRays.show()  