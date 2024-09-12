import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import *  as  ui from 'dcl-ui-toolkit'
import { NpcUtilsUi } from 'dcl-npc-toolkit'

function SceneOwnedUi() {
  return (
    <UiEntity>
      <NpcUtilsUi />
    </UiEntity>
  )
}

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

const uiComponent = () => [
  ui.render(),
  SceneOwnedUi()
]