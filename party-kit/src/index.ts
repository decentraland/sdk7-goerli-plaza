import {} from '@dcl/sdk/math'
import { engine } from '@dcl/sdk/ecs'
import { CakeManager } from './modules/partyKit/cake/cake'
import { initPlayerState } from './playerState'


export function main() {
    // uncomment the line below to initialize UI from ui.tsx
    //setupUi()

    // your scene code here
    initPlayerState()
    CakeManager.getInstance().enable()
}

