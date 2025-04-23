import {} from '@dcl/sdk/math'
import { engine } from '@dcl/sdk/ecs'
import { setupUi } from './ui'
import { initDispensers } from './modules/dispenser/dispensers'
import { setupEnvironment } from './environment'

export function main() {
    setupUi()
    setupEnvironment()
    initDispensers()
}
