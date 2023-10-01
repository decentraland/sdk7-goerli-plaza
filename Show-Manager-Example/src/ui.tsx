import * as showMgmt from 'show-manager/dist'
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import * as ui from 'dcl-ui-toolkit'

const uiComponent = () => (
  [
    ui.render(),
    showMgmt.renderHUD()
  ]
)
export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}