import { createBaseScene } from './structures'
import { ElevatorModule } from './Elevator/elevator'
import { createAllDoors } from './doors'
import { initializeElevatorDoors } from './Elevator/elevatorDoors'
import { setupUi } from './UI/ui'
import { artHoverSystem, changeArtHoverSystem, createArtHovers } from './Art/artHover'
import { engine } from '@dcl/sdk/ecs'
import { creatAllLazyAreas } from './lazyLoading'
import { createSocials } from './social'
import { createCustomTextPanels, createCustomTextTitles, createDefaultTexts } from './text'
import { audioType, toggleAudio } from './audio'
import { initializeArtDetails } from './Art/artData'





export function main() {

    createBaseScene()
    toggleAudio(audioType)
    ElevatorModule.createElevator
    initializeElevatorDoors()
    createAllDoors()
    creatAllLazyAreas()
    createSocials()
    initializeArtDetails()
    createDefaultTexts()
    createCustomTextTitles()
    createCustomTextPanels()
    engine.addSystem(changeArtHoverSystem)
    engine.addSystem(artHoverSystem)
    createArtHovers()
    setupUi()
   


}
