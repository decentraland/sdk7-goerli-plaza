import ReactEcs, { EntityPropTypes, UiEntity } from '@dcl/sdk/react-ecs'
import { AnimatedContainer, UIAnimator } from './UIAnimation'
import * as utils from '@dcl-sdk/utils'
import { MoveScaleAction, CallbackAction } from './transformActions'
import { UISprite } from './UISprite'


export class CardFlipAnimation {
  animator: UIAnimator
  cardOtherSideVisible: boolean = false
  duration: number = 100
  visible: boolean = false

  constructor(_duration?: number) {

    if (_duration) {
      this.duration = _duration
    }
    this.animator = new UIAnimator(0, 0, 100, 100)
    this.animator.addAnimationSequence(
      "flip",
      new utils.actions.SequenceBuilder()
        .then(new MoveScaleAction(this.animator, 50, 20, 0, 110, this.duration / 2, utils.InterpolationType.EASEINQUAD))
        .then(new CallbackAction(() => { this.cardOtherSideVisible = !this.cardOtherSideVisible }))
        .then(new MoveScaleAction(this.animator, 0, 0, 100, 100, this.duration / 2, utils.InterpolationType.EASEOUTQUAD))
    )
  }

  playAnimation(animationName: string) {
    this.animator.playAnimation(animationName)
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

export type CardFlipProps = EntityPropTypes & {
  sideA: ReactEcs.JSX.Element
  sideB: ReactEcs.JSX.Element
  cardFlipAnimator: CardFlipAnimation

}
export function UICardFlip(props: CardFlipProps) {


  return (
    <UiEntity
      uiTransform={props.uiTransform}
      onMouseDown={() => {
        props.cardFlipAnimator.playAnimation("flip")
      }}
    >
      <UiEntity
        uiTransform={{
          width: '100%',
          height: '100%',
          positionType: 'absolute',
          display: props.cardFlipAnimator.visible ? 'flex' : 'none'
        }}>
        <AnimatedContainer animator={props.cardFlipAnimator.animator}  >
          <UiEntity
            uiTransform={{
              width: '100%',
              height: '100%',
              display: props.cardFlipAnimator.cardOtherSideVisible ? 'none' : 'flex'
            }}>
            {props.sideA}
          </UiEntity>
          <UiEntity
            uiTransform={{
              width: '100%',
              height: '100%',
              display: props.cardFlipAnimator.cardOtherSideVisible ? 'flex' : 'none'
            }} >
            {props.sideB}
          </UiEntity>

        </AnimatedContainer>
      </UiEntity>
    </UiEntity>
  )

}



