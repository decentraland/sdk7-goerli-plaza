import ReactEcs, { ReactEcsRenderer, UiEntity } from "@dcl/sdk/react-ecs"
import { UIPopup, UIPopupAnimation } from "../../uiAnim/UIPopup"
import { Color4 } from "@dcl/sdk/math"
import { scaleFactor, UiScaleSystem } from './uiScaleSystem'

let clapClaimUiVisible: boolean = false

export let clapToastAnimator = new UIPopupAnimation( 
    {
      startPosX: 42,
      startPosY: 100,
      startScaleX: 16,
      startScaleY: 10,
      endPosX: 42,
      endPosY: 92,
      endScaleX: 16,
      endScaleY: 10,
    },
    0.2,
      ()=>{
      hideClapToast()
  })

  export function showClapToast(){
   
    clapToastAnimator.show()
  }

  export function hideClapToast(){
   
    clapToastAnimator.hide()
  }

  export function createClapToClaimUi() {    
    return(
        <UiEntity uiTransform={{
            width: '100%',
            height: '100%',
            positionType:'absolute'
        }
          
        } >
            
            <UIPopup 
                  popupAnim={clapToastAnimator}                
              >     
             <UiEntity
              uiTransform={{
                  width: 480 * scaleFactor * 0.75,
                  height: 80 * scaleFactor * 0.75,
                  positionType:'absolute', 
                  position: {top: '0%', left: '0%'}
              }} 
              uiBackground={{
                textureMode: 'stretch',
                texture: {
                  src: "images/claim/toast_orange.png",
                  wrapMode: 'clamp',
                  filterMode: 'tri-linear'
                }}}
              />
  
  
              </UIPopup>
      </UiEntity>
    )
  }
