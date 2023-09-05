import { executeTask } from '@dcl/sdk/ecs'
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import * as ui from 'dcl-ui-toolkit'
import { uiBar } from './ui-entities/UiBar'

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(() => [
    ...ui.render(),
  ])
  
  executeTask(async function () {
      uiBar
    })
}