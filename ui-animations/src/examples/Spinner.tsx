import ReactEcs from "@dcl/sdk/react-ecs"
import { UISpinner, Spinner } from "../ui_components/UISpinner"

let spinner = new Spinner('images/loadingAnimation/loader_static.png', 600)

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

spinner.show()  