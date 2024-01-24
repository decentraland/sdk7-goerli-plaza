import { Color4, Vector3 } from '@dcl/sdk/math'
import ReactEcs, { Callback, EntityPropTypes, PositionUnit, UiEntity, } from '@dcl/sdk/react-ecs'
import * as utils from '@dcl-sdk/utils'
import { CallbackAction, MoveScaleAction } from './transformActions'
import { AnimatedContainer, UIAnimator, AnimProps } from './UIAnimation'


export type StartEndTransform = {
  startPosX: number
  startPosY: number
  startScaleX: number
  startScaleY: number
  endPosX: number
  endPosY: number
  endScaleX: number
  endScaleY: number
  duration: number
}

export class UIPopupAnimation {
  animator: UIAnimator
  transform: StartEndTransform
  isOpen: boolean = false
  isContentVisible: boolean = false
  showContentWhileScaling: boolean = false
  interpolationType: utils.InterpolationType = utils.InterpolationType.EASEOUTQUAD
  onClick: Callback

  constructor(startEndTransform: StartEndTransform, onClick: Callback, interpolationType?: utils.InterpolationType, showContentWhileScaling?: boolean) {

    this.transform = startEndTransform


    if (interpolationType) {
      this.interpolationType = interpolationType
    }

    if (showContentWhileScaling) {
      this.showContentWhileScaling = showContentWhileScaling
    }
    this.animator = new UIAnimator(this.transform.startPosX, this.transform.startPosY, this.transform.startScaleX, this.transform.startScaleY)
    this.onClick = onClick

    this.animator.addAnimationSequence(
      "scale-up",
      new utils.actions.SequenceBuilder()
        .then(new MoveScaleAction(this.animator.entity, this.transform.endPosX, this.transform.endPosY, this.transform.endScaleX, this.transform.endScaleY, this.transform.duration, utils.InterpolationType.EASEOUTEBOUNCE))
    )

    this.animator.addAnimationSequence(
      "open",
      new utils.actions.SequenceBuilder()
        //.then(new MoveScaleAction(this.animator.entity, this.transform.endPosX, this.transform.endPosY, this.transform.endScaleX, this.transform.startScaleY,  0.2,  utils.InterpolationType.EASEOUTQUAD))
        .then(new MoveScaleAction(this.animator.entity, this.transform.endPosX, this.transform.endPosY, this.transform.endScaleX, this.transform.endScaleY, this.transform.duration, this.interpolationType))
        .then(new CallbackAction(() => { this.isContentVisible = true }))
    )

    this.animator.addAnimationSequence(
      "close",
      new utils.actions.SequenceBuilder()
        .then(new CallbackAction(() => { this.isContentVisible = false }))
        //.then(new MoveScaleAction(this.animator.entity, this.transform.endPosX, this.transform.endPosY, this.transform.endScaleX, this.transform.startScaleY,  0.2,  utils.InterpolationType.EASEOUTQUAD))
        .then(new MoveScaleAction(this.animator.entity, this.transform.startPosX, this.transform.startPosY, this.transform.startScaleX, this.transform.startScaleY, 0.3, this.interpolationType))
    )

    this.animator.addAnimationSequence(
      "shake",
      new utils.actions.SequenceBuilder()
        .then(new MoveScaleAction(this.animator.entity, 80, 10, 20, 70, 0.05, utils.InterpolationType.EASESINE))
        .then(new MoveScaleAction(this.animator.entity, 77, 10, 20, 70, 0.05, utils.InterpolationType.EASESINE))
        .then(new MoveScaleAction(this.animator.entity, 80, 10, 20, 70, 0.05, utils.InterpolationType.EASESINE))
        .then(new MoveScaleAction(this.animator.entity, 77, 10, 20, 70, 0.05, utils.InterpolationType.EASESINE))
    )
  }

  toggle() {
    if (this.isOpen) {
      this.hide()
    }
    else {
      this.show()
    }
  }

  show() {
    this.animator.playAnimation('open')
    this.isOpen = true
  }

  hide() {
    this.animator.playAnimation('close')
    this.isOpen = false
  }
}

export type AnimatedPopupProps = EntityPropTypes & {
  children?: ReactEcs.JSX.Component[]
  popupAnim: UIPopupAnimation

}



export function UIPopup(props: AnimatedPopupProps) {
  return (
    <AnimatedContainer animator={props.popupAnim.animator}>
      <UiEntity
        uiTransform={{
          width: '100%',
          height: '100%',
        }}

        uiBackground={props.uiBackground}
        onMouseDown={() => {
          props.popupAnim.onClick()
        }}
      >
        <UiEntity uiTransform={{
          width: '100%',
          height: '100%',
          positionType: 'absolute',
          display: props.popupAnim.isContentVisible ? 'flex' : 'none'
        }}
        >
          {props.children}
        </UiEntity>
      </UiEntity>
    </AnimatedContainer>
  )
}







