import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import { createDispenserUi, initDispenserUi } from './modules/claiming/ui/dispenserUi'
import { createClapToClaimUi } from './modules/claiming/ui/clapToClaimUi'
import { createShowDebugUi } from './modules/claiming/ui/showDebugUi'

export function setupUi() {
    initDispenserUi()
    ReactEcsRenderer.setUiRenderer(uiComponent)
}
const uiComponent = () => [
    createDispenserUi(),
    createClapToClaimUi(),
    
    createShowDebugUi()
]
