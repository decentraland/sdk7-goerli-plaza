import { engine, MeshRenderer, inputSystem, InputAction, PointerEventType, Transform, Schemas, Entity } from "@dcl/sdk/ecs"
import { Color4, Vector3 } from "@dcl/sdk/math"
import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs"
import { UIPopup, UIPopupAnimation } from "./UIPopup"
import * as utils from '@dcl-sdk/utils'

export const HoverInfo = engine.defineComponent('HoverInfo', {
  title: Schemas.String,
  descLine1: Schemas.String,
  descLine2: Schemas.String,
  // link: Schemas.String,
  // image: Schemas.String,
  // darkMode: Schemas.Boolean,
})

export function hoverUISystem() {
  const hoverEntities = engine.getEntitiesWith(HoverInfo)
  for (const [entity] of hoverEntities) {
    if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_ENTER, entity)) {
      // Transform.getMutable(entity).scale = Vector3.create(1.5, 1.5, 1.5)
      console.log("HOVERING")
      displayUI(entity)
    }

    if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_HOVER_LEAVE, entity)) {
      // Transform.getMutable(entity).scale = Vector3.create(1, 1, 1)
      console.log("HIDING UI")
      hideUI()
    }
  }
}


export function displayUI(entity: Entity) {

  const hoverInfo = HoverInfo.get(entity)

  if (!hoverInfo) return

  HOVER_UI = <UIPopup
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
      uiText={{ value: hoverInfo.title, fontSize: 20, color: Color4.Black() }} />
  </UIPopup>





}


let HOVER_UI: any | null = null


export function DeclareHoverUI() {
  return HOVER_UI

}


export function hideUI() {
  HOVER_UI = null
}



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