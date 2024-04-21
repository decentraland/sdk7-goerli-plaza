import { createBaseScene } from './structures'
import { ElevatorModule } from './Elevator/elevator'
import { createAllDoors, fastDoorSound } from './doors'
import { initializeElevatorDoors } from './Elevator/elevatorDoors'
import { setupUi } from './UI/ui'
import { artHoverSystem, changeArtHoverSystem, createArtHovers } from './Art/artHover'
import { Transform, engine } from '@dcl/sdk/ecs'
import { creatAllLazyAreas } from './Lazy-Loading/lazyLoading'
import { createSocials } from './social'
import { createCustomTextPanels, createCustomTextTitles, createDefaultTexts } from './text'
import { audioConfig, createStream, radioStation, toggleAudio } from './Audio/audio'
import * as utils from '@dcl-sdk/utils';





export function main() {

    createBaseScene()
    ElevatorModule.createElevator
    initializeElevatorDoors()
    createAllDoors()
    creatAllLazyAreas()
    createArtHovers()
    createSocials()
    setupUi()
    engine.addSystem(changeArtHoverSystem)
    engine.addSystem(artHoverSystem)
    //createStream(radioStation)
toggleAudio('radio')


    //audioConfig['radio']
   //toggleAudio('radio')
    /*
    if (audioConfig['radio']) {
        toggleAudio('radio')
    } else if (audioConfig['playlist']) {
        toggleAudio('playlist')
    }
    */

    /// AUDIO
    // Use these functions to trigger the playlist (also toggle playlist and radio booleans in audio.ts and ui.tsx)
    //shufflePlaylist(playlist)
    //playCurrentSong()

    // Use this function to trigger the radio (also toggle playlist and radio booleans in audio.ts and ui.tsx)
    //playRadio()


    /// TEXT
    // Change the active function below to toggle between default and custom title texts
    createDefaultTexts()
    //createCustomTextTitles()

    // Customise in text.ts
    createCustomTextPanels()

}
