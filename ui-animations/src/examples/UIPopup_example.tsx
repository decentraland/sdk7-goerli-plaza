import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs"
import { UIPopup, UIPopupAnimation } from "../ui_components/UIPopup"
import * as utils from '@dcl-sdk/utils'
import { Color4 } from "@dcl/sdk/math"

let popupAnimator = new UIPopupAnimation(
  {
    startPosX: 70,
    startPosY: 83,
    startScaleX: 10,
    startScaleY: 7,
    endPosX: 66,
    endPosY: 40,
    endScaleX: 18,
    endScaleY: 50,
    duration: 200
  },
  () => {
    popupAnimator.toggle()
  },
  utils.InterpolationType.EASEOUTEBOUNCE
)


export function createEasingPopupUI() {
  return (
    <UIPopup
      popupAnim={popupAnimator}
      uiBackground={{
        color: Color4.create(1.0, 1.0, 1.0, 0.8),
        textureMode: 'nine-slices',
        texture: { src: 'images/easingPopup/stone_ui_bg.png' },
        textureSlices: {
          top: 0.42,
          bottom: 0.52,
          left: 0.42,
          right: 0.48
        }
      }}
    >

      <UiEntity
        uiTransform={{
          width: '80%',
          height: '10%',
          positionType: 'absolute',
          position: { top: '50%', left: '10%' }
        }}
        uiText={{ value: "PANEL TEST CONTENT", fontSize: 20, color: Color4.Black() }} />
    </UIPopup>
  )
}