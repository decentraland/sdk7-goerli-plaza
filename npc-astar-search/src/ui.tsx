import ReactEcs, { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import *  as  ui from 'dcl-ui-toolkit'
import { NpcUtilsUi } from 'dcl-npc-toolkit'

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

const uiComponent = () => [
  <NpcUtilsUi />,
  ui.render(),
]