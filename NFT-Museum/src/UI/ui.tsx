import *  as  ui from 'dcl-ui-toolkit'
import { setupUiInfoEngine } from '../helperFunctions';
import { artDetailsUI } from './artHover.ui';
import { playlistUI } from './playlist.ui';
import { radioUI } from './radio.ui';
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs';
import { Color4 } from '@dcl/sdk/math';



export const pauseIcon = 'assets/scene/Images/pauseIcon.png';
export const playIcon = 'assets/scene/Images/playIcon.png';
export const backgroundUI = 'assets/scene/Images/audio-bg.png'
export const linkIcon = 'assets/scene/Images/link.png'
export const mainFont = 'sans-serif'
export const audioFontSize = 15;
export const highlightColor = Color4.Red()
export const mainColor = Color4.Black()



// export function setupUi() {
//     setupUiInfoEngine(),
//         ReactEcsRenderer.setUiRenderer(uiComponent)
// }


// export const uiComponent = () => [
//     artDetailsUI(),
//     ui.render(),
//     playlistUI(),
//     radioUI(),
// ]






