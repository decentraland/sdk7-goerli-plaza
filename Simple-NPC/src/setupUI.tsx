import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { NpcUtilsUi } from 'dcl-npc-toolkit'

const SceneOwnedUi = () => [
  // other UI elements
  NpcUtilsUi(),
  // other UI elements
]

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(SceneOwnedUi)
}
