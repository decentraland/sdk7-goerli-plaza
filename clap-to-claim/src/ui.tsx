import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import { createDispenserUi, initDispenserUi } from './modules/claiming/ui/dispenserUi'
import { createClapToClaimUi } from './modules/claiming/ui/clapToClaimUi'

export function setupUi() {
    initDispenserUi()
    ReactEcsRenderer.setUiRenderer(uiComponent)
}

const uiComponent = () => [
    createDispenserUi(),
    createClapToClaimUi(),
]
