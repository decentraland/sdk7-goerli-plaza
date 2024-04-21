import *  as  ui from 'dcl-ui-toolkit'
import { setupUiInfoEngine } from '../helperFunctions';
import { artDetailsUI } from './artHover.ui';
import { playlistUI } from './playlist.ui';
import { radioUI } from './radio.ui';
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs';



export const pauseIcon = 'images/pauseIcon.png';
export const playIcon = 'images/playIcon.png';
export const skipIcon = 'images/skipIcon.png'


export function setupUi() {
    setupUiInfoEngine(),
        ReactEcsRenderer.setUiRenderer(uiComponent)
}


export const uiComponent = () => [
    artDetailsUI(),
    ui.render(),
    playlistUI(),
    radioUI(),
]






