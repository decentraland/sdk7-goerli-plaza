import { createBaseScene } from './structures'
import { ElevatorModule } from './Elevator/elevator'
import { createAllDoors } from './doors'
import { initializeElevatorDoors } from './Elevator/elevatorDoors'
import { setupUi } from './UI/ui'
import { artHoverSystem, changeArtHoverSystem, createArtHovers } from './Art/artHover'
import { engine } from '@dcl/sdk/ecs'
import { creatAllLazyAreas } from './Lazy-Loading/lazyLoading'
import { createSocials } from './social'
import { createCustomTextPanels, createDefaultTexts } from './text'
import { toggleAudio } from './Audio/audio'
import * as utils from '@dcl-sdk/utils';
import { initializeArtDetails } from './Art/artData'





export function main() {

    createBaseScene()
    ElevatorModule.createElevator
    initializeElevatorDoors()
    createAllDoors()
    creatAllLazyAreas()
    createSocials()
    setupUi()
    engine.addSystem(changeArtHoverSystem)
    engine.addSystem(artHoverSystem)
    toggleAudio('playlist')
    initializeArtDetails()
    
    
    
    /// TEXT
    
    // Change the active function below to toggle between default and custom title texts
    createDefaultTexts()
    //createCustomTextTitles()
    
    // Customise in text.ts
    createCustomTextPanels()

    utils.timers.setTimeout(() => {
        createArtHovers()
    }, 5000)

}
