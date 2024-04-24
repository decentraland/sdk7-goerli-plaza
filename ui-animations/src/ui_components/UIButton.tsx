import ReactEcs, { Callback, EntityPropTypes, PositionUnit, UiEntity } from "@dcl/sdk/react-ecs"
import { AnimatedContainer, UIAnimator } from "./UIAnimation"
import { Color4 } from "@dcl/sdk/math"
import { Entity } from "@dcl/sdk/ecs"
import * as utils from '@dcl-sdk/utils'
import { MoveScaleAction } from "./transformActions"


export type AnimatedButtonProps = EntityPropTypes & {
  children?: ReactEcs.JSX.Component[]
  button: AnimatedButton
}

export class AnimatedButton {
  animator: UIAnimator
  label: string
  fontSize: number
  textColor: Color4
  visible: boolean = false
  onClick: Callback

  constructor(label: string, fontSize: number, textColor: Color4, onClick: Callback) {
    this.animator = new UIAnimator(0, 0, 100, 100)
    this.label = label
    this.fontSize = fontSize
    this.textColor = textColor
    this.onClick = onClick

    this.animator.addAnimationSequence(
      "push",
      new utils.actions.SequenceBuilder()
        .then(new MoveScaleAction(this.animator, 2.5, -10, 95, 93, 50, utils.InterpolationType.EASESINE))
        .then(new MoveScaleAction(this.animator, 0, 0, 100, 100, 50, utils.InterpolationType.EASESINE))
    )


    this.animator.addAnimationSequence(
      "shake",
      new utils.actions.SequenceBuilder()
        .then(new MoveScaleAction(this.animator, 5, 0, 100, 100, 50, utils.InterpolationType.EASESINE))
        .then(new MoveScaleAction(this.animator, -5, 0, 100, 100, 50, utils.InterpolationType.EASESINE))
        .then(new MoveScaleAction(this.animator, 2, 0, 100, 100, 50, utils.InterpolationType.EASESINE))
        .then(new MoveScaleAction(this.animator, 0, 0, 100, 100, 50, utils.InterpolationType.EASESINE))
    )


  }

  successAnimation() {
    this.animator.playAnimation('push')
  }

  errorAnimation() {
    this.animator.playAnimation('shake')
  }

  show() {
    this.visible = true
  }
  hide() {
    this.visible = false
  }

  toggle() {
    this.visible = !this.visible
  }


}

export function UIButton(props: AnimatedButtonProps) {

  return <UiEntity uiTransform={props.uiTransform} >
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        positionType: 'absolute',
        display: props.button.visible ? 'flex' : 'none'
      }}>
      <AnimatedContainer animator={props.button.animator}>
        <UiEntity
          uiTransform={{
            width: '100%',
            height: '100%',
          }}

          uiBackground={props.uiBackground}
          uiText={{ value: props.button.label, textAlign: 'middle-center', fontSize: props.button.fontSize, color: props.button.textColor }}
          onMouseDown={() => {
            props.button.onClick()
          }}
        >
        </UiEntity>
      </AnimatedContainer>
    </UiEntity>
  </UiEntity>
}