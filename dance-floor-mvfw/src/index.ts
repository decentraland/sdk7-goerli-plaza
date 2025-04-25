
import { engine, InputAction, inputSystem, PointerEventType } from '@dcl/sdk/ecs'
import { DiscoManager } from './modules/grid-floor/discoManager'
import { setupUI } from './ui'

export function main() {

    DiscoManager.getInstance().startDisco()
    setupUI()
    //debug controls
    engine.addSystem(()=>{
        if (
            inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)
        ) {
        
            DiscoManager.getInstance().startDisco()

        }

        if (inputSystem.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN)) {        
         
            DiscoManager.getInstance().stopDisco()
          
        } 
   })
}