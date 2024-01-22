import { ReactEcsRenderer } from "@dcl/sdk/react-ecs";
import { createSpriteAnimationUI } from "./examples/UIAnimatedSprite_example";
import { engine } from "@dcl/sdk/ecs";
import { createCardFlipUI } from "./examples/UICardFlip_example";
import { createSingleSpriteUI } from "./examples/UISprite_example";
import { createSpinnerAnimationUI } from "./examples/UISpinner_example";
import { CounterTestSystem, createCustomCounterUI } from "./examples/UICounter_example";
import { createButtonUI } from "./examples/UIButton_example";
import { createEasingPopupUI } from "./examples/UIPopup_example";
import { createParticleTestButton, createParticleUI } from "./examples/UIParticle_example";
import { ProgressBarTestSystem, createProgressBarUI } from "./examples/UIProgressBar_example";
import { exampleLabelsUI } from "./exampleLabeling";


export function setupUi() {
    ReactEcsRenderer.setUiRenderer(uiComponent)

    // add these  systems only for testing the functionality of the examples 
    engine.addSystem(ProgressBarTestSystem)
    engine.addSystem(CounterTestSystem)
}

const uiComponent = () => [



    //show labels for each example
    exampleLabelsUI(),

    // add the UI of each example file to the UI rendering engine
    createProgressBarUI(),
    createSingleSpriteUI(),
    createSpriteAnimationUI(),
    createEasingPopupUI(),
    createParticleUI(),
    createSpinnerAnimationUI(),
    createCardFlipUI(),
    createCustomCounterUI(),
    createButtonUI(),
    createParticleTestButton(),

]