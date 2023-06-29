import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { canvasInfo } from "./index";

const uiComponent = () => (
  <UiEntity
    uiTransform = {{
      width:'90%',
      height: '90%',
      margin: { top: '5%', left: '5%' }
    }}
    uiBackground={{ color: Color4.Red() }}
  >
    <UiEntity
      uiTransform = {{
        width: canvasInfo.width * 0.8,
        height: canvasInfo.height * 0.8,
        margin: { top: canvasInfo.height * 0.05, left: canvasInfo.width * 0.05 }
      }}
      uiBackground={{ color: Color4.Blue() }}
    />
  </UiEntity>
)

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}
