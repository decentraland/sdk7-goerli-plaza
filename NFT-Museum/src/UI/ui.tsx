import *  as  ui from 'dcl-ui-toolkit'
import { setupUiInfoEngine } from '../helperFunctions';
import { artDetailsUI } from './artHover.ui';
import { playlistUI } from './playlist.ui';
import { radioUI } from './radio.ui';
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs';
import { confirmationUI } from './reward.ui';
import { rewardImage, rewardName } from '../Rewards/rewards';



export const pauseIcon = 'images/pauseIcon.png';
export const playIcon = 'images/playIcon.png';
export const skipIcon = 'images/skipIcon.png'




export function setupUi() {
    setupUiInfoEngine(),
        ReactEcsRenderer.setUiRenderer(uiComponent)
}

export const uiComponent = () => [
    ui.render(),
   // confirmationUI(rewardImage, rewardName),
    artDetailsUI(),
    playlistUI(),
    radioUI(),
]






