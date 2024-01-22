import { ReactEcsRenderer } from "@dcl/sdk/react-ecs";
import { createSpriteAnimationUI } from "./examples/AnimatedSprite";
import { engine } from "@dcl/sdk/ecs";
import { createCardFlipUI } from "./examples/CardFlip";
import { createSingleSpriteUI } from "./examples/StaticSprite";
import { createSpinnerAnimationUI } from "./examples/Spinner";
import { CounterTestSystem, createCustomCounterUI } from "./examples/CustomCounter";
import { createButtonUI } from "./examples/AnimatedButton";
import { createEasingPopupUI } from "./examples/AnimatedPopup";
import { createParticleTestButton, createParticleUI } from "./examples/ParticleSystem";
import { ProgressBarTestSystem, createProgressBarUI } from "./examples/ProgressBar";
import { exampleLabelsUI } from "./examples/exampleLabeling";


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