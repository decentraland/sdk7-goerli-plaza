import { ReactEcsRenderer } from "@dcl/sdk/react-ecs";
import { createSpriteAnimationUI } from "./examples/AnimatedSprite";
import { engine } from "@dcl/sdk/ecs";
import { SpriteAnimSystem } from "./ui_components/spriteComponent";
import { ColorChangeSystem } from "./ui_components/colorChangeComponent";
import { RotatorSystem } from "./ui_components/UISpinner";
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
    engine.addSystem(SpriteAnimSystem)
    engine.addSystem(ProgressBarTestSystem)
    engine.addSystem(ColorChangeSystem),
        engine.addSystem(RotatorSystem)
    engine.addSystem(CounterTestSystem)
}

const uiComponent = () => [

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

    //show labels for each example
    exampleLabelsUI()

    //customCounter.createCounterUI(),

]